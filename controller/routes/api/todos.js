const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/authorisation');
const Todo = require('../../../model/Todo');


// route: POST api/todos
// desc: Add todo
// access: PRIVATE
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty(),
    check('endDate', 'Due Date-Time is required').not().isEmpty(),
    //check('personal' && 'work' && 'shopping' && 'others', 'Please select one or more labels').not().isEmpty(),
    //check('status', 'Please select a status').not().isEmpty(),
]], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        text,
        endDate,
        isArchived,
        personal,
        work,
        shopping,
        others,
        newItem,
        inProgress,
        completed
    } = req.body;

    const todoFields = {};

    // Create Todo object
    todoFields.user = req.user.id;
    if(text) todoFields.text = text;
    if(endDate) todoFields.endDate = endDate;
    if(isArchived) todoFields.isArchived = isArchived;

    // Create the label object
    todoFields.label = {};
    if(personal) todoFields.label.personal = personal;
    if(work) todoFields.label.work = work;
    if(shopping) todoFields.label.shopping = shopping;
    if(others) todoFields.label.others = others;

    // Create the status object
    todoFields.status = {};
    if(newItem) {
        todoFields.status.newItem = newItem;
        todoFields.status.inProgress = 0;
        todoFields.status.completed = 0;
    }
    if(inProgress) {
        todoFields.status.inProgress = inProgress;
        todoFields.status.newItem = 0;
        todoFields.status.completed = 0;
    }
    if(completed) {
        todoFields.status.completed = completed;
        todoFields.status.inProgress = 0;
        todoFields.status.newItem = 0;
    }

    try {
        todo = new Todo(todoFields);
        await todo.save();
        res.json(todo);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// route: GET api/todos
// desc: Get all todos by the logged in user
// access: PRIVATE
router.get('/', auth, async (req, res) => {
    try {
        const user = req.user.id;
        const todos = await Todo.find({"user": user, "isArchived": false}).sort({ startDate: -1 });
        if(!todos) {
            res.status(404).json({ msg: 'No Todos found having this priority' });
        } else if (todos.length == 0) {
            res.status(200).json({ msg: 'Not found'});
        } else if(todos) {
            res.json(todos);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// route: POST api/todos/mixedSearch/
// desc: Get all todos filtered by an integrated search
// access: PRIVATE
router.post("/mixedSearch", auth, async (req, res) => {
    try {
        const {
            fromDate,
            toDate,
            personal,
            work,
            shopping,
            others,
            newItem,
            inProgress,
            completed
        } = req.body;

        // console.log(fromDate);
        // console.log(toDate);

        if(fromDate === null) {
            return res.status(400).json({ errors: [{ msg: 'Specify a Date-Time range' }] });
        }

        if(toDate === null) {
            return res.status(400).json({ errors: [{ msg: 'Specify a Date-Time range' }] });
        }

        if(fromDate === '' || fromDate == null) {
            return res.status(400).json({ errors: [{ msg: 'Specify a Date-Time range' }] });
        }

        if(toDate === '' || toDate == null) {
            return res.status(400).json({ errors: [{ msg: 'Specify a Date-Time range' }] });
        }

        
        const todos = await Todo.find({ 
        "user": req.user.id,
        "label.personal": personal,
        "label.work": work,
        "label.shopping": shopping,
        "label.others": others,
        "status.newItem": newItem,
        "status.inProgress": inProgress,
        "status.completed": completed,
        "startDate": {"$gte": fromDate,"$lte": toDate},
    }).sort({ startDate: -1 });

        if(!todos) {
            res.status(404).json({ msg: 'Error! Not found' });
        } else if (todos.length == 0) {
            res.status(200).json({ msg: 'Not found'});
        } else if(todos) {
            res.json(todos);
        }

    } catch(err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// route: POST api/todos/:id
// desc: Edit todo
// access: PRIVATE
router.post('/:id', auth, async (req, res) => {
    try{
        const todo = await Todo.findById(req.params.id);
        if(!todo) {
            return res.status(404).json({ msg: 'Selected Todo item not found!' });
        } else if(todo) {

        let {
            text,
            endDate,
            isArchived,
            personal,
            work,
            shopping,
            others,
            newItem,
            inProgress,
            completed,
            lastEdit
        } = req.body;


            if(text === '' || text == null) {
                return res.status(400).json({ errors: [{ msg: 'Text is required' }] });
            }
            if(endDate === '' || endDate == null) {
                return res.status(400).json({ errors: [{ msg: 'Due Date-Time is required' }] });
            }
            // if((personal == "" || personal == null) || (work == "" || work == null) || (shopping == "" || shopping == null) && (others == "" || others == null)) {
            //     return res.status(400).json({ msg: 'Please select one or more labels' });
            // }
            // if((newItem == "" || newItem == null) || (inProgress == "" || inProgress == null) || (completed == "" || completed == null)){
            //     return res.status(400).json({ msg: 'Please select a status' });
            // }
            if(newItem == true) {
                inProgress = false;
                completed = false;
            }else if(inProgress == true) {
                newItem = false;
                completed = false;
            }else if(completed == true) {
                newItem = false;
                inProgress = false;
            }

            const newTodo = await Todo.findByIdAndUpdate(
                { _id: req.params.id },
                { $set: {
                    'text': text,
                    'endDate': endDate,
                    'label.personal': personal,
                    'label.work': work,
                    'label.shopping': shopping,
                    'label.others': others,
                    'status.newItem': newItem,
                    'status.inProgress': inProgress,
                    'status.completed': completed,
                    'lastEdit': lastEdit
                } },
                { new: true }
            );
            res.json(newTodo);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
});

// route: DELETE api/todos/deleteAll
// desc: delete all todos
// access: PRIVATE

router.delete('/deleteAll', auth, async (req, res) => {
    try {
        //delete all todos
        await Todo.deleteMany({ user: req.user.id });
        
        res.json({ msg: 'Todos cleared' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// route: PUT api/todos/archive/:id
// desc: Archive todo by id
// access: PRIVATE
router.put('/archive/:todo_id', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todo_id);
        if(!todo) {
            return res.status(404).json({ msg: 'Selected Todo item not found!' });
        }

        todo.isArchived = !todo.isArchived;
        await todo.save();
        res.json(todo.isArchived);
    } catch (err) {
        console.error(err.message);
        if(err.name == 'CastError') {
            return res.status(404).json({ msg: 'Selected Todo item not found!' });
        }
        res.status(500).send('Server error');
    }
});


// route: GET api/todos/archive
// desc: Get archived todos
// access: PRIVATE
router.get('/archive', auth, async (req, res) => {
    try {
        const user = req.user.id;
        const todos = await Todo.find({"user": user, "isArchived": true}).sort({ startDate: -1 });
        if(!todos) {
            res.status(404).json({ msg: 'No Todos found having this priority' });
        } else if (todos.length == 0) {
            res.status(200).json({ msg: 'Not found'});
        } else if(todos) {
            res.json(todos);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// route: DELETE api/todos/:id
// desc: Delete todo by id
// access: PRIVATE
router.delete('/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo) {
            return res.status(404).json({ msg: 'Selected Todo item not found!' });
        }
        // Check user that if the owner is trying to delete it (extra protection)
        if(todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorised" });
        } else {
            await todo.remove();
            res.json({ msg: 'Todo item removed' });
        }
    } catch (err) {
        console.error(err.message);
        if(err.name == 'CastError') {
            return res.status(404).json({ msg: 'Selected Todo item not found!' });
        }
        res.status(500).send('Server error');
    }
});


// route: PUT api/todos/status/:status_type/:todo_id
// desc: Update todo status by id
// access: PRIVATE
router.put('/status/:status_type/:todo_id', auth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todo_id);
        if(!todo) {
            return res.status(404).json({ msg: 'Selected Todo item not found!' });
        }

        const type = req.params.status_type;

        if(type == 'completed') {
            if(todo.status.completed == false) {
                todo.status.completed = true;
                todo.status.inProgress = false;
                todo.status.newItem = false;
            } else if(todo.status.completed == true) {
                todo.status.completed = true;
                todo.status.inProgress = false;
                todo.status.newItem = false;
            }
            await todo.save();
            res.json(todo.status);
        } else if(type == 'inProgress') {
            if(todo.status.inProgress == false) {
                todo.status.completed = false;
                todo.status.inProgress = true;
                todo.status.newItem = false;
            } else if(todo.status.inProgress == true) {
                todo.status.completed = false;
                todo.status.inProgress = true;
                todo.status.newItem = false;
            }
            await todo.save();
            res.json(todo.status);
        } else if(type == 'newItem') {
            if(todo.status.newItem == false) {
                todo.status.completed = false;
                todo.status.inProgress = false;
                todo.status.newItem = true;
            } else if(todo.status.completed == true) {
                todo.status.completed = false;
                todo.status.inProgress = false;
                todo.status.newItem = true;
            }
            await todo.save();
            res.json(todo.status);
        } else {
            return res.status(404).json({ msg: 'Wrong choice!' });
        }
    } catch (err) {
        console.error(err.message);
        if(err.name == 'CastError') {
            return res.status(404).json({ msg: 'Selected Todo item not found!' });
        }
        res.status(500).send('Server error');
    }
});


// route: GET api/todos/label/personal
// desc: Get all todos sorted by label: personal
// access: PRIVATE
router.get('/label/personal', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ "user": req.user.id, "label.personal": 1 }).sort({ startDate: -1 });
        if(!todos) {
            res.status(404).json({ msg: 'No Todos found in this label' });
        } else if (todos.length == 0) {
            res.status(200).json({ msg: 'Not found'});
        } else if(todos) {
            res.json(todos);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// route: GET api/todos/label/work
// desc: Get all todos sorted by label: work
// access: PRIVATE
router.get('/label/work', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ "user": req.user.id, "label.work": 1 }).sort({ startDate: -1 });
        if(!todos ) {
            res.status(404).json({ msg: 'No Todos found in this label' });
        } else if (todos.length == 0) {
            res.status(200).json({ msg: 'Not found'});
        } else if(todos) {
            res.json(todos);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// route: GET api/todos/label/shopping
// desc: Get all todos sorted by label: shopping
// access: PRIVATE
router.get('/label/shopping', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ "user": req.user.id, "label.shopping": 1 }).sort({ startDate: -1 });
        if(!todos) {
            res.status(404).json({ msg: 'No Todos found in this label' });
        } else if (todos.length == 0) {
            res.status(200).json({ msg: 'Not found'});
        } else if(todos) {
            res.json(todos);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// route: GET api/todos/label/others
// desc: Get all todos sorted by label: others
// access: PRIVATE
router.get('/label/others', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ "user": req.user.id, "label.others": 1 }).sort({ startDate: -1 });
        if(!todos) {
            res.status(404).json({ msg: 'No Todos found in this label' });
        } else if (todos.length == 0) {
            res.status(200).json({ msg: 'Not found'});
        } else if(todos) {
            res.json(todos);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// route: GET api/todos/status/newItem
// desc: Get all todos sorted by status: new
// access: PRIVATE
router.get('/status/newItem', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ "user": req.user.id, "status.newItem": 1 }).sort({ startDate: -1 });
        if(!todos) {
            res.status(404).json({ msg: 'No Todos found having this priority' });
        } else if (todos.length == 0) {
            res.status(200).json({ msg: 'Not found'});
        } else if(todos) {
            res.json(todos);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// route: GET api/todos/status/inProgress
// desc: Get all todos sorted by status: in progress
// access: PRIVATE
router.get('/status/inProgress', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ "user": req.user.id, "status.inProgress": 1 }).sort({ startDate: -1 });
        if(!todos) {
            res.status(404).json({ msg: 'No Todos found having this priority' });
        } else if (todos.length == 0) {
            res.status(200).json({ msg: 'Not found'});
        } else if(todos) {
            res.json(todos);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// route: GET api/todos/status/completed
// desc: Get all todos sorted by status: in progress
// access: PRIVATE
router.get('/status/completed', auth, async (req, res) => {
    try {
        const todos = await Todo.find({ "user": req.user.id, "status.completed": 1 }).sort({ startDate: -1 });
        if(!todos) {
            res.status(404).json({ msg: 'No Todos found having this priority' });
        } else if (todos.length == 0) {
            res.status(200).json({ msg: 'Not found'});
        } else if(todos) {
            res.json(todos);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


module.exports = router;
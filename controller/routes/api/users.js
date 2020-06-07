const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/authorisation');
const User = require('../../../model/User');
const Todo = require('../../../model/Todo');

// route: POST api/users
// desc: register user(s)
// access: PUBLIC
router.post('/', [
    check('name', 'Your name is required').not().isEmpty(),
    check('email', 'Please include your active email').isEmail(),
    check('password', 'Set password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

    // Form Validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {

        // Checking user
        let user = await User.findOne({ email: email });
        if(user) {
            return res.status(400).json({ errors:[ { msg: 'User already exists' } ]});
        }

        // Fetch user's Gravatar
        const profilePic = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        // Creating an User instance
        user = new User({
            name,
            email,
            password,
            profilePic
        });

        // Encrypt User's password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save User
        await user.save();
        return res.status(200).json({ msg: 'Registration success' })
        
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ errors:[ { msg: 'Server error' } ]});
    }
});


// route: GET api/users/auth
// desc: user authentication
// access: PRIVATE
router.get('/auth', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ errors:[ { msg: 'Server error' } ]});
    }
});


// route: POST api/users/auth
// desc: user login
// access: PUBLIC

router.post('/auth', [
    check('email', 'Please enter your registered email').isEmail(),
    check('password', 'Please enter your password').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const { email, password } = req.body;     //these are called destructured elements

        try {
            // checking if user exists
            let user = await User.findOne({ email: email });
            if(!user) {
                return res.status(400).json({ errors: [{ msg: 'User is not registered' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({ errors: [{ msg: 'Email or Password did not match' }] });
            }

            // Return jwt
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('privateKey'),
                { expiresIn: 360000 },
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            );
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');                
        }
    }
});


// route: DELETE api/users/delete
// desc: user account deletion
// access: PRIVATE

router.delete('/delete', auth, async (req, res) => {
    try {
        //delete user todos
        await Todo.deleteMany({ user: req.user.id });
        //delete user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



module.exports = router;
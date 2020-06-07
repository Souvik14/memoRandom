import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { editTodo } from '../../actions/todo';
import DateTimePicker from 'react-datetime-picker';

const TodoEdit = ({
    todo,
    history,
    editTodo
}) => {

        const [formData, setFormData] = useState({
            text: todo && todo.text,
            startDate: todo && todo.startDate,
            endDate: new Date(),
            personal: todo && todo.label && todo.label.personal,
            work: todo && todo.label.work,
            shopping: todo && todo.label.shopping,
            others: todo && todo.label.others,
            newItem: todo && todo.status.newItem,
            inProgress: todo && todo.status.inProgress,
            completed: todo && todo.status.completed,
            lastEdit: new Date(),
            unchanged: false
        });

        let id;
        if (todo) { id = todo._id }

        let oldEndDate;
        if (todo) { oldEndDate = todo.endDate }

        const {
            text,
            startDate,
            endDate,
            personal,
            work,
            shopping,
            others,
            newItem,
            inProgress,
            completed,
            lastEdit,
            unchanged
        } = formData;
    
        const formFieldHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
        const onChange = endDate => setFormData({...formData, endDate})

        const switchDueDateHandler = (type) => {
            if (type === false) {
                setFormData({
                    ...formData,
                    unchanged: !unchanged,
                    endDate: todo.endDate
                });
            } else if (type === true) {
                setFormData({
                    ...formData,
                    unchanged: !unchanged,
                    endDate: new Date()
                })
            }
        }
    
        const switchLabelHandler = (type) => {
            if (type === 'personal') {
                setFormData({
                    ...formData,
                    personal: !personal
                })
            } else if (type === 'work') {
                setFormData({
                    ...formData,
                    work: !work
                })
            } else if (type === 'shopping') {
                setFormData({
                    ...formData,
                    shopping: !shopping
                })
            } else if (type === 'others') {
                setFormData({
                    ...formData,
                    others: !others
                })
            }
        }
    
        const switchStatusHandler = (type) => {
            if(type === 'newItem') {
                setFormData({
                    ...formData,
                    newItem: 1,
                    inProgress: 0,
                    completed: 0
                })
            } else if (type === 'inProgress') {
                setFormData({
                    ...formData,
                    newItem: 0,
                    inProgress: 1,
                    completed: 0
                })
            } else if (type === 'completed') {
                setFormData({
                    ...formData,
                    newItem: 0,
                    inProgress: 0,
                    completed: 1
                })
            }
        }
    
        const onSubmit = e => {
            e.preventDefault();
            editTodo(id, formData, history);
        }
        
    return todo ? (
        <div className="card-container">
        <Link to="/todos"><i className="far fa-arrow-alt-circle-left"></i> Go back to All Todo Cards</Link>
        <h2 className="comp-header" style={{ paddingBottom: "1rem" }}><i className="fas fa-edit"></i> Edit Todo</h2>
        <div className="todoform">
            <form className="p-1" onSubmit={e => onSubmit(e)}>
                <div className="todoform-edit-line-1">
                    <div>
                        <textarea 
                            className="todoform-text" 
                            cols="30" 
                            rows="" 
                            value={text} 
                            placeholder="What's in your mind?" 
                            name="text" 
                            onChange={(e) => formFieldHandler(e)}>
                        </textarea>
                    </div>
                </div>

                <div className="todoform-line-3">
                    <div><p><span className="hide-sm">Pick up a </span>Label </p></div>
                    <div className="todoform-line-3-2">
                        {personal == 0 ? (
                            <div className="todoform-toggler-content">
                                <div>
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            name="personal" 
                                            value={personal}
                                            onChange={() => switchLabelHandler('personal')}
                                        /><span className="slider round"></span>
                                    </label>
                                </div>
                                <div><p><i className="fas fa-user-check"></i><span className="hide-sm"> Personal</span></p></div>
                            </div>) : ( 
                            <div className="todoform-toggler-content">
                                <div>
                                    <label className="switch">
                                        <input
                                            type="checkbox" 
                                            name="personal" 
                                            value={personal}
                                            checked
                                            onChange={() => switchLabelHandler('personal')}
                                        /><span className="slider round"></span>
                                    </label>
                                </div>
                                <div><p ><i style={{ color: "#da7b93" }} className="fas fa-user-check"></i><span className="hide-sm"> Personal</span></p></div>
                            </div>
                            )}
                        {work == 0 ? (
                            <div className="todoform-toggler-content">
                                <div>
                                    <label className="switch">
                                        <input type="checkbox" 
                                            name="work" 
                                            value={work}
                                            onChange={() => switchLabelHandler('work')} 
                                        /><span className="slider round"></span>
                                    </label>
                                </div>
                                <div><p><i className="fas fa-briefcase"></i><span className="hide-sm"> Work</span></p></div>
                            </div>) : (
                            <div className="todoform-toggler-content">
                                <div>
                                    <label className="switch">
                                        <input 
                                            type="checkbox"
                                            name="work" 
                                            value={work} 
                                            checked
                                            onChange={() => switchLabelHandler('work')} 
                                        /><span className="slider round"></span>
                                    </label>
                                </div>
                                <div><p><i style={{ color: "#da7b93" }} className="fas fa-briefcase"></i><span className="hide-sm"> Work</span></p></div>
                            </div>
                            )}
                        {shopping == 0 ? (
                            <div className="todoform-toggler-content">
                                <div>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            name="shopping"
                                            value={shopping}
                                            onChange={() => switchLabelHandler('shopping')}  
                                        /><span className="slider round"></span>
                                    </label>
                                </div>
                                <div><p><i className="fas fa-shopping-cart"></i><span className="hide-sm"> Shopping</span></p></div>
                            </div>) : (
                            <div className="todoform-toggler-content">
                                <div>
                                    <label className="switch">
                                        <input
                                            type="checkbox" 
                                            name="shopping" 
                                            value={shopping} 
                                            checked onChange={() => switchLabelHandler('shopping')} 
                                        /><span className="slider round"></span>
                                    </label>
                                </div>
                                <div><p><i style={{ color: "#da7b93" }} className="fas fa-shopping-cart"></i><span className="hide-sm"> Shopping</span></p></div>
                            </div>
                            )}

                        {others == 0 ? (
                            <div className="todoform-toggler-content">
                                <div>
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            name="others" 
                                            value={others} 
                                            onChange={() => switchLabelHandler('others')} 
                                        /><span className="slider round"></span>
                                    </label>
                                </div>
                                <div><p><i className="fas fa-file-alt"></i><span className="hide-sm"> Others</span></p></div>
                            </div>) : (
                            <div className="todoform-toggler-content">
                                <div>
                                    <label className="switch">
                                        <input 
                                            type="checkbox" 
                                            name="others" 
                                            value={others} 
                                            checked onChange={() => switchLabelHandler('others')} 
                                        /><span className="slider round"></span>
                                    </label>
                                </div>
                                <div><p><i style={{ color: "#da7b93" }} className="fas fa-file-alt"></i><span className="hide-sm"> Others</span></p></div>
                            </div>
                            )}
                    </div>
                </div>
                    <div className="todoform-line-4">
                    {newItem == 1 && (
                        <Fragment>
                            <div><p>Status: <i style={{color:'#b22222'}} className="fas fa-list-ul"></i><span className="status-type hide-sm"> New</span><span className="hide-sm"> (use toggler to change)</span> </p></div>
                            <div className="todoform-line-4-2">
                                <div className="todoform-toggler-content">
                                    <div>
                                        <label className="switch">
                                            <input type="checkbox" name="inProgress" value={inProgress} onChange={() => switchStatusHandler('inProgress')} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="inl">
                                        <p><i className="fas fa-tasks"></i><span className="hide-sm"> In Progress</span></p>
                                    </div>

                                </div>
                                <div className="todoform-toggler-content">
                                    <div>
                                        <label className="switch">
                                            <input type="checkbox" name="completed" value={completed} onChange={() => switchStatusHandler('completed')} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="inl">
                                        <p><i className="fas fa-check"></i><span className="hide-sm"> Completed</span></p>
                                    </div>
                                </div>
                            </div>
                        </Fragment>)}

                    {inProgress == 1 && (
                        <Fragment>
                            <div><p>Status: <i style={{color:'#b22222'}} className="fas fa-tasks"></i><span className="status-type hide-sm"> In Progress</span><span className="hide-sm"> (use toggler to change)</span></p></div>
                            <div className="todoform-line-4-2">
                                <div className="todoform-toggler-content">
                                    <div>
                                        <label className="switch">
                                            <input type="checkbox" name="newItem" value={newItem} onChange={() => switchStatusHandler('newItem')} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="inl">
                                        <p><i className="fas fa-list-ul"></i><span className="hide-sm"> New</span></p>
                                    </div>
                                </div>
                                <div className="todoform-toggler-content">
                                    <div>
                                        <label className="switch">
                                            <input type="checkbox" name="completed" value={completed} onChange={() => switchStatusHandler('completed')} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="inl">
                                        <p><i className="fas fa-check"></i><span className="hide-sm"> Completed</span></p>
                                    </div>
                                </div>
                            </div>
                        </Fragment>)}

                    {completed == 1 && (

                        <Fragment>
                            <div><p>Status: <i style={{color:'#b22222'}} className="fas fa-check"></i><span className="status-type hide-sm"> Completed</span><span className="hide-sm"> (use toggler to change)</span></p></div>
                            <div className="todoform-line-4-2">
                                <div className="todoform-toggler-content">
                                    <div>
                                        <label className="switch">
                                            <input type="checkbox" name="newItem" value={newItem} onChange={() => switchStatusHandler('newItem')} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="inl">
                                        <p><i className="fas fa-list-ul"></i><span className="hide-sm"> New</span></p>
                                    </div>

                                </div>
                                <div className="todoform-toggler-content">
                                    <div>
                                        <label className="switch">
                                            <input type="checkbox" name="inProgress" value={"inProgress"} onChange={() => switchStatusHandler('inProgress')} />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="inl">
                                        <p><i className="fas fa-tasks"></i><span className="hide-sm"> In Progress</span></p>
                                    </div>
                                </div>
                            </div>
                        </Fragment>)}
                </div>
                <div className="todoform-edit-line-2">
                    <div><p>Due Date and Time </p></div>
                    {unchanged === true ? (
                        <Fragment>
                            <label className="container less">Keep Due Date & Time unchanged - <span className="ask">{moment(oldEndDate).calendar({
                                sameDay: '[Today at] LT',
                                nextDay: '[Tomorrow at] LT',
                                nextWeek: 'dddd [at] LT',
                                lastDay: '[Yesterday at] LT',
                                lastWeek: '[Last] dddd [at] LT',
                                sameElse: 'D MMM YYYY [at] LT'
                            })}</span>
                            <input type="checkbox" checked="checked" name="start" value={unchanged} onChange={() => switchDueDateHandler(unchanged)} />
                            <span className="checkmark"></span>
                            </label>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <label className="container less">Keep Due Date & Time unchanged - <span className="ask">{moment(oldEndDate).calendar({
                                sameDay: '[Today at] LT',
                                nextDay: '[Tomorrow at] LT',
                                nextWeek: 'dddd [at] LT',
                                lastDay: '[Yesterday at] LT',
                                lastWeek: '[Last] dddd [at] LT',
                                sameElse: 'D MMM YYYY [at] LT'
                            })}</span>
                            <input type="checkbox" name="start" value={unchanged} onChange={() => switchDueDateHandler(unchanged)} />
                            <span className="checkmark"></span>
                            </label>
                        
                        <div><DateTimePicker className="todoform-datetime" value={endDate} onChange={(e) => onChange(e)}/></div>
                        </Fragment>
                    )}
                    
                    </div>
                <div className="todoform-btn-container"><input className="todoform-button" type="submit" value="Save" /></div>
            </form>
        </div>
        </div>
    ) : (<Fragment><Redirect to="/todos" /></Fragment>)
}

TodoEdit.propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired
}

const mapStateToProps = (state,props) => {
    if (props.match.params.id) {
        return {
            todo: state.todo.todos.find(todo => todo._id === props.match.params.id)
        }
    }
}

export default connect(mapStateToProps,{ editTodo })(withRouter(TodoEdit));

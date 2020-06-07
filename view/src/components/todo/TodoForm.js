import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addTodo } from '../../actions/todo';
import { setAlert } from '../../actions/alert';
import DateTimePicker from 'react-datetime-picker';

const TodoForm = ({ 
    auth: {user},
    addTodo,
    setAlert
}) => {
    const [formData, setFormData] = useState({
        text: '',
        startDate: '',
        endDate: new Date(),
        isArchived: '',
        personal: 1,
        work: 0,
        shopping: 0,
        others: 0,
        newItem: 1,
        inProgress: 0,
        completed: 0
    });

    const {
        text,
        startDate,
        endDate,
        isArchived,
        personal,
        work,
        shopping,
        others,
        newItem,
        inProgress,
        completed
    } = formData;

    const formFieldHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onChange = endDate => setFormData({...formData, endDate})

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
        if (text === '') {
            setAlert('Text is required', 'fixed', 'error', 4000);
        } else if (endDate === '') {
            setAlert('Due Date-Time is required', 'fixed', 'error', 4000);
        } else {
            addTodo(formData);
            setFormData({
                text: '',
                startDate: '',
                endDate: new Date(),
                isArchived: '',
                personal: 1,
                work: 0,
                shopping: 0,
                others: 0,
                newItem: 1,
                inProgress: 0,
                completed: 0
            });
        }
    }
    return (
        <div className="todoform">
            <form className="p-1" onSubmit={e => onSubmit(e)}>
                <div className="todoform-line-1">
                    <div>
                        <Link to="/user">
                            <img className='round-img' src={user && user.profilePic} alt='' />
                            <p className="todoform-name"><span className="hide-sm">{user && user.name && user.name.trim().split(' ')[0]}</span></p>
                        </Link>
                    </div>
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
                
                <div className="todoform-line-2">
                    <div><p>Due Date and Time </p></div>
                    <div className="todoform-datetime"><DateTimePicker value={endDate} onChange={(e) => onChange(e)}/></div>
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
                    {newItem === 1 && (
                        <Fragment>
                            <div><p>Status: <i style={{color:'#b22222'}} className="fas fa-list-ul"></i><span className="status-type hide-sm"> New</span><span className="hide-sm"> (use toggler to change)</span></p></div>
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

                    {inProgress === 1 && (
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

                    {completed === 1 && (

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
                <div className="todoform-btn-container"><input className="todoform-button" type="submit" value="Save" /></div>
            </form>
        </div>
    )

}

TodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addTodo,setAlert })(TodoForm);

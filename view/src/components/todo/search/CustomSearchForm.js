import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { setAlert } from '../../../actions/alert';
import TodoItem from '../TodoItem';
import { Link } from 'react-router-dom';
import { customSearch } from '../../../actions/todo';
import DateTimePicker from 'react-datetime-picker'

const CustomSearchForm = ({ 
    auth: {userdate},
    todo: { todo, todos, loading, hasChanged },
    customSearch,
    setAlert
}) => {

    const [formData, setFormData] = useState({
        fromDate: new Date(),
        start: false,
        toDate: new Date(),
        personal: 1,
        work: 0,
        shopping: 0,
        others: 0,
        newItem: 1,
        inProgress: 0,
        completed: 0
    });


    const {
        fromDate,
        start,
        toDate,
        personal,
        work,
        shopping,
        others,
        newItem,
        inProgress,
        completed
    } = formData;

    //const formFieldHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onChange = (dateName,dateValue) => setFormData({...formData, [dateName]: dateValue});

    //const onChangefrom = (dateName,dateValue) => setFormData({...formData, [dateName]: dateValue});

    const switchFromDateHandler = (type) => {
        if (type === false) {
            setFormData({
                ...formData,
                start: !start,
                fromDate: userdate
            })
        } else if (type === true) {
            setFormData({
                ...formData,
                start: !start,
                fromDate: new Date()
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
        customSearch(formData);
        setFormData({
            fromDate: new Date(),
            toDate: new Date(),
            start: false,
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
    return (
        <div className="card-container">
        <Link to="/todos"><i className="far fa-arrow-alt-circle-left"></i> Go back to All Todo Cards</Link>
        <h2 className="comp-header"><i className="fas fa-sliders-h"></i> Custom Filter</h2>
        <h3 className="comp-sub-header" style={{ paddingBottom: "1rem" }}>Select different Labels, Status and Date-Time range for a <span style={{fontStyle: 'italic'}}>unique</span> Mixed Search</h3>
        <div className="todoform">
            <form className="p-1" onSubmit={e => onSubmit(e)}>
                <div className="customsearch-datetime-line-1">
                    <div><p>From </p></div>
                    {start === true ? (
                        <Fragment>
                            <label className="container less">Check this if you want to search from the Beginning - {moment(userdate).calendar({
                                sameDay: '[Today at] LT',
                                nextDay: '[Tomorrow at] LT',
                                nextWeek: 'dddd [at] LT',
                                lastDay: '[Yesterday at] LT',
                                lastWeek: '[Last] dddd [at] LT',
                                sameElse: 'D MMM YYYY [at] LT'
                            })}
                            <input type="checkbox" checked="checked" name="start" value={start} onChange={() => switchFromDateHandler(start)} />
                            <span className="checkmark"></span>
                            </label>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <label className="container less">Check this if you want to search from the Beginning - <span className="ask">{moment(userdate).calendar({
                                sameDay: '[Today at] LT',
                                nextDay: '[Tomorrow at] LT',
                                nextWeek: 'dddd [at] LT',
                                lastDay: '[Yesterday at] LT',
                                lastWeek: '[Last] dddd [at] LT',
                                sameElse: 'D MMM YYYY [at] LT'
                            })}</span>
                            <input type="checkbox" name="start" value={start} onChange={() => switchFromDateHandler(start)} />
                            <span className="checkmark"></span>
                            </label>
                        
                        <div><DateTimePicker value={formData["fromDate"]} onChange={(value) => onChange("fromDate",value)}/></div>
                        </Fragment>
                    )}
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
                            <div><p>Status: <i style={{color:'#b22222'}} className="fas fa-tasks"></i><span className="status-type"> In Progress</span><span className="hide-sm"> (use toggler to change)</span></p></div>
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
                            <div><p>Status: <i style={{color:'#b22222'}} className="fas fa-check"></i><span className="status-type"> Completed</span><span className="hide-sm"> (use toggler to change)</span></p></div>
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
                                            <input type="checkbox" name="inProgress" value={inProgress} onChange={() => switchStatusHandler('inProgress')} />
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
                <div className="customsearch-datetime-line-2">
                    <div><p>To </p></div>
                    <div><DateTimePicker className="todoform-datetime" value={formData["toDate"]} onChange={(value) => onChange("toDate",value)}/></div>
                </div>
                <div className="todoform-btn-container"><input className="todoform-button" type="submit" value="Search" /></div>
            </form>
        </div>
        
        {todos.length == 0 ? (
            <h2 className="comp-header">No result. Try searching with different criteria</h2>
        ) : (
            <div className="cards">
                { 
                    todos.map(todo => (
                        <TodoItem key={todo._id} todo={todo} />
                    ))
                }
            </div>
        )}
        </div>
    )

}

CustomSearchForm.propTypes = {
    customSearch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    todo:PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    todo: state.todo
})

export default connect( mapStateToProps, { customSearch,setAlert })(CustomSearchForm);
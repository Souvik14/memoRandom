import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteTodo, archiveTodo, updateStatus } from '../../actions/todo';

const TodoItem = ({ 
  archiveTodo,
  deleteTodo,
  updateStatus,
  todo: { _id, text, isArchived, label, status, startDate, endDate, lastEdit  } }) => {
  
  const completedStyle = {
    textDecoration: 'line-through'
  }

  const inProgressStyle = {
    fontWeight: 'bold'
  }

  const completedBgStyle = {
    background: status.completed ? '#dac68d' : '#fbe4a3'
  }
  

  return (
    <div className="card p-1" style={completedBgStyle}>
      <div className="card-line-1">
        <div className="card-dates">
          <p className="date-left-align">{moment(startDate).calendar({
                sameDay: '[Today at] LT',
                nextDay: '[Tomorrow at] LT',
                nextWeek: 'dddd [at] LT',
                lastDay: '[Yesterday at] LT',
                lastWeek: '[Last] dddd [at] LT',
                sameElse: 'D MMM YYYY [at] LT'
            })}
          </p>
        </div>
        <div className="card-actions">
            <p>
            { !isArchived ? (
              <button className={`${status.completed ? 'card-actions-btn-completed' : 'card-actions-btn'}`} onClick={e => archiveTodo(_id)} type="button" >
                <i className="fas fa-archive"></i><span className="hide-sm"> Archive</span>
              </button>
            ) : (
              <button className={`${status.completed ? 'card-actions-btn-completed' : 'card-actions-btn'}`} onClick={e => archiveTodo(_id)} type="button" >
                <i className="fas fa-box-open"></i><span className="hide-sm"> Un-Archive</span>
              </button>
            )}
            </p>
            <p><Link style={{color: '#73550e'}} to={`/editTodo/${_id}`}><i className="fas fa-edit"></i><span className="hide-sm"> Edit</span></Link></p>
            <p>
              <button className={`${status.completed ? 'card-actions-btn-completed' : 'card-actions-btn'}`} type="button" onClick={e => deleteTodo(_id)}>
                <i className="fas fa-trash-alt"></i><span className="hide-sm"> Delete</span>
              </button>
            </p>
        </div>
      </div>

      <div className="card-text">
        { status.completed && (<p style={completedStyle}>{text}</p>) }
        { status.inProgress && (<p style={inProgressStyle}>{text}</p>) }
        { status.newItem && (<p>{text}</p>) }
      </div>
      <div className="card-dates">
        { status.completed && (<p><span style={{color: '#2e151b'}}>Due Date and Time: </span><span className="ask">{moment(endDate).calendar({
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'D MMM YYYY [at] LT'
        })}</span></p>) }
        { status.inProgress && (<p style={{color: '#dc3545', fontWeight: 'bold'}}><span style={{color: '#2e151b'}}>Due Date and Time: </span><span className="ask">{moment(endDate).calendar({
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'D MMM YYYY [at] LT'
        })}</span></p>) }
        { status.newItem && (<p><span style={{color: '#2e151b'}}>Due Date and Time: </span><span className="ask">{moment(endDate).calendar({
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'D MMM YYYY [at] LT'
        })}</span></p>) }
      </div>

      <div className="card-label">
        <p>Labelled as </p>
        <div className="card-label-names">
          {label && label.personal === false && label.work === false && label.shopping === false && label.others === false && (
            <p>None</p>
          )}
          {label && label.personal && (
            <p><i className="fas fa-user-check"></i><span className="hide-sm">  Personal</span></p>
          )}
          {label && label.work && (
            <p><i className="fas fa-briefcase"></i><span className="hide-sm"> Work</span></p>
          )}
          {label && label.shopping && (
            <p><i className="fas fa-shopping-cart"></i><span className="hide-sm"> Shopping</span></p>
          )}
          {label && label.others && (
            <p><i className="fas fa-file-alt"></i><span className="hide-sm"> Others</span></p>
          )}
        </div>
      </div>

      <div className="card-status">
        { status && status.newItem && <p>Status: <i style={{color:'#b22222'}} className="fas fa-list-ul"></i> <span className="status-type hide-sm"> New</span><span className="hide-sm"> (use toggler to change)</span></p> }
        { status && status.inProgress && <p>Status: <i style={{color:'#b22222'}} className="fas fa-tasks"></i> <span className="status-type hide-sm"> In Progress</span><span className="hide-sm"> (use toggler to change)</span></p> }
        { status && status.completed && <p>Status: <i style={{color:'#b22222'}} className="fas fa-check"></i> <span className="status-type hide-sm"> Completed</span><span className="hide-sm"> (use toggler to change)</span></p> }
        <div className="card-status-names">
          {status && status.newItem && (
              <Fragment>
                <div>
                  <label className="switch">
                    <input 
                      type="checkbox"
                      value={status.inProgress}
                      onChange={e => updateStatus(_id, 'inProgress')} 
                    /><span className="slider round"></span>
                  </label>
                  <p><i className="fas fa-tasks"></i><span className="hide-sm"> In Progress</span></p>
                </div>
                <div>
                  <label className="switch">
                    <input 
                      type="checkbox"
                      value={status.completed}
                      onChange={e => updateStatus(_id, 'completed')} 
                    /><span className="slider round"></span>
                  </label>
                  <p><i className="fas fa-check"></i><span className="hide-sm"> Completed</span></p>
                </div>
              </Fragment>
            )}
            {status && status.inProgress && (
              <Fragment>
                <div>
                  <label className="switch">
                    <input 
                      type="checkbox"
                      value={status.newItem}
                      onChange={e => updateStatus(_id, 'newItem')} 
                    /><span className="slider round"></span>
                  </label>
                  <p><i className="fas fa-list-ul"></i><span className="hide-sm"> New</span></p>
                </div>
                <div>
                  <label className="switch">
                    <input 
                      type="checkbox"
                      value={status.completed}
                      onChange={e => updateStatus(_id, 'completed')} 
                    /><span className="slider round"></span>
                  </label>
                  <p><i className="fas fa-check"></i><span className="hide-sm"> Completed</span></p>
                </div>
              </Fragment>
            )}
            {status && status.completed && (
              <Fragment>
                <div>
                  <label className="switch">
                    <input 
                      type="checkbox"
                      value={status.newItem}
                      onChange={e => updateStatus(_id, 'newItem')} 
                    /><span className="slider round"></span>
                  </label>
                  <p><i className="fas fa-list-ul"></i><span className="hide-sm"> New</span></p>
                </div>
                <div>
                  <label className="switch">
                    <input 
                      type="checkbox"
                      value={status.inProgress}
                      onChange={e => updateStatus(_id, 'inProgress')} 
                    /><span className="slider round"></span>
                  </label>
                  <p><i className="fas fa-tasks"></i><span className="hide-sm"> In Progress</span></p>
                </div>
              </Fragment>
            )}
        </div>
      </div>
      {lastEdit && 
        <div className="card-line-1">
          <div className="card-editdate">
            <p className="date-left-align">{moment(lastEdit).calendar({
                  sameDay: '[Edited Today at] LT',
                  nextDay: '[Edited Tomorrow at] LT',
                  nextWeek: '[Edited on] dddd [at] LT',
                  lastDay: '[Edited Yesterday at] LT',
                  lastWeek: '[Edited on Last] dddd [at] LT',
                  sameElse: '[Edited on] D MMM YYYY [at] LT'
              })}
            </p>
          </div>
        </div>}
    </div>
  )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    archiveTodo: PropTypes.func.isRequired,
    updateStatus: PropTypes.func.isRequired
}

export default connect(null, { deleteTodo, archiveTodo, updateStatus })(TodoItem);

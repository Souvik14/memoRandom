import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchByPersonal, searchByWork, searchByShopping, searchByOthers, searchByNew, searchByInProgress, searchByCompleted } from '../../actions/todo'
import PropTypes from 'prop-types';

const TodoSearchBox = ({ 
    searchByPersonal,
    searchByWork,
    searchByShopping,
    searchByOthers,
    searchByNew,
    searchByInProgress,
    searchByCompleted
}) => {
    return (
        <div className="searchbox p-1">
            <p className="filter"><i className="fas fa-filter"></i> Filters</p>
            <div className="searchbox-outer">
                <div className="searchbox-line-1">
                    <div><p><i className="fas fa-search"></i><span className="hide-sm"> Search by </span> Label</p></div>
                    <div className="searchbox-label">
                        <Link to="/searchByPersonal" onSubmit={() => searchByPersonal()}><i className="fas fa-user-check"></i><span className="hide-sm"> Personal</span></Link>
                        <Link to="/searchByWork" onSubmit={() => searchByWork()}><i className="fas fa-briefcase"></i><span className="hide-sm"> Work</span></Link>
                        <Link to="/searchByShopping" onSubmit={() => searchByShopping()}><i className="fas fa-shopping-cart"></i><span className="hide-sm"> Shopping</span></Link>
                        <Link to="/searchByOthers" onSubmit={() => searchByOthers()}><i className="fas fa-file-alt"></i><span className="hide-sm"> Others</span></Link>
                    </div>
                </div>
                <div className="searchbox-line-2">
                    <div><p><i className="fas fa-search"></i><span className="hide-sm"> Search by</span> Status </p></div>   
                    <div className="searchbox-status">
                        <Link to="/searchByNew" onSubmit={() => searchByNew()}><i className="fas fa-list-ul"></i><span className="hide-sm"> New</span></Link>
                        <Link to="/searchByInProgress" onSubmit={() => searchByInProgress()}><i className="fas fa-tasks"></i><span className="hide-sm"> In Progress</span></Link>
                        <Link to="/searchByCompleted" onSubmit={() => searchByCompleted()}><i className="fas fa-check"></i><span className="hide-sm"> Completed</span></Link>
                    </div>    
                </div>
                <div className="searchbox-line-3">
                    <div>
                        <p>Use the <Link to="/mixedSearch" ><i className="fas fa-sliders-h"></i> Custom Filter</Link> instead</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

TodoSearchBox.propTypes = {
    searchByPersonal: PropTypes.func.isRequired,
    searchByWork: PropTypes.func.isRequired,
    searchByShopping: PropTypes.func.isRequired,
    searchByOthers: PropTypes.func.isRequired,
    searchByNew: PropTypes.func.isRequired,
    searchByInProgress: PropTypes.func.isRequired,
    searchByCompleted: PropTypes.func.isRequired
}

export default connect(null, { 
    searchByPersonal,
    searchByWork,
    searchByShopping,
    searchByOthers,
    searchByNew,
    searchByInProgress,
    searchByCompleted
})(TodoSearchBox);

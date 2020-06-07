import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layouts/Alert';
import Todos from '../todo/Todos';
import TodoEdit from '../todo/TodoEdit';
import User from '../user/User';
import About from '../about/About';
import PageNotFound from '../layouts/PageNotFound';

//Search Routes
import TodoPersonal from '../todo/search/TodoPersonal';
import TodoWork from '../todo/search/TodoWork';
import TodoShopping from '../todo/search/TodoShopping';
import TodoOthers from '../todo/search/TodoOthers';
import TodoNew from '../todo/search/TodoNew';
import TodoInProgress from '../todo/search/TodoInProgress';
import TodoCompleted from '../todo/search/TodoCompleted';
import TodoArchive from '../todo/TodoArchive';
import CustomSearchForm from '../todo/search/CustomSearchForm';

const Routes = () => {
    return (
        <section className="main-container">
            <Alert />
            <Switch>
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/todos" component={Todos} />
                <PrivateRoute exact path="/editTodo/:id" component={TodoEdit} />
                <PrivateRoute exact path="/searchByPersonal" component={TodoPersonal} />
                <PrivateRoute exact path="/searchByWork" component={TodoWork} />
                <PrivateRoute exact path="/searchByShopping" component={TodoShopping} />
                <PrivateRoute exact path="/searchByOthers" component={TodoOthers} />
                <PrivateRoute exact path="/searchByNew" component={TodoNew} />
                <PrivateRoute exact path="/searchByInProgress" component={TodoInProgress} />
                <PrivateRoute exact path="/searchByCompleted" component={TodoCompleted} />
                <PrivateRoute exact path="/mixedSearch" component={CustomSearchForm} />
                <PrivateRoute exact path="/archive" component={TodoArchive} />
                <PrivateRoute exact path="/user" component={User} />
                <Route component={PageNotFound} />
            </Switch>
        </section>
    )
}

export default Routes;
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Spinner from './components/Spinner';

// Lazy Loading for route components
const UserList = lazy(() => import('./components/UserList'));
const RepoList = lazy(() => import('./components/RepoList'));
const Header = lazy(() => import('./components/Header'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<Spinner />}>
      <Header />
      <Switch>
        <Route exact path="/" component={UserList} />
        <Route
          path="/user/:username/repositories/:page?"
          component={RepoList}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

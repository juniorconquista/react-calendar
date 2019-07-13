import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default () => (
    <Switch>
        <Route path="/" component={() => <h1>Init</h1>} />
    </Switch>
);

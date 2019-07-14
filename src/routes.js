import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Calendar from './containers/Calendar';

export default () => (
    <Switch>
        <Route path="/" component={Calendar} />
    </Switch>
);

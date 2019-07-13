import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { init } from '@rematch/core';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { loading, persistPlugin } from './utils/config-state';
import Routes from './routes';

const store = init({
    plugins: [persistPlugin, loading],
});

const persistor = getPersistor();

const App = () => (
    <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    </PersistGate>
);

export default memo(App);

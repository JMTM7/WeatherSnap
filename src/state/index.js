import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { load, save } from 'redux-localstorage-simple';

import { updateVersion } from './global/actions';
import user from './user/reducer';

const PERSISTED_KEYS = ['user', 'transactions', 'lists'];

const preloadedState = load({
    states: PERSISTED_KEYS,
    disableWarnings: process.env.NODE_ENV === 'test',
});

const store = configureStore({
    reducer: {
        user,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: true }).concat(
            save({ states: PERSISTED_KEYS, debounce: 1000 })
        ),
    preloadedState,
});

store.dispatch(updateVersion());

setupListeners(store.dispatch);

export default store;

export const selectAppState = () => store.getState();
export const appDispatch = store.dispatch;

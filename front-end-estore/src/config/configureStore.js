//import thunkMiddleware from 'redux-thunk';
import { createLogicMiddleware } from 'redux-logic';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import appReducer from '../reducers/appReducer';
import arrLogic from '../logics/logics';
import * as services  from '../services/Services'

const api = {
    services
};

const logicMiddleware = createLogicMiddleware(arrLogic, {api});
const loggerMiddleware = createLogger();

export default function configureStore(reducers = appReducer, initialState) {

    return createStore(
        reducers,
        initialState,
        applyMiddleware(
            logicMiddleware, // lets us dispatch() functions
            loggerMiddleware // neat middleware that logs action
        )
    );
}
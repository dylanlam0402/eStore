import { createLogic } from 'redux-logic';
import * as ActionTypes from '../types/ActionTypes'

const baseLogic = createLogic({
    type: ActionTypes.BASE_LOGIC, 
    latest: false,

    process({ getState, action }, dispatch, done) {
        const { type, subType, promise, ...rest } = action;

        if(promise == null)
        {
            dispatch({ ...rest, subType});
        }
        else
        {
            dispatch({ ...rest, type: subType+'_REQUESTED' });

            return promise
            .then(
                (result) => {
                    if(result.success)
                    {
                        dispatch({ ...rest, type: subType+'_SUCCESS', data: result.data });
                    }
                    else
                    {
                     
                        dispatch({ ...rest, type: subType+'_FAILURE', errors: result.message })
                    }
                    
                }
            )
            .then(() => done());
        }
    }
  });

  export default [
    baseLogic,
  ]
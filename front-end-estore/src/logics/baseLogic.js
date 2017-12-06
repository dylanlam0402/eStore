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
                      if(result.errors[0].type === ActionTypes.UNAUTHENTICATION)
                        {
                            dispatch({ ...rest, type : ActionTypes.UNAUTHENTICATION, errors: result.errors })
                        }

                        dispatch({ ...rest, type: subType+'_FAILURE', errors: result.errors })
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
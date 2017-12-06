import * as ActionTypes from '../types/ActionTypes';
/*
export function createAction(action) {
  const { type, promise, ...rest } = action;

  return () => ({
    type: ActionTypes.BASE_LOGIC,
    subType: type,
    promise: promise,
    ...rest
  });
};*/

export function createAction(action) {
  const { type, promise, ...rest } = action;

  return {
    type: ActionTypes.BASE_LOGIC,
    subType: type,
    promise: promise,
    ...rest
  };
  
};


export function createCustomAction(action) {
  const { type, ...rest } = action;

  return (type, ...rest) => (
    {
      type: type, 
      ...rest
    }
  );
};
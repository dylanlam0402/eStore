/*
This function is used slipts big reducer into multiple small reducers
initialState: 
handlers: key and action
*/

export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
      if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action)
      } else {
        return state
      }
    }
}
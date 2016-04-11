export default function({ dispatch }) { // just pull of the property dispatch of
  // and object that we will receive
  return next => action => {
    // If action does not have a payload
    // or, the payload does not have a .then property
    // we dont care about it, send it on
    if (!action.payload || !action.payload.then) {
      return next(action); // next middleware on the stack (or if non, go to reducer)
    }

    action.payload.then(function(response) {
      // Promise resolved
      const newAction = { ...action, payload: response };
      dispatch(newAction); // take this action and send it to the very first middleware again
    });
  }
  // same as
  /*
  return function(next) {
    return function(action) {
      console.log(action);
      next(action);
    }
  }
  */
}

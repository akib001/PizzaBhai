import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.value };
  }

  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }

  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }
  return inputStateReducer;
};

//validateValue is a function which will be received from components

const useInput = validateValue => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const enteredValueIsValid = validateValue(inputState.value);
  const enteredValueIsInvalid = !enteredValueIsValid && inputState.isTouched;

  const valueChangeHandler = event => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const valueChangeBlueHandler = () => {  
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: enteredValueIsValid,
    isInvalid: enteredValueIsInvalid,
    valueChangeHandler,
    valueChangeBlueHandler,
    reset,
  };
};

export default useInput;

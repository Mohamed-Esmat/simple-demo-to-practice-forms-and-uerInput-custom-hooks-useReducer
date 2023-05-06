import { useState, useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};
const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    // return { value: action.value, isTouched: state.isTouched}
    return { ...state, value: action.value };
  }
  if (action.type === 'BLUR') {
    // return { isTouched: true, value: state.value}
    return {...state, isTouched: true}
  }
  if (action.type === 'RESET') {
    return initialInputState;
  }
  return initialInputState;
};
const useFormInput = (validateFn) => {
  // const [enteredValue, setEnteredValue] = useState('');
  // const [isTouched, setIsTouched] = useState(false);
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const enteredValueIsValid = validateFn(inputState.value);
  const enteredValueInvalid = !enteredValueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({
      type: 'INPUT',
      value: event.target.value,
    });
    // setEnteredValue(event.target.value);
  };

  const valueBlurHandler = () => {
    dispatch({
      type: 'BLUR',
    });
    // setIsTouched(true);
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
    // setEnteredValue('');
    // setIsTouched(false);
  };

  return {
    enteredValue: inputState.value,
    enteredValueIsValid,
    enteredValueInvalid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useFormInput;

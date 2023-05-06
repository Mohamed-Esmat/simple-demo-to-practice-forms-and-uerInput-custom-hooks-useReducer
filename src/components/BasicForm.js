import useFormInput from '../hooks/use-formInput';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.trim().includes('@');
const BasicForm = (props) => {
  const {
    enteredValue: enteredName,
    enteredValueIsValid: enteredNameIsValid,
    enteredValueInvalid: enteredNameInvalid,
    valueChangeHandler: nameInputChangeHandler,
    valueBlurHandler: nameInputBlurHandler,
    reset: resetName,
  } = useFormInput(isNotEmpty);

  const {
    enteredValue: enteredLname,
    enteredValueIsValid: enteredLnameIsValid,
    enteredValueInvalid: enteredLnameInvalid,
    valueChangeHandler: LnameInputChangeHandler,
    valueBlurHandler: LnameInputBlurHandler,
    reset: resetLname,
  } = useFormInput(isNotEmpty);

  const {
    enteredValue: enteredEmail,
    enteredValueIsValid: enteredEmailIsValid,
    enteredValueInvalid: enteredEmailInvalid,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    reset: resetEmail,
  } = useFormInput(isEmail);

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid && enteredLnameIsValid) {
    formIsValid = true;
  }

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log('Submitted');
    console.log(enteredName, enteredLname, enteredEmail);
    resetName();
    resetLname();
    resetEmail();
  };

  const nameInputClasses = enteredNameInvalid
    ? 'form-control invalid'
    : 'form-control';

  const LnameInputClasses = enteredLnameInvalid
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = enteredEmailInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={submitFormHandler}>
      <div className="control-group">
        <div className={nameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
            value={enteredName}
          />
          {enteredNameInvalid && (
            <p className="error-text">first name is not invalid!</p>
          )}
        </div>
        <div className={LnameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onChange={LnameInputChangeHandler}
            onBlur={LnameInputBlurHandler}
            value={enteredLname}
          />
          {enteredLnameInvalid && (
            <p className="error-text">last name is not invalid!</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {enteredEmailInvalid && (
          <p className="error-text">Email is not invalid!</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;

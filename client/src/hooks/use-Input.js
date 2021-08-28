const { useState } = require("react")

const useInput = (validateValue, value = '') => {
  const [enteredValue, setEnteredValue] = useState(value);
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(enteredValue)
  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  }

  const inputBlurHandler = () => {
    setIsTouched(true);
  }

  const reset = () => {
    setEnteredValue('')
    setIsTouched(false)
  }

  return {
    value: enteredValue,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    isValid: valueIsValid,
    reset
  }
}

export default useInput
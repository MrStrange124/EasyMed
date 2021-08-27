import Input from "../UI/Input"
import classes from './Checkout.module.css'
import useInput from "../../hooks/use-Input"

const validatePhone = (value) => {
  if (value.includes('+91'))
    value = value.slice(3)
  else if (value[0] === '0')
    value = value.slice(1)
  else if (value.length == 12 && value[0] === '9' && value[1] === '1')
    return true
  if (value.length === 10 && !isNaN(+value))
    return true


  return false
}

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '' && value.length < 50)

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressInputBlurHandler,
    reset: resetAddressInput
  } = useInput(value => value.trim() !== '' && value.length < 200)

  const {
    value: enteredNumber,
    isValid: enteredNumberIsValid,
    hasError: numberInputHasError,
    valueChangeHandler: numberChangeHandler,
    inputBlurHandler: numberInputBlurHandler,
    reset: resetNumberInput
  } = useInput(value => validatePhone(value.trim()))

  const {
    value: enteredPincode,
    isValid: enteredPincodeIsValid,
    hasError: pincodeInputHasError,
    valueChangeHandler: pincodeChangeHandler,
    inputBlurHandler: pincodeInputBlurHandler,
    reset: resetPincodeInput
  } = useInput(value => value.length === 6 && !isNaN(+value))

  const resetForm = () => {
    resetNumberInput()
    resetAddressInput()
    resetNameInput()
    resetPincodeInput()
  }
  const formTouched = () => {
    nameInputBlurHandler()
    numberInputBlurHandler()
    addressInputBlurHandler()
    pincodeInputBlurHandler()
  }

  const submitHandler = event => {
    event.preventDefault()
    const isFormValid = enteredNameIsValid && enteredNumberIsValid && enteredPincodeIsValid && enteredAddressIsValid
    if (!isFormValid) {
      formTouched()
      return
    }

    let num = enteredNumber
    num = num.slice(-10)

    const userDetails = {
      name: enteredName,
      number: +num,
      pincode: +enteredPincode,
      address: enteredAddress
    }
    props.placeOrder(userDetails)
    resetForm()
  }

  return (
    <div className={classes.login_box}>
      <h2 className={classes.title}>Add Address Details</h2>
      <form onSubmit={submitHandler} id="myform">
        <Input
          label="Name"
          hasError={nameInputHasError}
          validInput={enteredNameIsValid}
          input={{
            id: "name",
            type: "text",
            value: enteredName
          }}
          onChange={(e) => nameChangeHandler(e)}
          onBlur={() => nameInputBlurHandler()}
        />
        <Input
          label="Phone No."
          hasError={numberInputHasError}
          validInput={enteredNumberIsValid}
          input={{
            id: "number",
            type: "text",
            value: enteredNumber
          }}
          onChange={(e) => numberChangeHandler(e)}
          onBlur={() => numberInputBlurHandler()}
        />
        <Input
          label="PinCode"
          hasError={pincodeInputHasError}
          validInput={enteredPincodeIsValid}
          input={{
            id: "pincode",
            type: "number",
            value: enteredPincode
          }}
          onChange={(e) => pincodeChangeHandler(e)}
          onBlur={() => pincodeInputBlurHandler()}
        />
        <Input
          label="Address"
          hasError={addressInputHasError}
          validInput={enteredAddressIsValid}
          input={{
            id: "address",
            type: "text",
            value: enteredAddress
          }}
          onChange={(e) => addressChangeHandler(e)}
          onBlur={() => addressInputBlurHandler()}
        />
      </form>
    </div>
  )
}
export default Checkout
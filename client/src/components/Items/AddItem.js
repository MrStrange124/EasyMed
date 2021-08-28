import useInput from "../../hooks/use-Input";
import Input from "../UI/Input";
import classes from './AddItem.module.css'
import { useCookies } from 'react-cookie'
import ProductContext from '../../store/product-context'
import { useContext } from "react";

const AddItems = (props) => {
  const [cookies] = useCookies(['jwt'])
  const ProductCtx = useContext(ProductContext)

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '' && value.length < 50)
  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionInputBlurHandler,
    reset: resetDescriptionInput
  } = useInput(value => value.trim() !== '' && value.length < 150)
  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceInputBlurHandler,
    reset: resetPriceInput
  } = useInput(value => value > 0 && !isNaN(+value))
  const {
    value: enteredRate,
    isValid: enteredRateIsValid,
    hasError: rateInputHasError,
    valueChangeHandler: rateChangeHandler,
    inputBlurHandler: rateInputBlurHandler,
    reset: resetRateInput
  } = useInput(value => value > 0 && !isNaN(+value))



  const resetForm = () => {
    resetNameInput();
    resetPriceInput();
    resetDescriptionInput();
    resetRateInput();
  }
  const formTouched = () => {
    nameInputBlurHandler()
    descriptionInputBlurHandler()
    priceInputBlurHandler()
    rateInputBlurHandler()
  }
  const submitHandler = async (event) => {
    event.preventDefault();

    const isFormValid = enteredNameIsValid && enteredDescriptionIsValid && enteredPriceIsValid && enteredRateIsValid
    if (!isFormValid) {
      formTouched()
      return
    }

    ProductCtx.setIsLoading(true)

    const itemDetail = {
      name: enteredName,
      description: enteredDescription,
      rate: +enteredRate,
      price: +enteredPrice
    }

    const response = await fetch("http://localhost:5000/products", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.jwt}`
      },
      body: JSON.stringify(itemDetail)
    })

    ProductCtx.setIsLoading(false)

    if (!response.ok) {
      alert('something went worng.')
      return
    }
    resetForm()
    alert("Your Item has been added successfully.")
    props.fetchItems()
  }
  return (
    <section className={classes.container}>
      <h1 className={classes.title}>Add Product</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          label="Product Name"
          hasError={nameInputHasError}
          validInput={enteredNameIsValid}
          input={{
            id: "product_name",
            type: "text",
            value: enteredName
          }}
          onChange={(e) => nameChangeHandler(e)}
          onBlur={() => nameInputBlurHandler()}
        />
        <Input
          label="Description"
          hasError={descriptionInputHasError}
          validInput={enteredDescriptionIsValid}
          input={{
            id: "description",
            type: "text",
            value: enteredDescription
          }}
          onChange={(e) => descriptionChangeHandler(e)}
          onBlur={() => descriptionInputBlurHandler()}
        />
        <Input
          label="Price"
          hasError={priceInputHasError}
          validInput={enteredPriceIsValid}
          input={{
            id: "price",
            type: "number",
            value: enteredPrice
          }}
          onChange={(e) => priceChangeHandler(e)}
          onBlur={() => priceInputBlurHandler()}
        />
        <Input
          label="Rate"
          hasError={rateInputHasError}
          validInput={enteredRateIsValid}
          input={{
            id: "rate",
            type: "number",
            value: enteredRate
          }}
          onChange={(e) => rateChangeHandler(e)}
          onBlur={() => rateInputBlurHandler()}
        />
        <button className={classes.addBtn}>Add Item</button>
      </form>
    </section>
  )
}
export default AddItems;
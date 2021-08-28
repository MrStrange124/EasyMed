import useInput from "../../hooks/use-Input";
import Input from "../UI/Input";
import classes from './AddItem.module.css'
import { useCookies } from 'react-cookie'
import ProductContext from '../../store/product-context'
import { useContext } from "react";

const InputItem = (props) => {
    const [cookies] = useCookies(['jwt'])
    const ProductCtx = useContext(ProductContext)

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameInputBlurHandler,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '' && value.length < 50, props.product.name)
    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionInputBlurHandler,
        reset: resetDescriptionInput
    } = useInput(value => value.trim() !== '' && value.length < 150, props.product.description)
    const {
        value: enteredPrice,
        isValid: enteredPriceIsValid,
        hasError: priceInputHasError,
        valueChangeHandler: priceChangeHandler,
        inputBlurHandler: priceInputBlurHandler,
        reset: resetPriceInput
    } = useInput(value => value > 0 && !isNaN(+value), props.product.price)
    const {
        value: enteredRate,
        isValid: enteredRateIsValid,
        hasError: rateInputHasError,
        valueChangeHandler: rateChangeHandler,
        inputBlurHandler: rateInputBlurHandler,
        reset: resetRateInput
    } = useInput(value => value > 0 && !isNaN(+value), props.product.rate)



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
        let url = "http://localhost:5000/products"
        if (props.method === "patch")
            url += '/' + props.product._id
        const response = await fetch(url, {
            method: props.method.toUpperCase(),
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
        if (props.method === "post")
            alert("Your Item has been added successfully.")
        else
            alert("Your Item has been modified successfully.")

        props.fetchItems()
    }
    return (
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
            <button className={classes.addBtn}>{props.method === "post" ? "Add" : "Edit"} Item</button>
        </form>
    )
}
export default InputItem;
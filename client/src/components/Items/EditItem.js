import Modal from "../UI/Modal"
import InputItem from "./InputItem"
import classes from './AddItem.module.css'
import { FaTimes } from 'react-icons/fa'
const EditItem = (props) => {

    return <Modal onClose={props.onClose}>
        <FaTimes className={classes.cross} onClick={props.onClose} />
        <h1 className={classes.title}>Edit Product</h1>
        <InputItem fetchItems={props.fetchItems} method="patch" product={props.product} />
    </Modal>
}
export default EditItem
import classes from './AddItem.module.css'
import InputItem from './InputItem'

const AddItems = (props) => {
  return (
    <section className={classes.container}>
      <h1 className={classes.title}>Add Product</h1>
      <InputItem fetchItems={props.fetchItems} method="post" product={{ name: "", price: "", rate: "", description: "" }} />
    </section>
  )
}
export default AddItems;
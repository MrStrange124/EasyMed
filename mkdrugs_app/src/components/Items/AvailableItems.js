import classes from './AvailableItems.module.css'
import Card from '../UI/Card'
import Item from './Item/Item'
const dummy = [{
  name: "product 1",
  id: 1,
  price: 25,
  rate: 20,
  description: "this is my first product"
}, {
  name: "product 2",
  id: 2,
  price: 15,
  rate: 12,
  description: "this is my second product"
}, {
  name: "product 3",
  id: 3,
  price: 30,
  rate: 25,
  description: "this is my third product"
}]

const Items = dummy.map(item => <Item
  key={item.id}
  name={item.name}
  price={item.price}
  rate={item.rate}
  description={item.description}
/>)

const AvailableItems = () => {
  return (
    <section className={classes.item_container}>
      <Card>
        <ul>
          {Items}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableItems
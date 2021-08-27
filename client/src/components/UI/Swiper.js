import classes from './Swiper.module.css'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

const Swiper = props => {
    return <div className={classes.swiper}>
        <FaChevronLeft className={classes.icon} onClick={props.prevPage} />
        <p className={classes.text}>{props.page} / {props.totalPages}</p>
        <FaChevronRight className={classes.icon} onClick={props.nextPage} />
    </div>
}
export default Swiper
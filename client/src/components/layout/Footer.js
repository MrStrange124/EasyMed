import classes from './Footer.module.css'
import { FaFacebookSquare } from 'react-icons/fa'
const Footer = () => {
    const contactHandler = () => {
        window.open("https://www.facebook.com/profile.php?id=100024969049197");
    }
    return (
        <footer className={classes.main} >
            <FaFacebookSquare className={classes.fb} onClick={contactHandler} />
            <p onClick={contactHandler} >Designed & Developed by Adi...</p>
        </footer>
    )
}
export default Footer
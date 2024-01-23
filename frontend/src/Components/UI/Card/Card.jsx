import classes from './Card.module.css'
import { Link } from 'react-router-dom';
export default function Card(props) {
    return (
        <div className={classes['card-game']}>
            <img src={props.image} alt="test" />
            <p>{props.name}</p>
            <Link to={`/details/${props.slug}`}>
                <i className="fa-solid fa-chevron-right"></i>
            </Link>
            <div></div>
            <div></div>
        </div>
    )
}

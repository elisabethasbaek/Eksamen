import { Link } from "@reach/router";
import "./Styling/KalenderHold.scss";

export default function KalenderHold({heading, day, time, to}){
    return(
        <article className="kalenderHold">
            <Link to={to} className="kalenderHold__link">
                <h2 className="holdHeading">{heading}</h2>
                <p className="holdDayTime">{day} {time}</p>
            </Link>
        </article>
    )
}
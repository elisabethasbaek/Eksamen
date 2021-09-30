import { Link } from "@reach/router";
import "./Styling/AktivitetCard.scss";

export default function AktivitetCard({to, key, src, alt, name, minAge, maxAge}){
    return(
        <Link to={to} key={key} className="aktivitetCard">
            <li className="enkeltAktivitet">
                <img src={src} alt={alt} className="enkeltAktivitet__image"/>
                <div className="enkeltAktivitet__text">
                    <p className="name">{name}</p>
                    <p className="age">{minAge}-{maxAge} år</p>
                </div>
            </li>
        </Link>
    )
}
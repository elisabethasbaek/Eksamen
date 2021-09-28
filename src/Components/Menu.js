import { Link } from "@reach/router";
import "./Styling/Menu.scss";

export default function Menu(){
    return(
        <nav className="menu">
            <ul className="menu__list">
                <Link className="item" to="/aktiviteter"><li className="fas fa-home"></li></Link>
                <Link className="item" to="/search"><li className="fas fa-search"></li></Link>
                <Link className="item" to="/"><li className="far fa-calendar"></li></Link>
                <Link className="item" to="/login"><li className="fas fa-sign-in-alt"></li></Link>
            </ul>
        </nav>
    )
}
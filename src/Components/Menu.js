import { Link } from "@reach/router";
import "./Styling/Menu.scss";
import {BiHomeAlt} from "react-icons/bi";
import {FiSearch} from "react-icons/fi";
import {AiOutlineCalendar,AiOutlineLogin} from "react-icons/ai";

export default function Menu(){
    return(
        <nav className="menu">
            <ul className="menu__list">
                <Link className="item" to="/aktiviteter">
                    <li>
                        <BiHomeAlt className="icon" />
                    </li>
                </Link>
                <Link className="item" to="/search">
                    <li>
                        <FiSearch className="icon" />
                    </li>
                </Link>
                <Link className="item" to="/kalender">
                    <li>
                        <AiOutlineCalendar className="icon" />
                    </li>
                </Link>
                <Link className="item" to="/login">
                    <li>
                        <AiOutlineLogin className="icon" />
                    </li>
                </Link>
            </ul>
        </nav>
    )
}
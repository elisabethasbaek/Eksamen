import "./Styling/Button.scss";

export default function Button({type, text, onClick}){
    return(
        <button onClick={onClick} type={type} className="button">{text}</button>
    )
}
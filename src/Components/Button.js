import "./Styling/Button.scss";

export default function Button({type, text}){
    return(
        <button type={type} className="button">{text}</button>
    )
}
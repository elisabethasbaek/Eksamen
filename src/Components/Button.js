import "./Styling/Button.scss";

export default function Button({type, text, onClick, disabled}){
    return(
        <button
            onClick={onClick}
            type={type}
            className="button"
            disabled={disabled}
        >
            {text}
        </button>
    )
}
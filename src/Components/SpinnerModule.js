import "./Styling/SpinnerModule.scss";

export default function SpinnerModule(){
    return(
        <section className="spinnerModule">
            <div className="holder">  
                <div className="bar left"></div>
                <div className="bar top"></div>
                <div className="bar right"></div>
                <div className="bar bottom"></div>
            </div>
        </section>
    )
}
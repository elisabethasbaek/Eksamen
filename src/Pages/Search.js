import Heading from "../Components/Heading";
import Menu from "../Components/Menu";
import "./Styling/Search.scss";

export default function Search(){
    function handleSubmit(){

    }
    
    return(
        <main className="search">
            <Heading text="Søg" />

            <form onSubmit={handleSubmit} className="search__searchBar">
                <input
                    type="text"
                    id="search"
                    name="search"
                />
                <button
                    type="submit"
                    className="fas fa-search">
                </button>
            </form>

            <Menu />
        </main>
    )
}
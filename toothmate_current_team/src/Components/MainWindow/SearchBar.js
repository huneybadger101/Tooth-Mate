import '../../StyleSheets/MainWindow/SearchBar.css';

function SearchBar() {
    return (

        <div className='GridLayout'>
            <div className="SearchBarContainer">
            <form>
                <input tupe="text" value="Patient Search..." className="SearchBar"/>
                <input type="submit" value="Search" className="SearchButton"/>
            </form>
        </div>
        </div>
    );
}

export default SearchBar;
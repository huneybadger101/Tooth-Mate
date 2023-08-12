import '../../StyleSheets/MainWindow/SearchBar.css';

function SearchBar() {
    return (

        <div className="grid-layout">
            <div className="searchbar-container">
                <form>
                    <input tupe="text" value="Patient Search..." className="searchbar" />
                    <input type="submit" value="Search" className="search-button" />
                </form>
            </div>
        </div>
    );
}

export default SearchBar;
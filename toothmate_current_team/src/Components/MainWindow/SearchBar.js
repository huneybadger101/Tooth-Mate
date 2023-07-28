function SearchBar() {
    return (

        <div style={{
            width: '100%',
            height: '100%',
            alignContent: "center",
        }}>
            <form>
                    <input tupe="text" value="Patient Search..."
                        style={{
                            width: '80%',
                            height: '100%',
                            marginRight: '1%',
                            background: 'white',
                            border: '1px solid black',
                        }} />
                <input type="submit" value="Search" />
            </form>
        </div>
    );
}

export default SearchBar;
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
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                        borderRadius: '5px',
                        borderWidth: '1px',
                    }} />
                <input type="submit" value="Search" style={{
                        backgroundColor: '#e5e5e5',
                        borderRadius: '2px',
                        borderWidth: '1px',
                    }} />
            </form>
        </div>
    );
}

export default SearchBar;
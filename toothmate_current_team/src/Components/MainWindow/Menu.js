import '../../StyleSheets/MainWindow/Menu.css';

function Menu() {
    return (
        <>
            <div className='GridLayout'>
                <div className="MenuContainer">
                    {/* This Menu icon is from https://feathericons.com/*/}
                    <img src='icons/menu.svg' alt="Menu Icon" />
                </div>
            </div>
        </>

    );
}

export default Menu;
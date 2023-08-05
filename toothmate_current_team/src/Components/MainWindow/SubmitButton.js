function SubmitButton() {
    return (
        <form>
            <input type="button" value="Submit"
                style={{
                    width: '80px',
                    height: '30px',
                    fontSize: '20px',

                    backgroundColor: '#efefef',
                    borderRadius: '5px',
                    borderWidth: '1px',
                }}></input>
        </form>
    );
}

export default SubmitButton;
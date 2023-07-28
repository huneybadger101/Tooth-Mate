function PatientWarning() {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'red',
            border: '1px solid black',
        }}>
            <form>
                <label> "Name"
                    <input tupe="textarea" value="Name, NHI, allergies..."
                        style={{
                            width: '98%',
                            border: 'none',
                            height: '100%',
                            background: 'red',
                        }} />
                </label>
            </form>
        </div>
    )
}

export default PatientWarning;
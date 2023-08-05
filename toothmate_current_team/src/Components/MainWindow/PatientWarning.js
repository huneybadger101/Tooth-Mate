function PatientWarning() {
    return (
        <div>
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
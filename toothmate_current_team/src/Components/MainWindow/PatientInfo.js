function PatientInfo() {
    return (
        <div style={{
            width: '100%',
            height: '100%',
        }}>
            <form>
                <label> Patient Info
                    <input tupe="text" value="info..."
                        style={{
                            width: '98%',
                            border: 'none',
                            height: '100%',
                        }} />
                </label>
            </form>
        </div>
    );
}

export default PatientInfo;
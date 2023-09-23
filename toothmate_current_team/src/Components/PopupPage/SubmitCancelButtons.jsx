import './StyleSheets/SubmitCancelButtonStyles.css';

function SubmitCancelButtons({treatmentList, setTreatmentTodo, url, setshowTreatmentPopup, settreatmentList}) {

    const handleSubmit = () => {
        setshowTreatmentPopup(false)
        if (treatmentList.length === 0) {
            // if treatmentList is empty, attempt to delete the profile
            editOrAddProfile(null);
        } else {
            const profile = {
                'TreatmentSummary': treatmentList,
            }; 
            editOrAddProfile(profile);
        }
        console.log("testbtn");
    };
    
    const editOrAddProfile = (profile) => {
        setTreatmentTodo(prevProfiles => {
            // If profile is null, attempt to delete
            if (profile === null) {
                if (prevProfiles.hasOwnProperty(url)) {
                    // If the profile exists, delete it
                    const newProfiles = { ...prevProfiles };
                    delete newProfiles[url];
                    return newProfiles;
                }
                // If the profile doesn't exist, do nothing
                return prevProfiles;
            }
    
            // If the profile exists, update it. If it doesn't exist, add it.
            const existingProfile = prevProfiles[url];
            return {
                ...prevProfiles,
                [url]: existingProfile ? { ...existingProfile, ...profile } : profile
            };
        });
    };

    const handleReset = () => {
        settreatmentList([])
        editOrAddProfile(null);
    };
    

    return (
        <>
            <div className="treatment-submit-cancel-buttons-container">
                <button onClick={handleSubmit} type="button" className="treatment-submit-button">Submit</button>
                <button onClick={handleReset} type="button" className="treatment-cancel-button">Reset</button>
            </div>
        </>
    );
}

export default SubmitCancelButtons;
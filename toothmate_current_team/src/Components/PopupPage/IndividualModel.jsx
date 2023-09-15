import './StylesSheets/individualModelStyles.css';

const IndividualModel = ({ toothUrl }) => {
    console.log("Tooth URL:", toothUrl);

    return (
        <div className="individualModel">
            <model-viewer
                src={toothUrl}
                alt="A 3D model of a tooth"
                auto-rotate
                camera-controls
                style={{ width: '100%', height: '400px' }}
            ></model-viewer>
        </div>
    );
};

export default IndividualModel;

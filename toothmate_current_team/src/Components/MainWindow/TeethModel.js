import '../../StyleSheets/MainWindow/TeethModel.css';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { Html, Loader } from '@react-three/drei';
import PeriPopup from '../PeridontalPopup/PeriPopup';
import DataOfTeeth from './TeethData';
import TreatmentPlan from '../../TreatmentPlan';
import { useNavigate } from 'react-router-dom';
import TreatmentPopup from '../PopupPage/TreatmentPopup';


const DAMPING = 0.05;
const LERP_FACTOR = 0.1;
const DEFAULT_ROTATION = { x: 0, y: 0 };


const ToothComponent = ({ position, url, onToothDblClick, resetRotation }) => {
    const gltf = useLoader(GLTFLoader, url);
    const mesh = useRef();
    const [state, setState] = useState({
        rotation: DEFAULT_ROTATION,
        isDragging: false,
        start: { x: 0, y: 0 }
    });

    useEffect(() => {
        setState(prevState => ({ ...prevState, rotation: DEFAULT_ROTATION }));
    }, [resetRotation]);

    const handleMouseDown = (e) => {
        setState({
            ...state,
            isDragging: true,
            start: { x: e.clientX, y: e.clientY }
        });
    };

    const handleMouseMove = (e) => {
        if (state.isDragging) {
            const dx = (e.clientX - state.start.x) * DAMPING;
            const dy = (e.clientY - state.start.y) * DAMPING;
            const targetRotation = {
                x: state.rotation.x - dy,
                y: state.rotation.y + dx
            };

            requestAnimationFrame(() => {
                const lerpX = state.rotation.x + LERP_FACTOR * (targetRotation.x - state.rotation.x);
                const lerpY = state.rotation.y + LERP_FACTOR * (targetRotation.y - state.rotation.y);

                setState(prevState => ({
                    ...prevState,
                    rotation: { x: lerpX, y: lerpY }
                }));
            });
        }
    };

    const handleMouseUp = () => {
        setState(prevState => ({ ...prevState, isDragging: false }));
    };

    return (
        <primitive
            ref={mesh}
            position={position}
            rotation={[state.rotation.x, state.rotation.y, 0]}
            object={gltf.scene}
            scale={[2.5, 2.5, 2.5]}
            onPointerDown={handleMouseDown}
            onPointerMove={handleMouseMove}
            onPointerUp={handleMouseUp}
            onDoubleClick={() => onToothDblClick(url)}
        />
    );
};


const getToothPosition = (jawIndex, sideIndex, index) => {
    const positionX = (index - 2.5) * 5 + (sideIndex * 25) - 10;
    return [positionX, jawIndex === 0 ? 10 : -10, 0];
};

function TeethModel({ activeContent }) {
    const [showTreatmentPlan, setShowTreatmentPlan] = useState(false);
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [resetCounter, setResetCounter] = useState(0);

    const handleResetRotation = useCallback(() => {
        setResetCounter(prevCount => prevCount + 1);
    }, []);

    const navigate = useNavigate();

    const handleToothDblClick = useCallback((toothUrl) => {
        setSelectedTooth(toothUrl);
        navigate({
            pathname: '/treatmentplan',
            state: { toothUrl: toothUrl }
        });
    }, [navigate]);
    const renderTooth = useCallback((tooth, index, jaw, side) => {
        const position = getToothPosition(['upper', 'lower'].indexOf(jaw), ['left', 'right'].indexOf(side), index);
        return <ToothComponent key={`${jaw}-${side}-${index}`} position={position} url={tooth} onToothDblClick={handleToothDblClick} resetRotation={resetCounter} />;
    }, [resetCounter, handleToothDblClick]);

    const ThreeDModel = useCallback(() => (
        <Canvas camera={{ position: [0, 0, 30] }} style={{ width: '57.5vw', height: '50vh' }}>
            <ambientLight />
            <hemisphereLight skyColor={0xffffff} groundColor={0x444444} intensity={2.5} />
            <Suspense fallback={<Html center><Loader /></Html>}>
                {Object.entries(DataOfTeeth).map(([jaw, sides]) => (
                    Object.entries(sides).map(([side, teeth]) => teeth.map((tooth, index) => renderTooth(tooth, index, jaw, side)))
                ))}
            </Suspense>
        </Canvas>
    ), [renderTooth]);

    const contentMap = {
        contentBase: <><ThreeDModel />Base Plan</>,
        contentTreatment: <><ThreeDModel /><TreatmentPopup /></>,
        contentPeri: <><ThreeDModel /><PeriPopup /></>
    };

    return (

        <div className='teeth-model-container'>

            <button onClick={handleResetRotation}>Reset Rotation</button>
            {selectedTooth ? <TreatmentPlan selectedTooth={selectedTooth} onClose={() => { setShowTreatmentPlan(false); setSelectedTooth(null); }} /> : contentMap[activeContent]}

        </div>

    );
}

export default React.memo(TeethModel);

import '../../StyleSheets/MainWindow/TeethModel.css';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { Html, Loader } from '@react-three/drei';
import PeriPopup from '../PeridontalPopup/PeriPopup';
import DataOfTeeth from './TeethData';
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
    const positionX = (index - 3.5) * 5 + (sideIndex * 40) - 20;
    return [positionX, jawIndex === 0 ? 10 : -10, 0];
};

function TeethModel({ activeContent, setChildModeActive, setTreatmentTodo, treatmentTodo}) {
    const [showTreatmentPopup, setshowTreatmentPopup] = useState(false);
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [resetCounter, setResetCounter] = useState(0);

    //adjust the half screen
    const computeFOV = () => {
        const viewportWidth = window.innerWidth;
        const baseFOV = 75;
        const scalingFactor = 900;
        return baseFOV + (viewportWidth * scalingFactor);
    };

    const [fov, setFOV] = useState(computeFOV());  // Now, computeFOV is declared before it's used

    useEffect(() => {
        const handleResize = () => {
            setFOV(computeFOV());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    //

    const handleResetRotation = useCallback(() => {
        setResetCounter(prevCount => prevCount + 1);
    }, []);

    const handleToothDblClick = useCallback((toothUrl) => {
        setSelectedTooth(toothUrl);
        setshowTreatmentPopup(true);
    }, []);
    
    
        const renderTooth = useCallback((tooth, index, jaw, side) => {
        const position = getToothPosition(['upper', 'lower'].indexOf(jaw), ['left', 'right'].indexOf(side), index);
        return <ToothComponent key={`${jaw}-${side}-${index}`} position={position} url={tooth} onToothDblClick={handleToothDblClick} resetRotation={resetCounter} />;
    }, [resetCounter, handleToothDblClick]);

    const ThreeDModel = useCallback(() => (
            <Canvas camera={{ position: [0, 0, 30], fov: fov }} style={{ width: '100%', height: '50vh' }}>
            <ambientLight />
            <hemisphereLight skyColor={0xffffff} groundColor={0x444444} intensity={2.5} />
            <Suspense fallback={<Html center><Loader /></Html>}>
                {Object.entries(DataOfTeeth).map(([jaw, sides]) => (
                    Object.entries(sides).map(([side, teeth]) => teeth.map((tooth, index) => renderTooth(tooth, index, jaw, side)))
                ))}
            </Suspense>
        </Canvas>
    ), [renderTooth, fov]);

    const contentMap = {
        contentBase: <><ThreeDModel /></>,
        contentTreatment: <><ThreeDModel /><TreatmentPopup /></>,
        contentPeri: <><ThreeDModel /><PeriPopup /></>
    };

    return (
        <div className='teeth-model-container'>
            <button onClick={handleResetRotation}>Reset Rotation</button>
            
            {showTreatmentPopup && <TreatmentPopup setshowTreatmentPopup={setshowTreatmentPopup} toothUrl={selectedTooth} onClose={() => setshowTreatmentPopup(false)}  setTreatmentTodo={setTreatmentTodo} treatmentTodo={treatmentTodo}/>}  

            {!showTreatmentPopup && contentMap[activeContent]}
            <div className='modelOption'>
                <button onClick={()=>{setChildModeActive(true)}}>Display child model</button>
            </div>
            
        </div>
    );
}

export default React.memo(TeethModel);
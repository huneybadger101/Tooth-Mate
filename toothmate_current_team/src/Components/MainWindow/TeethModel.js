import '../../StyleSheets/MainWindow/TeethModel.css';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import React, { Suspense, useRef, useState } from 'react';
import { Html, Loader } from '@react-three/drei';
import PeriPopup from '../PeridontalPopup/PeriPopup';
import DataOfTeeth from './TeethData';

const ToothComponent = ({ position, url }) => {
    const gltf = useLoader(GLTFLoader, url);
    const scale = [2.5, 2.5, 2.5];
    const mesh = useRef();
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setStartY(e.clientY);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const dx = (e.clientX - startX) * 0.0005;
            const dy = (e.clientY - startY) * 0.0005;
            setRotation((prev) => ({
                x: prev.x + dy,
                y: prev.y,
                z: prev.z + dx
            }));
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setRotation({ x: 0, y: 0, z: 0 });  // Reset rotation for all axes
    };

    return (
        <primitive
            ref={mesh}
            position={position}
            rotation={[rotation.x, rotation.y, rotation.z]}
            object={gltf.scene}
            scale={scale}
            onPointerDown={handleMouseDown}
            onPointerMove={handleMouseMove}
            onPointerUp={handleMouseUp}
            onDoubleClick={() => {
                window.location.href = "/new-url"; // Ensure this URL is correct or dynamically set.
            }}
        />
    );
};

const getToothPosition = (jawIndex, sideIndex, index) => {
    const positionX = (index - 4) * 5 + (sideIndex * 40) - 20;
    const positionY = jawIndex === 0 ? 10 : -10;
    const positionZ = 0;

    return [positionX, positionY, positionZ];
};

function TeethModel(props) {
    const ThreeDModel = () => {
        return (
            <Canvas camera={{ position: [0, 0, 30] }} style={{ width: '57.5vw', height: '50vh' }}>
                <ambientLight />
                <hemisphereLight skyColor={0xffffff} groundColor={0x444444} intensity={2.5} />
                <Suspense fallback={<Html center><Loader /></Html>}>
                    {['upper', 'lower'].map((jaw, jawIndex) => (
                        ['left', 'right'].map((side, sideIndex) => (
                            DataOfTeeth[jaw][side].map((tooth, index) => {
                                const position = getToothPosition(jawIndex, sideIndex, index);
                                return <ToothComponent key={`${jaw}-${side}-${index}`} position={position} url={tooth} />;
                            })
                        ))
                    ))}
                </Suspense>
            </Canvas>
        );
    };
    
    const { activeContent } = props;
    const contentMap = {
        contentBase: <div><ThreeDModel />Base Plan</div>,
        contentTreatment: <div><ThreeDModel />Treatment Plan</div>,
        contentPeri: <div><ThreeDModel /><PeriPopup /></div>,
    };

    return (
        <div className='grid-layout'>
            <div className="teeth-model-container">
                {contentMap[activeContent]}
            </div>
        </div>
    );
}

export default React.memo(TeethModel);

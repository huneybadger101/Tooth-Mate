import React, { useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { Html, Loader } from '@react-three/drei';

const Tooth = ({ position, url }) => {
  const gltf = useLoader(GLTFLoader, url);
  const scale = [2.5, 2.5, 2.5]; 
  const mesh = useRef();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
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
      setRotation((prev) => ({ x: prev.x + dy, y: prev.y + dx }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setRotation({ x: 0, y: 0 });  // Reset rotation
  };

  return (
    <primitive
      ref={mesh}
      position={position}
      rotation={[rotation.x, rotation.y, 0]}
      object={gltf.scene}
      scale={scale}
      onPointerDown={handleMouseDown}
      onPointerMove={handleMouseMove}
      onPointerUp={handleMouseUp}
      onDoubleClick={() => {
        window.location.href = "/new-url";
      }}
    />
  );
};

function App() {
  const teeth = {
    upper: {
      left: ['public/Left_Upper_Wisdom.glb', 'public/Left_Upper_Second_Molar.glb', 'public/Left_Upper_First_Molar.glb', 'public/Left_Upper_Second_Premolar.glb', 'public/Left_Upper_First_Premolar.glb', 'public/Left_Upper_Canine.glb', 'public/Left_Upper_Lateral_Incisor.glb', 'public/Left_Upper_Central_Incisor.glb'],
      right: ['public/Right_Upper_Central_Incisor.glb', 'public/Right_Upper_Lateral_Incisor.glb', 'public/Right_Upper_Canine.glb', 'public/Right_Upper_First_Premolar.glb', 'public/Right_Upper_Second_Premolar.glb', 'public/Right_Upper_First_Molar.glb', 'public/Right_Upper_Second_Molar.glb', 'public/Right_Upper_Wisdom.glb']
    },
    lower: {
      left: ['public/Left_Lower_Wisdom.glb', 'public/Left_Lower_Second_Molar.glb', 'public/Left_Lower_First_Molar.glb', 'public/Left_Lower_Second_Premolar.glb', 'public/Left_Lower_First_Premolar.glb', 'public/Left_Lower_Canine.glb', 'public/Left_Lower_Lateral_Incisor.glb', 'public/Left_Lower_Central_Incisor.glb'],
      right: ['public/Right_Lower_Central_Incisor.glb', 'public/Right_Lower_Lateral_Incisor.glb', 'public/Right_Lower_Canine.glb', 'public/Right_Lower_First_Premolar.glb', 'public/Right_Lower_Second_Premolar.glb', 'public/Right_Lower_First_Molar.glb', 'public/Right_Lower_Second_Molar.glb', 'public/Right_Lower_Wisdom.glb']
    }
  };


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 30] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<Html center><Loader /></Html>}>
          {['upper', 'lower'].map((jaw, jawIndex) => (
            ['left', 'right'].map((side, sideIndex) => (
              teeth[jaw][side].map((tooth, index) => {
                const positionX = (index - 4) * 5 + (sideIndex * 40) - 20;
                const positionY = jawIndex === 0 ? 10 : -10; // Separate upper and lower jaws
                const positionZ = 0;
                const position = [positionX, positionY, positionZ];
                return <Tooth key={`${jaw}-${side}-${index}`} position={position} url={tooth} />;
              })
            ))
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
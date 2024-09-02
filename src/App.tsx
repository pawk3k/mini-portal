import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import {
  Box,
  Environment,
  KeyboardControls,
  OrthographicCamera,
} from "@react-three/drei";

import { Suspense } from "react";

import Map from "./Map";
import { TwoCamerasInterchanged } from "./components/TwoCamerasInterchanged";
import { Cube } from "./components/Cube";
import { CharacterController } from "./components/CharacterControl";

export default function App() {
  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
  ];

  return (
    <>
      <Canvas
        shadows
        // onPointerDown={(event?: any) => event.target.requestPointerLock()}
      >
        {/* <Perf position="top-left" /> */}

        <Environment background files="/night.hdr" />
        <directionalLight
          intensity={0.65}
          castShadow
          position={[-15, 10, 15]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00005}
        >
          <OrthographicCamera
            left={-22}
            right={15}
            top={10}
            bottom={-20}
            attach={"shadow-camera"}
          />
        </directionalLight>
        <Physics timeStep="vary">
          <KeyboardControls map={keyboardMap}>
            <Suspense fallback={null}>
              <CharacterController />

              <Map scale={[5, 5, 5]} position={[4, 0, 0]}>
                <Box args={[1, 1, 1]} position={[-1, 0.5, -3]}>
                  <meshStandardMaterial color="red" />
                </Box>
                <Cube />
              </Map>

              <TwoCamerasInterchanged />
            </Suspense>
          </KeyboardControls>
        </Physics>
      </Canvas>
    </>
  );
}

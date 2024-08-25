import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import {
  Environment,
  KeyboardControls,
  PointerLockControls,
} from "@react-three/drei";

import { Perf } from "r3f-perf";
import {
  ChangeEvent,
  forwardRef,
  PointerEventHandler,
  PropsWithChildren,
  Suspense,
} from "react";
import Ecctrl, { EcctrlJoystick } from "ecctrl";

import Lights from "./Lights";
import Map, { Instances } from "./Map";
import CharacterModel from "./CharacterModel";

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
      {/* For mobile devices */}
      {/* <EcctrlJoystick /> */}
      <Canvas
        shadows
        onPointerDown={(event?: any) => {
          event.target.requestPointerLock();
        }}
      >
        <Perf position="top-left" />
        <Environment background files="/night.hdr" />
        <Lights />
        <KeyboardControls map={keyboardMap}>
          <Physics timeStep="vary" debug>
            <Suspense fallback={null}>
              <Ecctrl
                debug
                camInitDir={{ x: 0.4, y: 0 }}
                camInitDis={-2.0}
                camLerpMult={1000}
                camMinDis={-0.01}
                camFollowMult={100}
                turnVelMultiplier={1}
                turnSpeed={100}
                mode="CameraBasedMovement"
              >
                <CharacterModel />
              </Ecctrl>

              <Map scale={[3, 3, 3]} position={[0, -5, 0]} />
            </Suspense>
          </Physics>
        </KeyboardControls>
      </Canvas>
    </>
  );
}

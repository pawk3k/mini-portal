import { useCallback } from "react";
import { Frame } from "./Portal";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

export function TwoCamerasInterchanged() {
  const camera1 = useCallback((camera: THREE.PerspectiveCamera) => {
    camera.lookAt(0, 0, 0);
    // set the ref to the camera
    // @ts-expect-error - current is not defined in the type
    camera1.current = camera;
  }, []);

  const camera2 = useCallback((camera: THREE.PerspectiveCamera) => {
    camera.lookAt(0, 0, 0);
    // set the ref to the camera
    // @ts-expect-error - current is not defined in the type
    camera2.current = camera;
  }, []);

  // useHelper(camera1, THREE.CameraHelper);
  // useHelper(camera2, THREE.CameraHelper);

  return (
    <>
      <Frame
        additionalCamera={camera2}
        position={[-1.6, 0, 17.6]}
        id={""}
        name={"First Portal"}
      >
        <PerspectiveCamera ref={camera1} />
      </Frame>

      <Frame
        position={[-15.88, 1, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        additionalCamera={camera1}
        id={""}
        name={"Second Portal"}
      >
        <PerspectiveCamera ref={camera2} />
      </Frame>
    </>
  );
}

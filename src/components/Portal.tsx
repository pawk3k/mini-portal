import { useFBO } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { quat, RigidBody } from "@react-three/rapier";
import { useRef } from "react";

import * as THREE from "three";
import { Group } from "three";
export function Frame({
  id,
  name,
  width = 4,
  height = 4,
  children,
  position,
  rotation,
  scale,
  additionalCamera,
  ...props
}: {
  id: string;
  additionalCamera: any;
  name: string;
  width?: number;
  height?: number;
  children?: React.ReactNode;
  position: THREE.Vector3Tuple;
  rotation?: THREE.EulerTuple;
  scale?: THREE.Vector3Tuple;
}) {
  const portalMaterialRef = useRef(null);
  const groupRef = useRef<THREE.Group>(null);
  // const camera = useRef<THREE.PerspectiveCamera>(null);
  const renderTarget = useFBO();

  useFrame(({ gl, scene }) => {
    if (!portalMaterialRef.current || !additionalCamera.current) return;

    gl.setRenderTarget(renderTarget);
    gl.render(scene, additionalCamera.current);

    gl.setRenderTarget(null);

    portalMaterialRef.current.map = renderTarget.texture;
  });

  return (
    <RigidBody
      name={name}
      sensor
      onIntersectionEnter={(collisionPayload) => {
        // if (!collisionPayload.other.colliderObject?.name) return;
        if (!collisionPayload.other.rigidBodyObject?.name) return;

        const intersectedObject = collisionPayload.other;
        console.log(collisionPayload);

        const { x, z } = additionalCamera.current.parent.position || {};

        intersectedObject.rigidBody?.setTranslation(
          new THREE.Vector3(x + 1, 3, z + 1),
          true
        );
      }}
      onIntersectionExit={(collisionPayload) => {
        const intersectedObject = collisionPayload.other.rigidBody?.userData
          ?.current as Group<THREE.Object3DEventMap>;
        console.log("intersection exit");

        intersectedObject.rotation.set(0, Math.PI / 2, 0);

        // const { x, y, z } = additionalCamera.current.parent.rotation || {};
        // // I want to rotate the intersected object to the same rotation as the camera
        // console.log(
        //   intersectedObject.rigidBody?.setRotation(
        //     new THREE.Quaternion().setFromEuler(
        //       new THREE.Euler(x, Math.PI / 2, z, "XYZ")
        //     ),
        //     true
        //   )
        // );
        // // intersectedObject.rigidBody?.setRotation(
        // //   new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z, "XYZ")),
        // //   true
        // // );
      }}
    >
      <group ref={groupRef} rotation={rotation} position={position} {...props}>
        {children}
        <mesh name={id}>
          <circleGeometry args={[4, 32, 0, Math.PI * 2]} />
          <meshBasicMaterial ref={portalMaterialRef} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </RigidBody>
  );
}
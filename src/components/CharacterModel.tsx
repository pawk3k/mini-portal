/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Noby Grand (https://sketchfab.com/NobyGrand)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/ghost-w-tophat-6b1217e3462440519a2d0e3e75bf16d3
Title: Ghost w/ Tophat
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Eyes_Eyes_0: THREE.Mesh;
    Eyes_Ghost_White_0: THREE.Mesh;
    Body_Ghost_White_0: THREE.Mesh;
    Rim_Rim_Red_0: THREE.Mesh;
  };
  materials: {
    Eyes: THREE.MeshStandardMaterial;
    Ghost_White: THREE.MeshStandardMaterial;
    Rim_Red: THREE.MeshStandardMaterial;
  };
};
export function Player(props: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}) {
  const { nodes, materials } = useGLTF("./ghost_w_tophat.glb") as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group scale={0.0034} position={[0, 0, 0]}>
        <group
          position={[0, 155.777, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <mesh
            castShadow
            receiveShadow
            // @ts
            geometry={nodes.Eyes_Eyes_0.geometry}
            material={materials.Eyes}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Eyes_Ghost_White_0.geometry}
            material={materials.Ghost_White}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body_Ghost_White_0.geometry}
          material={materials.Ghost_White}
          position={[0, 155.777, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Rim_Rim_Red_0.geometry}
          material={materials.Rim_Red}
          position={[0, 235.411, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./ghost_w_tophat.glb");

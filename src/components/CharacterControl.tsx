import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useRef } from "react";
import { Group, MathUtils, Object3DEventMap, Vector3 } from "three";
import { Player } from "./CharacterModel";

const normalizeAngle = (angle: any) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start: number, end: number, t: number) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }

  return normalizeAngle(start + (end - start) * t);
};

export const CharacterController = () => {
  const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED } = {
    WALK_SPEED: 4,
    RUN_SPEED: 1.6,
    ROTATION_SPEED: 0.02,
  };
  const rigidBody = useRef<RapierRigidBody>(null);
  const container = useRef<Group<Object3DEventMap>>(null);
  const character = useRef<Group<Object3DEventMap>>(null);
  const cameraTarget = useRef<Group<Object3DEventMap>>(null);
  const cameraPosition = useRef<Group<Object3DEventMap>>(null);

  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();

  useFrame(({ camera }) => {
    if (rigidBody.current) {
      const currentVelocity = rigidBody.current.linvel();

      const movement = {
        x: 0,
        z: 0,
      };

      if (get().forward) {
        movement.z = 1;
      }
      if (get().backward) {
        movement.z = -1;
      }

      let speed = get().run ? RUN_SPEED : WALK_SPEED;

      if (get().leftward) movement.x = 1;

      if (get().rightward) movement.x = -1;

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        currentVelocity.x =
          Math.sin(rotationTarget.current + characterRotationTarget.current) *
          speed;
        currentVelocity.z =
          Math.cos(rotationTarget.current + characterRotationTarget.current) *
          speed;
      }

      if (character.current) {
        character.current.rotation.y = lerpAngle(
          character.current.rotation.y,
          characterRotationTarget.current,
          0.1
        );
      }

      rigidBody.current.setLinvel(currentVelocity, true);
    }

    // CAMERA
    if (container.current) {
      container.current.rotation.y = MathUtils.lerp(
        container.current.rotation.y,
        rotationTarget.current,
        0.1
      );
    }

    if (cameraPosition.current) {
      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
    }

    camera.position.lerp(cameraWorldPosition.current, 0.1);

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }
  });

  // useHelper(cameraTarget, THREE.BoxHelper, "cyan");

  return (
    <RigidBody
      colliders={false}
      lockRotations
      name="character"
      ref={rigidBody}
      position-y={5}
      userData={character}
    >
      <group ref={container} name="character">
        <group ref={cameraTarget} />
        <group ref={cameraPosition} position-y={4} position-z={-5} />
        <group ref={character}>
          <Player />
        </group>
      </group>
      <CapsuleCollider args={[0.08, 0.15]} />
    </RigidBody>
  );
};

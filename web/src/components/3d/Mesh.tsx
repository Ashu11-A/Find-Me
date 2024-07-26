import { useFrame, useLoader } from "@react-three/fiber";
import { MutableRefObject, useEffect, useRef } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export function MeshComponent({ path, onRef }: { path: string, onRef: (ref: MutableRefObject<Mesh>) => void }) {
    const gltf = useLoader(GLTFLoader, path);
    const mesh = useRef<Mesh>(null!)
  
    useEffect(() => {
      if (onRef) {
        onRef(mesh)
      }
    }, [onRef])
    
    useFrame(() => {
      mesh.current.scale.set(0.6, 0.6, 0.6)
    })
  
    return (
      <mesh ref={mesh}>
        <primitive object={gltf.scene} />
      </mesh>
    );
  }
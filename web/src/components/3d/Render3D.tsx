import { Canvas } from "@react-three/fiber";
import { MeshComponent } from "./Mesh";
import { MutableRefObject } from "react";
import { Mesh } from "three";
import { OrbitControls } from "@react-three/drei";

export function Render3D ({ path, onRef }: { path: string, onRef: (ref: MutableRefObject<Mesh>) => void }){
  return (
    <div className='flex h-full w-full'>
      <Canvas className='h-2xl w-2xl'>
        <OrbitControls />
        <MeshComponent onRef={onRef} path={path} />
      </Canvas>
    </div>
  );
}
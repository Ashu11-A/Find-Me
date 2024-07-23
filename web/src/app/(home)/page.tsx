'use client'

import { cn } from "@/lib/utils";
import { MutableRefObject, useEffect, useRef } from "react";
import { Mesh } from "three";
import localFont from 'next/font/local'
import { Render3D } from "@/components/3d/Render3D";
import { Button } from "@/components/ui/button";

const font = localFont({ src: '../../../public/fonts/Anton-Regular.ttf' })

export default function Home() {
  const mesh = useRef<Mesh>(null!)
  const handleRef = (ref: MutableRefObject<Mesh>) => {
    mesh.current = ref.current;
  };

  useEffect(() => {
    setInterval(() => {
      // mesh.current.position.random()
      // mesh.current.rotation.y = 0
    }, 1000)
  }, [mesh])

  return (
  <div className="flex flex-col">
    <div className="flex justify-end p-5">
      <Button variant='default' >Add more</Button>
    </div>
    <div className={cn(
      "overflow-hidden",
      "relative flex-col items-center justify-center",
      "bg-current rounded-3xl",
      "md:w-[800px] w-[400px] h-[400px] md:h-[800px] sm:w-[600px] sm:h-[600px]"
    )}>
      <div className="flex h-full w-full absolute">
        <Render3D onRef={handleRef} path="/arrow/scene.gltf" />
      </div>
      <div className="flex flex-col w-full pt-10 pl-10 absolute">
        <p className="text-3xl font-semibold text-primary-foreground">Matheus</p>
        <p className="text-primary-foreground">15°51'50.0"S 47°49'14.0"W</p>
      </div>
      <div className="flex justify-center items-end pb-16 h-full w-full bottom-10">
        <div className="flex flex-col items-center">
          <p className='text-primary-foreground'>Rua San Diego</p>
          <p className={cn(font.className, 'text-4xl text-primary-foreground')}>Há 0.6 KM</p>
        </div>
      </div>
    </div>
  </ div>
  );
}

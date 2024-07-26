'use client'

import { Render3D } from "@/components/3d/Render3D";
import { Button } from "@/components/ui/button";
import { calculateAzimute } from "@/lib/calAzimute";
import { cn } from "@/lib/utils";
import haversine from 'haversine-distance';
import localFont from 'next/font/local';
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Mesh } from "three";

interface Coordinate {
  accuracy: number
  latitude: number
  longitude: number
  altitude: number | null
}

const exLatitude = -15.543790
const exLongitude = -47.4639979

function getAdjustedBearing(bearing: number, deviceOrientation: number) {
  // Ajusta o azimute baseado na orientação do dispositivo
  let adjustedBearing = (bearing - deviceOrientation + 360) % 360;
  console.log(`Ajuste de posição: ${adjustedBearing}`)
  return adjustedBearing;
}

const font = localFont({ src: '../../../public/fonts/Anton-Regular.ttf' })

export default function Home() {
  const mesh = useRef<Mesh>(null!)
  const handleRef = (ref: MutableRefObject<Mesh>) => mesh.current = ref.current
  
  const [direction, setDirection] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)

  const [turnLeft, setTurnLeft] = useState(false)
  const [rising, setRisingp] = useState(false)

  const [coordinated, setCoordinated] = useState<Coordinate | null>(null)
  const [serverCoordinated, setServerCoordinated] = useState<Coordinate | null>(null)

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setServerCoordinated({ accuracy: 100, altitude: null, latitude: -15.5214095, longitude: -47.4917214 })
        // setServerCoordinated(coords)
        setCoordinated({ accuracy: 100, altitude: null, latitude: exLatitude, longitude: exLongitude })
      }, (error) => {
        console.log(error)
      })
    }
  }, [coordinated, serverCoordinated])

  useEffect(() => {
    if (serverCoordinated === null) return
    // setDirection(getAdjustedBearing(calculateAzimute([serverCoordinated.latitude, serverCoordinated.longitude], [exLatitude, exLongitude]), 272))
    setDirection(calculateAzimute([serverCoordinated.latitude, serverCoordinated.longitude], [exLatitude, exLongitude]))
    setDistance(haversine([serverCoordinated.latitude, serverCoordinated.longitude], [exLatitude, exLongitude]) / 1000)
  }, [serverCoordinated])

  useEffect(() => {
    if (mesh.current && direction !== null) {
      console.log(`Localização: ${direction}`)
      mesh.current.rotation.x = direction / 360
      mesh.current.rotation.y = direction / 360
    }
  }, [mesh, direction])

  useEffect(() => {
    if (mesh.current?.rotation === undefined) return
    if (coordinated !== null) return

    const intervalId = setInterval(() => {
      if (coordinated !== null) { clearInterval(intervalId); return}
  
      mesh.current.rotation.y < 0.5 ? setTurnLeft(true) : setTurnLeft(false)
      rising ? mesh.current.rotation.y += 0.01 : mesh.current.rotation.y -= 0.01

      mesh.current.rotation.x < 0.5 ? setRisingp(true) : setRisingp(false)
      turnLeft ? mesh.current.rotation.x += 0.01 : mesh.current.rotation.x -= 0.01
    }, 10)

    return () => clearInterval(intervalId)
  }, [mesh, rising, turnLeft, coordinated])

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
        {coordinated !== null
        ? <>
          <p className="text-primary-foreground">{`Latitude: ${coordinated.latitude.toString().split('.')[0]}°${coordinated.latitude.toString().split('.')[1].slice(0, 2)}'${coordinated.latitude.toString().split('.')[1].slice(2, 4)}.${coordinated.latitude.toString().split('.')[1].slice(4, 10)}`}</p>
          <p className="text-primary-foreground">{`Longitude: ${coordinated.longitude.toString().split('.')[0]}°${coordinated.longitude.toString().split('.')[1].slice(0, 2)}'${coordinated.longitude.toString().split('.')[1].slice(2, 4)}.${coordinated.longitude.toString().split('.')[1].slice(4, 10)}`}</p>
        </>
        : <><p className="text-primary-foreground">indefinite</p></>
        }
      </div>
      <div className="flex justify-center items-end pb-16 h-full w-full bottom-10">
        <div className="flex flex-col items-center">
          {coordinated !== null && distance !== null
          ? <>
            <p className='text-primary-foreground'>Rua San Diego</p>
            <p className={cn(font.className, 'text-4xl text-primary-foreground')}>{`Há ${distance.toFixed(2)} KM`}</p>
          </>
          : <>
            <p className={cn(font.className, 'text-4xl text-primary-foreground')}>Searching</p>
          </>
         }
        </div>
      </div>
    </div>
  </div>
  );
}

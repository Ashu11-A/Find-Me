import { toDegrees, toRadians } from "./format";

/**
 * Comparar duas localizações (latitude e longitude) e determinar a direção em graus
 */
export function calculateAzimute([startLat, startLng]: [number, number], [destLat, destLng]: [number, number]) {
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    const y = Math.sin(destLng - startLng) * Math.cos(destLat);
    const x = Math.cos(startLat) * Math.sin(destLat) -
          Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let bearing = Math.atan2(y, x);
    bearing = toDegrees(bearing);

    // Ajustar para o intervalo de 0 a 360 graus
    return (bearing + 360) % 360;
}
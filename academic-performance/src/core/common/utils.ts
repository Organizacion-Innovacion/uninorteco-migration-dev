import { DomainError, ErrorCode } from "./errors";

/**
 * Calculates the distance between two points on the surface of the Earth using the Haversine formula.
 * @param {number} lat1 - Latitude of the first point in decimal degrees.
 * @param {number} lon1 - Longitude of the first point in decimal degrees.
 * @param {number} lat2 - Latitude of the second point in decimal degrees.
 * @param {number} lon2 - Longitude of the second point in decimal degrees.
 * @returns {number} The distance between the two points in kilometers.
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadius = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
}

/**
 * Converts degrees to radians.
 * @param {number} degrees - Value in degrees.
 * @returns {number} Value in radians.
 */
function toRadians(degrees: number): number {
  if (degrees > 360) {
    throw new DomainError("Degrees must be less than 360", ErrorCode.INVALID_INPUT);
  }

  return (degrees * Math.PI) / 180;
}

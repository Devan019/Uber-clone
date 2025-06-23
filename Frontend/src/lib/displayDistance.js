export default function displayDistance(distance) {
  console.log("Distance:", distance);
  if (distance < 1) {
    return `${(distance * 1000)?.toFixed(2)} m`;
  } else {
    const km = (distance)?.toFixed(2);
    return `${km} km`;
  }
}
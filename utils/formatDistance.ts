const formatDistance = (
  distance: number
): string => {
  if (distance < 1000)
    return `${Math.round(distance)}m`
  else
    return `${(distance / 1000).toFixed(2)}km`
}

export default formatDistance

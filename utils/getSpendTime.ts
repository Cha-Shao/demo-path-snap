const getSpendTime = (distance: number): [number, number] => {
  if (distance < 30000)
    return [0, Math.floor(distance / (30000 / 60))]
  const hour = Math.floor(distance / 40)
  const min = (distance % (30000 / 60)) / 60
  return [Math.floor(hour), Math.floor(min)]
}

export default getSpendTime

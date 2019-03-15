function sortPlayersByTShirtNumber(a, b) {
  const numA = Number.parseInt(a.number)
  const numB = Number.parseInt(b.number)
  if (numA < numB) {
    return -1
  }
  if (numA > numB) {
    return 1
  }
  return 0
}

export default sortPlayersByTShirtNumber

const getRandomColor = (number: number) => {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)

  const newRed = (red + number) % 256
  const newGreen = (green + number) % 256
  const newBlue = (blue + number) % 256

  const color = `rgb(${newRed}, ${newGreen}, ${newBlue})`

  return color
}

export { getRandomColor }

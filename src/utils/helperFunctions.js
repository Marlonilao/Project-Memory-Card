export function pickRandom(array, count) {
  const result = []
  const used = new Set()

  while (result.length < count) {
    const index = Math.floor(Math.random() * array.length)
    if (!used.has(index)) {
      used.add(index)
      result.push(array[index])
    }
  }
  return result
}

export function shuffleArray(array) {
  const shuffled = [...array] // create a shallow copy to avoid mutating state

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // swap elements
  }

  return shuffled
}

export const getNumberOfPokemons = (diff) => {
  const map = { Easy: 12, Medium: 18, Hard: 24 }
  return map[diff] ?? 12
}

export function capitalizeFirstLetter(str) {
  if (!str) return str // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1)
}

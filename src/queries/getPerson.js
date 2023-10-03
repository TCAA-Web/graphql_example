export const getPerson = `query Person($personId: ID) {
  person(id: $personId) {
    name
    height
    gender
    eyeColor
    hairColor
    homeworld {
      name
    }
    species {
      name
    }
  }
}`
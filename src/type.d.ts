interface AppState {
  currentUser: User | null
  currentGroup: Group | null
  onboarding: Onboarding | null
}

// requires authencation
interface User {
  id: number
  name: string
}

// assessible by anyone - public
interface UserProfile {
  id: number
  name: string
}

interface Group {
  id: number
  name: string
  isGroupPermanent: boolean
  dateOfCreation: Date
  members: UserProfile[]
}

interface Skillset {
  id: number
  name: string
  description: string
  type: RatingType
}

interface Onboarding {
  skillsets: Skillset[]
  preferences: Skillset[]
}

enum RatingType {
  Slider,
  TrueFalse,
}

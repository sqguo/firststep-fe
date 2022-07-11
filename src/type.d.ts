interface AppState {
  currentUser: User | null
  currentGroup: Group | null
}

interface User {
  id: number
  name: string
}

interface Group {
  id: number
  name: string
  members: User[]
}

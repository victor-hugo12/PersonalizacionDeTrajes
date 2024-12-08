export interface UserData {
  name: string
}

export interface CustomUser extends UserData {
  id: string
  email: string
  displayName: string
  photoURL: string
}

export interface AuthState {
  loading: boolean
  isAuthenticated: boolean
  webId: string | undefined
  error: string | undefined
}

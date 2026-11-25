export interface Profile {
    webId: string;
    name: string | undefined;
    image: string | undefined;
    storage: string | undefined;
}

export interface AuthState {
  loading: boolean;
  authenticated: boolean;
  webId: string | undefined;
  profile: Profile | undefined;
  error: string | undefined;
}


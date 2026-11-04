import { writable } from 'svelte/store';
import type { Session } from '@inrupt/solid-client-authn-browser';
import type { AuthState } from './types';

const clientName: string = "FEED";

export const authState = writable<AuthState>({
  loading: true,
  isAuthenticated: false,
  webId: undefined,
  error: undefined
});

let session: Session | undefined;
let initialization: Promise<boolean> | undefined;

async function getOrCreateSession(): Promise<Session> {
    if (!session) {
        const { getDefaultSession } = await import('@inrupt/solid-client-authn-browser');
        session = getDefaultSession();
    }
    return session;
}

function updateAuthState(currentSession: Session): boolean {
  const info = currentSession.info;
  const isAuthenticated = info.isLoggedIn;

  authState.set({
      loading: false,
      isAuthenticated,
      webId: info.webId,
      error: undefined
  });

  return isAuthenticated;
}

// ######################
// ##    PUBLIC API    ##
// ######################

export function initializeAuth(): Promise<boolean> {
    if (initialization) {
        return initialization;
    }
    initialization = (async () => {
        try {
            const currentSession = await getOrCreateSession();
            await currentSession.handleIncomingRedirect({
                restorePreviousSession: true
            });

            return updateAuthState(currentSession);

        } catch (err) {
            authState.set({
                loading: false,
                isAuthenticated: false,
                webId: undefined,
                error: err instanceof Error ? err.message : 'Authentication initialization failed'
            });
            throw err;
        }
    })();

    return initialization;
}

export async function login(issuer: string): Promise<void> {
    const currentSession = await getOrCreateSession();
    const redirectUrl = new URL('/auth/callback', window.location.origin).toString();
    await currentSession.login({oidcIssuer: issuer, redirectUrl: redirectUrl, clientname: clientName});
}

export async function logout(): Promise<void> {
    const currentSession = await getOrCreateSession();
    await currentSession.logout({logoutType: 'app'});
    updateAuthState(currentSession);
}


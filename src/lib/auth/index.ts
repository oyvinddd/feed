import { writable } from 'svelte/store';
import type { Session } from '@inrupt/solid-client-authn-browser';
import { getProfileAll, getThing, getStringNoLocale, getUrl } from '@inrupt/solid-client';
import { FOAF } from '@inrupt/vocab-common-rdf';
import type { Profile, AuthState } from './types';

const clientName: string = 'FEED';

export const authState = writable<AuthState>({
    loading: true,
    authenticated: false,
    webId: undefined,
    profile: undefined,
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

async function getProfileFromWebId(webId?: string): Promise<Profile | undefined> {
    if (!webId) return undefined;
    const data = await getProfileAll(webId, { fetch: solidFetch });
    const storageUrl = 'http://www.w3.org/ns/pim/space#storage';

    const thing = getThing(data.webIdProfile, webId);
    let name = thing ? getStringNoLocale(thing, FOAF.name) : undefined;
    const image = thing ? getUrl(thing, FOAF.img) : undefined;
    const storage = thing ? getUrl(thing, storageUrl) : undefined;

    if (!name) {
        name = 'anonymous';
    }

    return {webId: webId, name: name, image: image, storage: storage };
}

function updateAuthState(currentSession: Session, profile?: Profile): boolean {
  const info = currentSession.info;
  const authenticated = info.isLoggedIn;

  authState.set({
      loading: false,
      authenticated: authenticated,
      webId: info.webId,
      profile: profile,
      error: undefined
  });

  return authenticated;
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

            // fetch Solid profile
            const webId = currentSession.info.webId;
            const profile = await getProfileFromWebId(webId);
            console.log(`Current profile: ${JSON.stringify(profile, null, 2)}`);

            return updateAuthState(currentSession, profile);

        } catch (err) {
            authState.set({
                loading: false,
                authenticated: false,
                webId: undefined,
                profile: undefined,
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

export async function solidFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const currentSession = await getOrCreateSession()
    if (!currentSession.info.isLoggedIn) {
        throw new Error('Not authenticated')
    }
    return currentSession.fetch(input, init)
}


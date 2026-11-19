import { getPodUrlAll } from '@inrupt/solid-client'
import { authState } from '$lib/auth'
import { solidFetch } from '$lib/auth'

export async function getPodUrl(): Promise<string> {
    let webId: string | undefined;

    const unsubscribe = authState.subscribe((state) => {
        webId = state.webId;
    })

    unsubscribe();

    if (!webId) {
        throw new Error('Not authenticated')
    }

    const podUrls = await getPodUrlAll(webId, { fetch: solidFetch });

    if (podUrls.length === 0) {
        throw new Error('No Pod storage URL found');
    }
    
    return podUrls[0];
}

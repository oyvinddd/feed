<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { initializeAuth } from '#lib/auth';

	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

    onMount(() => {
        initializeAuth()
            .then((authenticated) => {
                if (authenticated && window.location.pathname === '/auth/callback') {
                    goto('/');
                }
            })
            .catch((error) => {
                console.error('Authentication init failed:', error);
            });
    });

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

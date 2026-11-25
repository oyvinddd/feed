<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { initializeAuth } from '#lib/auth';

	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

    import Header from '#lib/comps/header.svelte';

	let { children }: LayoutProps = $props();

    onMount(() => {
        // we try initializing auth session on every page reload
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

<div class="grid grid-cols-12 h-screen max-w-7xl mx-auto">
    <main class="flex flex-col h-screen col-span-12 md:col-span-8 md:col-start-3 lg:col-span-10 lg:col-start-2">
        <!-- render header on all pages -->
        <Header />
        <div class="flex flex-1 flex-col min-h-0">
            <!-- render main content -->
            {@render children()}
        </div>
    </main>
</div>

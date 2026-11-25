<script lang="ts">

    import ChatRow from '#lib/comps/chat_row.svelte';
    import BottomBar from '#lib/comps/bottom_bar.svelte';

    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { authState, initializeAuth } from '#lib/auth';
    import type { Message } from '#lib/types/message';
    
    let draft = $state('');
    let messages = $state([{ userId: 'some-id', username: 'oyvind_h', text: 'Welcome to FEED!' }]);

    function handleSendMessage(text: string) {
        const message: Message = {
            userId: 'my-id-here',
            username: 'my-username-here',
            text: text
        };
        messages.push(message);
        console.log(`Sending the message: ${message}`);
    }

    onMount(async () => {
        const loginPath = '/auth';
        try {
            const authenticated = await initializeAuth();
            if (!authenticated) {
                await goto(loginPath);
                return;
            }
        } catch (err) {
            await goto(loginPath);
            return;
        }
    });

</script>

<svelte:head>
    <title>FEED</title>
    <meta name="description" content="A more open, user-controlled way to chat." />
</svelte:head>

<div class="flex flex-1 min-h-0 flex-col">
    <!-- Message feed -->
    <section class="flex-1 min-h-0 space-y-3 overflow-y-auto px-2 sm:px-4" aria-label="Message feed">
        {#each messages as message, i (i)}
            <ChatRow message={message} isMe={true} />
        {/each}
    </section>

    <!-- Message composer -->
    <BottomBar onSend={handleSendMessage} />
</div>


<script lang="ts">

    import ChatRow from '#lib/comps/chat_row.svelte';
    import BottomBar from '#lib/comps/bottom_bar.svelte';
    
    let draft = $state('')
    let messages = $state([
        'Welcome to FEED.',
        'A simple, open conversation.'
    ]) 

    function handleSendMessage(message: string) {
        messages.push(message);
        console.log(`Sending the message: ${message}`);
    }

</script>

<svelte:head>
    <title>FEED</title>
    <meta name="description" content="A more open, user-controlled way to chat." />
</svelte:head>

<div class="bg-red-500 flex flex-1 min-h-0 flex-col">
    <!-- Message feed -->
    <section class="flex-1 min-h-0 space-y-3 overflow-y-auto p-4 sm:p-6" aria-label="Message feed">
        {#each messages as message, i (i)}
            <ChatRow {message} />
        {/each}
    </section>

    <!-- Message composer -->
    <BottomBar onSend={handleSendMessage} />
</div>


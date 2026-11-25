<script lang="ts">

    let draft = $state('');

    let { onSend }: { onSend: (msg: string) => void } = $props();

    function sendMessage(event: SubmitEvent) {
        event.preventDefault();

        const message = draft.trim();

        if (!message) return;

        // pass message back to the parent page
        onSend(message);
        draft = '';
        console.log("HEHKEH");
    }

</script>

<form class="shrink-0 px-2 sm:px-4 pb-2" onsubmit={sendMessage}>
    <div class="flex w-full items-center px-4 py-3 rounded-lg border border-slate-700 bg-slate-900">
        <input 
            bind:value={draft}
            class="text-sm min-w-0 flex-1 outline-none" 
            placeholder="Write a message..." 
            aria-label="Message" 
        />
        <button type="submit" class="cursor-pointer ml-auto shrink-0 px-3 py-1 rounded-lg bg-cyan-700 font-medium">Send</button>
    </div>
</form>

<!--
<form class="shrink-0 p-3 sm:p-4" onsubmit={sendMessage}>
    <div class="mx-auto flex max-w-3xl gap-3">
        <input
            placeholder="Write a message..."
            aria-label="Message"
            class="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-600"
        />

        <button
            type="submit"
            class="rounded-xl bg-cyan-700 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-cyan-600"
        >
        Send
        </button>
    </div>
</form>
-->

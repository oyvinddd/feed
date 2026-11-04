<script lang="ts">
  let draft = $state('')
  let messages = $state([
    'Welcome to FEED.',
    'A simple, open conversation.'
  ])

  function sendMessage(event: SubmitEvent) {
    event.preventDefault()

    const message = draft.trim()

    if (!message) return

    messages.push(message)
    draft = ''
  }
</script>

<svelte:head>
    <title>FEED</title>
    <meta name="description" content="A more open, user-controlled way to chat." />
</svelte:head>

<div class="bg-red-500 flex flex-1 min-h-0 flex-col">
    <!-- Message feed -->
    <section
        class="flex-1 min-h-0 space-y-3 overflow-y-auto p-4 sm:p-6"
        aria-label="Message feed"
    >
        {#each messages as message, i (i)}
            <article
                class="mx-auto max-w-3xl rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm leading-6 text-white"
            >
                {message}
            </article>
        {/each}
    </section>

    <!-- Message composer -->
    <form class="shrink-0 p-3 sm:p-4" onsubmit={sendMessage}>
        <div class="mx-auto flex max-w-3xl gap-3">
            <input
                bind:value={draft}
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
</div>

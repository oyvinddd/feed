
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
  <meta
    name="description"
    content="A more open, user-controlled way to chat."
  />
</svelte:head>

<main class="flex h-dvh flex-col bg-slate-950 text-slate-100">
  <header class="border-b border-slate-800 px-5 py-4">
    <h1 class="text-lg font-semibold tracking-tight">FEED</h1>
  </header>

  <section
    class="flex-1 space-y-3 overflow-y-auto p-4 sm:p-6"
    aria-label="Message feed"
  >
    {#each messages as message, i (i)}
      <article class="mx-auto max-w-3xl rounded-xl bg-slate-900 px-4 py-3 text-sm leading-6">
        {message}
      </article>
    {/each}
  </section>

  <form
    class="border-t border-slate-800 p-3 sm:p-4"
    onsubmit={sendMessage}
  >
    <div class="mx-auto flex max-w-3xl gap-3">
      <input
        bind:value={draft}
        placeholder="Write a message..."
        aria-label="Message"
        class="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-indigo-500"
      />

      <button
        type="submit"
        class="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-medium hover:bg-indigo-400"
      >
        Send
      </button>
    </div>
  </form>
</main>


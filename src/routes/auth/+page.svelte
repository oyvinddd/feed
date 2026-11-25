<script lang="ts">
  import { authState, login, logout } from '#lib/auth/index';

  let issuer = $state('https://login.inrupt.com')
  let error = $state<string | undefined>()

  async function handleLogin(event: SubmitEvent) {
    event.preventDefault()
    error = undefined

    try {
      await login(issuer.trim())
    } catch (err) {
      error = err instanceof Error
        ? err.message
        : 'Unable to start authentication'
    }
  }

  async function handleLogout() {
    error = undefined

    try {
      await logout()
    } catch (err) {
      error = err instanceof Error
        ? err.message
        : 'Unable to log out'
    }
  }
</script>

<svelte:head>
  <title>FEED</title>
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100">
  <div class="w-full max-w-md space-y-8">

    <header class="text-center">
      <h1 class="text-4xl font-bold tracking-tight">FEED</h1>
      <p class="mt-3 text-slate-400">
        A more open, user-controlled way to chat.
      </p>
    </header>

    {#if $authState.loading}
      <p class="text-center text-slate-400">
        Initializing authentication...
      </p>

    {:else if $authState.authenticated}
      <div class="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p class="text-sm text-slate-400">Authenticated as</p>

        <p class="break-all text-sm font-medium">
          {$authState.webId}
        </p>

        <button
          onclick={handleLogout}
          class="w-full rounded-lg bg-slate-700 px-4 py-3 text-sm font-medium hover:bg-slate-600"
        >
          Sign out
        </button>
      </div>

    {:else}
      <form
        onsubmit={handleLogin}
        class="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6"
      >
        <div>
          <label for="issuer" class="mb-2 block text-sm font-medium">
            Solid identity provider
          </label>

          <input
            id="issuer"
            type="url"
            bind:value={issuer}
            required
            placeholder="https://login.inrupt.com"
            class="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          />
        </div>

        {#if error || $authState.error}
          <p class="text-sm text-red-400">
            {error ?? $authState.error}
          </p>
        {/if}

        <button
          type="submit"
          class="w-full rounded-lg bg-indigo-500 px-4 py-3 text-sm font-medium hover:bg-indigo-400"
        >
          Sign in with Solid
        </button>
      </form>
    {/if}

  </div>
</main>

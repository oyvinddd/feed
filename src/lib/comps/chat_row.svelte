<script lang="ts">

    import type { Message } from '#lib/types/message';

    const { message, isMe }: { message: Message; isMe: boolean; } = $props();

</script>

<article class="">
    <div class="text-white">
        <p class="font-bold">{message.username}<span class="pl-2 font-medium text-xs text-white/60">10:32 AM</span></p>
    </div>
    <div class="">{message.text}</div>
</article>

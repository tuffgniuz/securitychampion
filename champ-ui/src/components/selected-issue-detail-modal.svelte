<script lang="ts">
	import type { Issue } from "$lib/types/models";
	import { LucideList } from "lucide-svelte";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";

  export let isOpen = false;
  export let selectedIssue: Issue | null = null;

  const dispatch = createEventDispatcher();

  const closeModal = () => { dispatch('close') };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModal();
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown)
    }
  })

  onDestroy(() => { 
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeyDown);
    }
  })
</script>

<button 
  class="
    flex 
    items-center 
    gap-2 
    px-4 
    py-2 
    rounded-md 
    bg-mauve 
    text-base
    fixed 
    z-30 
    bottom-10 
    right-10 
    shadow-2xl
  "
 >
  <LucideList size="16" color="#24273a" />
  ({selectedIssue?.requirements.length})
</button>

{#if isOpen}
  <div 
    class="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center" 
    on:click={closeModal}
  >
    <div 
      class="bg-base rounded-md p-4 w-1/3 z-50" 
      on:click|stopPropagation in:slide={{ duration: 400, easing: quintInOut, axis: 'y' }}
    >
      <h1>Issue name</h1>
      <p>Issue description</p>
    </div>  
  </div>
{/if}

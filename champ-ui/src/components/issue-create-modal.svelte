<script lang="ts">
	import { enhance } from "$app/forms";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { quintInOut } from "svelte/easing";
	import { slide } from "svelte/transition";

  export let isOpen = false;

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

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center" on:click={closeModal}>
    <div class="bg-base rounded-md p-4 w-1/3 z-50" on:click|stopPropagation in:slide={{ duration: 400, easing: quintInOut, axis: 'y' }}>
      <h1 class="text-lg font-semibold mb-4">Create new issue</h1>
      <form action="?/createIssue" method="post" class="space-y-4" use:enhance>
        <div class="flex flex-col space-y-2">
          <label class="text-sm">Name</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Issue name..." 
            class="bg-transparent border border-midnightshadow rounded-md p-2 outline outline-1 border-none outline-midnightshadow focus:outline-mauve transition-all duration-500 ease-in-out">
        </div>
        
        <div class="flex flex-col space-y-2">
          <label class="text-sm">Description (optional)</label>
          <textarea 
            name="description" 
            placeholder="Description..."
            class="bg-transparent border border-midnightshadow rounded-md p-2 outline outline-1 border-none outline-midnightshadow focus:outline-mauve transition-all duration-500 ease-in-out" />
        </div>

        <button type="submit" class="bg-mauve text-base rounded-md px-4 py-1">
          Add
        </button>
      </form>
    </div>  
  </div>
{/if}


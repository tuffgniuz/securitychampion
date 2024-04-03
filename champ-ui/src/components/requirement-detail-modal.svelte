<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { quintInOut } from "svelte/easing";

	import type { Requirement } from "$lib/types/models";

  export let isOpen = false;
  export let selectedRequirement: Requirement | null = null;
  export let content: string = '';

  const dispatch = createEventDispatcher();

  const closeModal = () => {
    dispatch('close');
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModal();
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });
</script>

{#if isOpen}
  <div class="fixed inset-0 w-full h-full z-50 flex justify-end">
    <!-- Modal content -->
    <div
      class="w-1/2 max-h-screen overflow-y-auto bg-base shadow-lg z-10 py-10 px-20 transition-all duration-500 ease-in-out"
      transition:slide={{ duration: 500, easing: quintInOut, axis: "x" }}
    >
      <div class="mb-5">
        <span class="bg-mantle rounded-l-md px-4 py-1">Requirement ID</span>
        <span class="bg-morning rounded-r-md px-4 py-1 text-base font-semibold">{selectedRequirement?.requirement_id}</span>
      </div>
      <div class="bg-mantle p-4 rounded-md mb-5">
        <p class="italic">{selectedRequirement?.description}</p>
      </div>
      <div class="prose min-w-full">
        {@html content}
      </div>
    </div>

    <!-- Overlay to close modal on click -->
    <div
      class="fixed inset-0 bg-black opacity-60"
      on:click={closeModal}
      transition:fade={{ duration: 500, easing: quintInOut }}
    />
  </div>
{/if}

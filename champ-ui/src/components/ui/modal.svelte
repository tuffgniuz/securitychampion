<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { quintInOut } from "svelte/easing";

  export let isOpen = false;

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
      transition:slide={{ duration: 5000, easing: quintInOut, axis: "x" }}
    >
      <slot />
    </div>

    <!-- Overlay to close modal on click -->
    <div
      class="fixed inset-0 bg-black opacity-60"
      on:click={closeModal}
      transition:fade={{ duration: 500, easing: quintInOut }}
    />
  </div>
{/if}

<script lang="ts">
	import type { Requirement } from "$lib/types/models";
	import Modal from "./ui/modal.svelte";

  export let isOpen = false;
  export let selectedRequirement: Requirement | null = null;
  export let markdownContent: string = '';

  const closeModal = () => {
    isOpen = false;
  }
</script>

<Modal bind:isOpen on:close={closeModal}>
  <div class="rounded-md">
    <span class="bg-mantle px-4 py-1">ID</span>
    <span class="bg-morning px-2 py-1 text-base">{selectedRequirement?.requirement_id}</span>
  </div>
  <div class="bg-mantle p-4 rounded-md mb-5">
    <p class="italic">{selectedRequirement?.description}</p>
  </div>
  <div class="prose text-morning min-w-full">
    {@html markdownContent}
  </div>
</Modal>

<script lang="ts">
	import Modal from "./ui/modal.svelte";

  export let isOpen = false;
  export let markdownContent: string = '';

  const closeModal = () => {
    isOpen = false;
  }
</script>

<Modal bind:isOpen on:close={closeModal}>
  <div class="prose text-morning min-w-full">
    {@html markdownContent}
  </div>
</Modal>

<script lang="ts">
	import { LucidePlus } from "lucide-svelte";
	import IssueCreateModal from "./issue-create-modal.svelte";

  let isOpen = false;

  const handleOnClick = () => {
    isOpen = true;
  }
</script>

<button 
  class="
    bg-mauve 
    rounded-full 
    p-2 
    fixed 
    z-30
    bottom-4 
    right-10 
    shadow-lg
  "
  on:click={handleOnClick}
>
  <LucidePlus size="16" color="#24273a" />
</button>

{#if isOpen}
  <IssueCreateModal {isOpen} on:close={() => isOpen = false} />
{/if}

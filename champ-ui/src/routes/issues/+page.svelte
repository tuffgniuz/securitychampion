<script lang="ts">
	import { enhance } from "$app/forms";
	import { LucideChevronDown, LucideCopy } from "lucide-svelte";

  export let data;

  let dialog: HTMLDialogElement;

  const showModal = () => {
    dialog.showModal();
  }
</script>

<button 
  class="bg-mauve text-base px-4 py-1 rounded-md"
  on:click={showModal}
>
  Create Issue
</button>

<div class="flex flex-col gap-4 my-10">
{#each data.issues as issue (issue.id)}
  <div class="
      border
      border-midnightshadow 
      cursor-pointer
      px-4 
      py-2 
      rounded-md 
      min-w-full 
      flex 
      items-center 
      justify-between
    "
  >
    <h5 class="font-semibold">{issue.name}</h5>
    <div class="flex items-center gap-5">
      <button class="rounded-md p-2 hover:bg-midnightshadow transition-all duration-500 ease-in-out">
        <LucideCopy size="16"/>
      </button>
      <span>
        <LucideChevronDown size="16" />
      </span>
    </div>
  </div>
{/each}
</div>

<!-- Modal -->
<dialog bind:this={dialog} class="rounded-md w-1/3 bg-base p-6 shadow-lg">
  <h1 class="text-afternoon text-xl font-semibold">Create Issue</h1>
  <form action="?/createIssue" method="post" use:enhance>
    <div class="flex flex-col">
      <input type="hidden" />

      <label class="font-semibold text-morning my-2">Title</label>
      <input 
        type="text" 
        name="name" 
        placeholder="Title..." 
        class="bg-midnightshadow text-morning rounded-sm p-2 mb-4 border-none outline-none focus:outline-1 focus:outline-mauve"
        autocomplete="off"
      />

      <label class="font-semibold text-morning my-2">Description <span class="text-muted">(optional)</span></label>
      <textarea 
        name="description" 
        placeholder="Issue description" 
        class="bg-midnightshadow text-morning rounded-md p-2 outline-none border-none focus:outline-1 focus:outline-mauve" 
      />

      <div class="flex justify-end space-x-2 mt-4">
        <button type="submit" class="bg-mauve text-base px-4 py-1 rounded-md">Create issue</button>
      </div>
    </div>
  </form>
</dialog>

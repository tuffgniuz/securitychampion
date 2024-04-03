<script lang="ts">
	import type { Issue } from "$lib/types/models";
	import { LucideChevronDown } from "lucide-svelte";
	import { onDestroy, onMount } from "svelte";

  export let issues: Issue[] | null = null;

  export let selectedIssue: Issue | null = null; 
  let isOpen = false;

  const toggleDropdown = () => {
    console.log('toggle')
    isOpen = !isOpen;
    console.log('isOpen:', isOpen)
  }

  const selectIssue = (issue: Issue) => {
    selectedIssue = issue;
    isOpen = false;
  }

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown-container')) {
      isOpen = false;
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<div class="relative dropdown-container">
  <div class="bg-midnightshadow rounded-md px-4 py-1 flex items-center gap-2 cursor-pointer outline-none hover:outline hover:outline-1 hover:outline-mauve transition-all duration-300 ease-in-out" on:click={toggleDropdown}>
    {selectedIssue ? selectedIssue.name : 'Select an issue'}
    <span><LucideChevronDown size="16" /></span>
  </div>
  {#if isOpen}
    <div class="absolute z-50 bg-midnightshadow mt-2 min-w-52 rounded-md overfow-auto shadow-xl">
      {#each issues as issue (issue.id)}
        <div class="border-b border-b-base cursor-pointer" on:click={() => selectIssue(issue)}>
          <h6 class="p-2">{issue.name}</h6>
        </div>
      {/each}
    </div>
  {/if}
</div>

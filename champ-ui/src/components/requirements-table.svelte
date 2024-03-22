<script lang="ts">
	import { marked } from 'marked';

  import type { Category } from '$lib/types/models';
	import RequirementDetailModal from './requirement-detail-modal.svelte';
	import { config } from '$lib/config';

  export let categories: Category[];

  let showModal = false;
  let markdownContent = '';

  const handleModalOpen = async (requirementId: string) => {
    const response = await fetch(`${config.baseApiUrl}/api/v1/asvs/requirements/${requirementId}/markdown`)
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      markdownContent = marked.parse(data.content);
      showModal = true;
    } else {
      console.log(`${response.statusText}`)
    }
  }

  const handleModalClose = () => {
    showModal = false;
  }
</script> 

<div class="mt-6">
  {#each categories as category (category.id)}
    <h5 class="text-2xl my-5 text-afternoon font-semibold">{category.name}</h5>
    <p class="mb-10">{category.summary}</p>

    <div class="bg-midnightshadow rounded-lg">
      <table class="text-left">
        <thead>
          <tr class="border-y border-base text-muted">
            <th class="p-3">ID</th>
            <th class="p-3">Description</th>
            <th class="p-3">Levels</th>
          </tr>
        </thead>
        <tbody>
          {#each category.requirements as requirement (requirement.id)}
          <tr class="border-y border-base">
            <td class="p-3 italic align-top text-muted">{requirement.requirement_id}</td>
            <td 
              class="p-3 align-top cursor-pointer" 
              on:click={() => handleModalOpen(requirement.requirement_id)}
            >
              {requirement.description}
            </td>
            <td class="p-3">
              <div class="flex items-center gap-2">
                {#if requirement.level1}<span class="rounded-lg bg-base border border-rosewater text-rosewater p-1 whitespace-nowrap text-sm">Level 1</span>{/if}
                {#if requirement.level2}<span class="rounded-lg bg-base border border-sapphire text-sapphire p-1 whitespace-nowrap text-sm">Level 2</span>{/if}
                {#if requirement.level3}<span class="rounded-lg bg-base border border-maroon text-maroon p-1 whitespace-nowrap text-sm">Level 3</span>{/if}
              </div>
            </td>
          </tr>
          {/each}  
        </tbody>
      </table>
    </div>
  {/each}
</div>

{#if showModal}
  <RequirementDetailModal bind:isOpen={showModal} {markdownContent} on:close={handleModalClose} />
{/if}

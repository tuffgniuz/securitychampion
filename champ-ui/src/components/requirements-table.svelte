<script lang="ts">
	import { marked } from 'marked';

	import { config } from '$lib/config';
  import type { Category } from '$lib/types/models';

	import RequirementDetailModal from './requirement-detail-modal.svelte';

  export let categories: Category[];
  export let activeFilter: { id: string | null; type: string | null };

  let showModal = false;
  let markdownContent = '';

   $: filteredCategories = categories.filter(category => {
    console.log('Filtering with:', activeFilter)
    if (!activeFilter.id) return true;
    if (activeFilter.type === 'category') return category.id === activeFilter.id;
    if (activeFilter.type === 'sub_category') {
      return category.sub_categories?.some((sub) => sub.id === activeFilter.id);
    }
    return false;
  }); 

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
  {#each filteredCategories as category (category.id)}
    <h5 class="text-2xl my-5 text-afternoon font-semibold">{category.name}</h5>
    <p class="mb-5">{category.summary}</p>

    {#each category.sub_categories as sub_category (sub_category.id)}
      <h6 class="text-lg my-5 text-afternoon font-semibold">{sub_category.name}</h6>
      <div class="bg-midnightshadow rounded-lg">
        <table class="text-left">
          <thead>
            <tr class="border-y border-base text-muted">
              <th class="p-3">ID</th>
              <th class="p-3">Description</th>
              <th class="p-3">Levels</th>
              <th class="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {#each sub_category.requirements as requirement (requirement.id)}
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
              <td class="p-3">
                <button class="px-4 py-1 bg-base rounded-md">Select</button>
              </td> 
            </tr>
            {/each}  
          </tbody>
        </table>
      </div>
    {/each} <!-- end sub_categories loop -->
  {/each} <!-- end categories loop -->
</div>

{#if showModal}
  <RequirementDetailModal bind:isOpen={showModal} {markdownContent} on:close={handleModalClose} />
{/if}

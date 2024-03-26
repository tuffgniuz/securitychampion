<script lang="ts">
	import { marked } from 'marked';

	import { config } from '$lib/config';
  import type { Category } from '$lib/types/models';

	import RequirementDetailModal from './requirement-detail-modal.svelte';

  export let categories: Category[];
  export let activeFilter: { category: string | null; subCategory: string | null };
  export let searchText = '';

  let showModal = false;
  let markdownContent = '';

  $: filteredCategories = categories.filter(category => {
    let isCategoryMatch = !activeFilter.category || category.id === activeFilter.category;

    let subCategoriesFiltered = category.sub_categories?.map(subCategory => {
        const filteredRequirements = subCategory.requirements.filter(requirement => 
            requirement.description.toLowerCase().includes(searchText.toLowerCase()) || 
            requirement.requirement_id.toLowerCase().includes(searchText.toLowerCase()));
        return { ...subCategory, requirements: filteredRequirements };
    }).filter(subCategory => 
      !activeFilter.subCategory || subCategory.id === activeFilter.subCategory
    );

    return isCategoryMatch && subCategoriesFiltered?.length > 0;
  }).map(category => ({
      ...category,
      sub_categories: category.sub_categories.map(subCategory => {
          const filteredRequirements = subCategory.requirements.filter(requirement => 
              requirement.description.toLowerCase().includes(searchText.toLowerCase()) || 
              requirement.requirement_id.toLowerCase().match(searchText.toLowerCase()));
          return { ...subCategory, requirements: filteredRequirements };
      }).filter(subCategory => subCategory.requirements.length > 0)
  }));

  const selectSubCategory = (subCategoryId: string) => {
    if (activeFilter.subCategory === subCategoryId) {
      activeFilter.subCategory = null;
    } else {
      activeFilter.subCategory = subCategoryId;
    }
  };
     
  const handleModalOpen = async (requirementId: string) => {
    const response = await fetch(`${config.baseApiUrl}/api/v1/asvs/requirements/${requirementId}/markdown`)
    if (response.ok) {
      const data = await response.json();
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

{#if filteredCategories.length === 0 || !filteredCategories.some(category => category.sub_categories.some(subCategory => subCategory.requirements.length > 0))}
  <div class="text-center py-10">
    <p class="text-lg text-muted">No requirements match your search.</p>
  </div>
{:else}
<div class="mt-6"> 
  <div class="flex gap-2">
    <button class="bg-mantle py-1 px-4 rounded-md">Level 1</button>
    <button class="bg-mantle py-1 px-4 rounded-md">Level 2</button>
    <button class="bg-mantle py-1 px-4 rounded-md">Level 3</button>
  </div>
  {#each filteredCategories as category (category.id)}
    <h5 class="text-2xl my-5 text-afternoon font-semibold">{category.name}</h5>
    <p class="mb-5">{category.summary}</p>

    <div class="flex flex-wrap gap-4 my-5">
      {#each category.sub_categories as sub_category (sub_category.id)}
        <button 
          class="px-4 py-1 rounded-md {activeFilter.subCategory === sub_category.id ? 'bg-mauve text-base' : 'bg-mantle'}"
          on:click={() => selectSubCategory(sub_category.id)}
        >
          {sub_category.name}
        </button>
      {/each}
    </div>
    
    {#each category.sub_categories as sub_category (sub_category.id)}
      {#if !activeFilter.subCategory || activeFilter.subCategory === sub_category.id}
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
              <td class="p-3 align-top cursor-pointer" on:click={() => handleModalOpen(requirement.requirement_id)}>{requirement.description}</td>
              <td class="p-3">
                <div class="flex items-center gap-2">
                  {#if requirement.level1}<span class="rounded-lg bg-base border border-rosewater text-rosewater p-1 whitespace-nowrap text-sm">Level 1</span>{/if}
                  {#if requirement.level2}<span class="rounded-lg bg-base border border-sapphire text-sapphire p-1 whitespace-nowrap text-sm">Level 2</span>{/if}
                  {#if requirement.level3}<span class="rounded-lg bg-base border border-mauve text-maroon p-1 whitespace-nowrap text-sm">Level 3</span>{/if}
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
      {/if}
    {/each} <!-- end sub_categories loop -->
  {/each} <!-- end categories loop -->
</div>
{/if}

{#if showModal}
  <RequirementDetailModal bind:isOpen={showModal} {markdownContent} on:close={handleModalClose} />
{/if}

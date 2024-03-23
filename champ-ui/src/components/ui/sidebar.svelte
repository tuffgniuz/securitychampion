<script lang="ts">
  import { slide } from 'svelte/transition';
  import { LucideBookOpenText, LucideGithub } from 'lucide-svelte';

  import type { Category } from '$lib/types/models';
	import { createEventDispatcher } from 'svelte';

  export let categories: Category[];

  let activeCategoryId: string | null = null;
  const dispatch = createEventDispatcher();

  const toggleCategory = (categoryId: string) => {
    activeCategoryId = activeCategoryId === categoryId ? null : categoryId;
    dispatch('filterChange', { type: 'category', id: activeCategoryId });
  }

  const selectSubCategory = (subCategoryId: string) => {
    dispatch('filterChange', { type: 'sub_category', id: subCategoryId });
  }
</script>

<div class="mb-6">
  <form action="">
    <input type="text" placeholder="Quick search..." class="bg-midnightshadow py-1 px-2 rounded-md outline-none border-none w-full">
  </form>
</div>

<nav class="text-md">
  <ul class="mb-8">
    <li class="py-2">
      <a href="https://github.com/tuffgniuz/securitychampion" class="flex items-center gap-5">
        <span class="bg-maroon p-2 rounded-md">
          <LucideGithub size="16" color="#24273a" />
        </span>
        Documentation
      </a>
    </li>
    <li class="py2">
      <a href="https://github.com/OWASP/ASVS" class="flex items-center gap-5">
        <span class="bg-maroon p-2 rounded-md">
         <LucideBookOpenText size="16" color="#24273a" /> 
        </span>
        OWASP ASVS
      </a>
    </li>
  </ul>

  <h5 class="
        cursor-pointer 
        hover:bg-midnightshadow 
        p-1
        mb-2
        rounded-md 
        transition-all 
        duration-5000
        ease-in-out
        flex items-center 
        gap-2
    "
  >
    All
  </h5>
  {#each categories as category (category.id)}
    <h5 
      class="
        cursor-pointer 
        hover:bg-maroon 
        hover:text-base
        p-1
        mb-2
        rounded-md 
        transition-all 
        duration-5000
        ease-in-out
        flex items-center 
        gap-2
        {activeCategoryId === category.id ? 'bg-maroon text-base' : ''}
      "
      on:click={() => toggleCategory(category.id)}
    >
      {category.name}
    </h5>
    {#if activeCategoryId === category.id}
      <ul transition:slide="{{ duration: 500 }}" class="border-l border-midnightshadow pl-8 mb-5">
      {#each category.sub_categories as sub_category (sub_category.id)}
        <li class="my-4 cursor-pointer" on:click={() => selectSubCategory(sub_category.id)}>{sub_category.name}</li>
      {/each}
      </ul>
    {/if}
  {/each}
</nav>

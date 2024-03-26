<script lang="ts">
  import { 
    LucideBookOpenText,
    LucideFileText,
    LucideLayers,
    LucideLightbulb,
    LucideShield 
  } from 'lucide-svelte';

  import type { Category } from '$lib/types/models';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';

  export let categories: Category[] | null = null;

  let activeCategoryId: string | null = null;
  const dispatch = createEventDispatcher();

  $: currentPath = $page.url.pathname

  const toggleCategory = (categoryId: string) => {
    activeCategoryId = activeCategoryId === categoryId ? null : categoryId;
    dispatch('filterChange', { type: 'category', id: activeCategoryId });
  }
</script>

<nav class="text-md max-h-screen overflow-y-auto pr-2">
  <ul class="mb-8">
   <li class="py-1 cursor-pointer">
      <a href="/introduction" class="flex items-center gap-5">
        <span class="bg-mauve p-2 rounded-md">
          <LucideBookOpenText size="16" color="#24273a" />
        </span>
        Introduction
      </a>
    </li>

    <li class="py-1">
      <a href="https://github.com/tuffgniuz/securitychampion" class="flex items-center gap-5">
        <span class="bg-mauve p-2 rounded-md">
          <LucideFileText size="16" color="#24273a" />
        </span>
        Documentation
      </a>
    </li>
    <li class="py-1">
      <a href="https://github.com/OWASP/ASVS" class="flex items-center gap-5">
        <span class="bg-mauve p-2 rounded-md">
         <LucideShield size="16" color="#24273a" /> 
        </span>
        OWASP ASVS
      </a>
    </li>
    <li class="py-1">
      <a href="https://github.com/OWASP/ASVS" class="flex items-center gap-5">
        <span class="bg-mauve p-2 rounded-md">
         <LucideLightbulb size="16" color="#24273a" /> 
        </span>
        OWASP CheatSheet
      </a>
    </li>

  </ul>

  <h5 class="font-semibold text-afternoon mb-5">
    <a href="/library" class="flex items-center gap-5">
    <span class="bg-mauve p-2 rounded-md"><LucideLayers size="16" color="#24273a" /></span>
    Library
    </a>
  </h5>
  {#if currentPath === '/library'}
  {#each categories as category (category.id)}
    <h5 
      class="
        cursor-pointer 
        hover:bg-mantle 
        p-1
        mb-2
        rounded-md 
        transition-all 
        duration-5000
        ease-in-out
        flex items-center 
        gap-2
        {activeCategoryId === category.id ? 'bg-mantle' : ''}
      "
      on:click={() => toggleCategory(category.id)}
    >
      {category.name}
    </h5>
  {/each}
  {/if}
</nav>

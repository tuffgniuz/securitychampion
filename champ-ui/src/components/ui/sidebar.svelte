<script lang="ts">
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
</script>

<nav class="text-md max-h-screen overflow-y-auto pr-2">
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
</nav>

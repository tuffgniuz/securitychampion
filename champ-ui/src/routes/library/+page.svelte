<script lang="ts">
	import { LucideGrid, LucideTable2 } from "lucide-svelte";

  import Sidebar from "../../components/ui/sidebar.svelte";
	import RequirementsTable from "../../components/requirements-table.svelte";

  export let data;

  let activeFilter = { category: null, subCategory: null };
  let searchText = '';

  const handleSearchTextChange = (event) => {
    searchText = event.target.value;
  }

  const handleFilterChange = (event: CustomEvent) => {
    const { type, id } = event.detail;
    if (type === 'category') {
      activeFilter.category = id;
      activeFilter.subCategory = null;
    } else if (type === 'subCategory') {
      activeFilter.subCategory = id;
    }
  };

</script>

<div class="flex gap-10">
  <div class="w-2/12">
    <Sidebar 
      categories={data.categories} 
      on:filterChange={handleFilterChange} 
    />
  </div>
  <div class="w-11/12 p-2 max-h-screen overflow-y-auto pr-4">
      <div class="flex justify-between items-center w-full">
        <!-- view mode -->
        <div class="bg-midnightshadow px-2 py-1 rounded-md">
          <select class="bg-midnightshadow cursor-pointer">
            <option disabled>Issues</option> 
            {#each data.issues as issue (issue.id)}
              <option class="bg-midnightshadow" value={issue.name}>{issue.name}</option>
            {/each}
          </select>
        </div>
        <input 
          type="text"
          placeholder="Search requirement..." 
          class="bg-midnightshadow rounded-md px-2 py-1 outline-none border-none focus:outline-1 focus:outline-mauve"
          bind:value={searchText}
          on:input={handleSearchTextChange}
        >
        <div />
      </div>
      <RequirementsTable categories={data.categoriesJoinedRequirements} bind:activeFilter {searchText} />
   </div>
</div>

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

  /* const handleFilterChange = (event: CustomEvent) => { */
  /*   activeFilter = event.detail; */
  /* } */
  const handleFilterChange = (event: CustomEvent) => {
    const { type, id } = event.detail;
    if (type === 'category') {
      activeFilter.category = id;
      activeFilter.subCategory = null; // Reset sub-category filter when a new category is selected
    } else if (type === 'subCategory') {
      activeFilter.subCategory = id;
    }
  };
</script>

<div class="flex gap-10">
  <div class="w-2/12">
    <Sidebar categories={data.categories} on:filterChange={handleFilterChange}  />
  </div>
  <div class="w-11/12 p-2 max-h-screen overflow-y-auto pr-4">
    <div class="flex justify-between items-center">
      <!-- view mode -->
      <div class="flex items-center gap-2">
        <span class="cursor-pointer">
          <LucideTable2 size="18" />
        </span>
        <span class="cursor-pointer">
          <LucideGrid size="18" />
        </span>
      </div>
      <div class="flex items-center gap-4">
        <input 
          type="text"
          placeholder="Search requirement..." 
          class="bg-midnightshadow rounded-md p-1 outline-none border-none focus:outline-1 focus:outline-maroon"
          bind:value={searchText}
          on:input={handleSearchTextChange}
        >
        <select class="bg-midnightshadow px-2 py-1 rounded-md">
          <option>Levels</option>
        </select>
      </div>
    </div>
    <!-- requirements -->
    <RequirementsTable categories={data.categoriesJoinedRequirements} bind:activeFilter {searchText} />
  </div>
</div>

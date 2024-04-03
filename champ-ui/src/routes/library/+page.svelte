<script lang="ts">
	import type { Issue } from "$lib/types/models";

  import Sidebar from "../../components/ui/sidebar.svelte";
	import RequirementsTable from "../../components/requirements-table.svelte";
	import IssueCreateFloatButton from "../../components/issue-create-float-button.svelte";
	import IssueDropDown from "../../components/issue-drop-down.svelte";
	import SelectedIssueDetailModal from "../../components/selected-issue-detail-modal.svelte";

  export let data;

  let activeFilter = { category: null, subCategory: null };
  let searchText = '';
  let selectedIssue: Issue | null = null;

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
      <IssueDropDown 
        issues={data.issues} 
        bind:selectedIssue 
      />
      <input 
        type="text"
        placeholder="Search requirement..." 
        class="bg-transparent rounded-md px-2 py-1 outline outline-midnightshadow outline-1 border-none focus:outline-mauve transition-all duration-300 ease-in-out"
        bind:value={searchText}
        on:input={handleSearchTextChange}
      >
    </div>
    <RequirementsTable 
      categories={data.categoriesJoinedRequirements} 
      bind:activeFilter {searchText} 
      {selectedIssue}
    />
  </div>
</div>

{#if selectedIssue}
  <SelectedIssueDetailModal {selectedIssue} />
{/if}

{#if data.issues.length < 1}
  <IssueCreateFloatButton />
{/if}

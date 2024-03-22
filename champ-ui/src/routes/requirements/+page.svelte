<script lang="ts">
	import { LucideGrid, LucideTable2 } from "lucide-svelte";

  import Sidebar from "../../components/ui/sidebar.svelte";
	import RequirementsTable from "../../components/requirements-table.svelte";

  export let data;
</script>

<div class="flex gap-10">
  <div class="w-2/12">
    <Sidebar categories={data.categories} />
  </div>
  <div class="w-10/12 p-2">
    <!-- view mode -->
    <div class="flex items-center gap-2">
      <span class="cursor-pointer">
        <LucideTable2 size="18" />
      </span>
      <span class="cursor-pointer">
        <LucideGrid size="18" />
      </span>
    </div>
    <!-- requirements -->
    <RequirementsTable categories={data.requirements} />
  </div>
</div>

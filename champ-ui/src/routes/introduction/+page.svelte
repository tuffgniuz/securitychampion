<script lang="ts">
	import Sidebar from "../../components/ui/sidebar.svelte";

  export let data;

</script>

<div class="flex gap-10">
  <div class="w-2/12">
    <Sidebar />
  </div>
  <div class="w-11/12 max-h-screen overflow-y-auto pr-4">
    <div class="prose min-w-full">
    {@html data.content}
    </div>
  </div>
</div>

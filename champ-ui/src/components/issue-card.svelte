<script lang="ts">
  import type { Issue } from '$lib/types/models';

  export let issue: Issue;
</script>

<div class="bg-midnightshadow rounded-md p-5 w-2/12 cursor-pointer">
  <h1 class="text-lg font-semibold">{issue.name}</h1>
</div>

<script lang="ts">
  import '../app.css';
	import Navbar from "../components/ui/navbar.svelte";
</script>

<Navbar />

<div class="mx-auto md:w-9/12">
  <slot />
</div>

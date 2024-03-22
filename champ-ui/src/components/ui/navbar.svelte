<script lang="ts">
	import { LucideGithub } from "lucide-svelte";
</script>

<nav class="border-b border-midnightshadow mb-10">
  <div class="mx-auto py-4 w-9/12">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <img src="/icons/dummy-logo.svg" alt="logo" class="w-8">
        Security Champion
      </div>
      <div class="flex items-center gap-6">
        <ul class="flex gap-3">
          <li><a href="/requirements">Requirements</a></li>
          <li><a href="/issues">Issues</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/about">About</a></li>
        </ul>

        <span class="text-muted">|</span>

        <ul class="flex items-center gap-3">
          <li><a href="">Login</a></li>
          <li>
            <a href="https://github.com/tuffgniuz/securitychampion">
                <LucideGithub size="18" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

<script lang="ts">
  let dialog: HTMLDialogElement;

  const showModal = () => {
    dialog.showModal();
  }
</script>

<button 
  class="bg-maroon text-base px-4 py-1 rounded-md"
  on:click={showModal}
>
  Create Issue
</button>

<dialog bind:this={dialog} class="rounded-md w-1/3 bg-base p-4 shadow-lg">
  <form action="?/createIssue" method="post">
    <div class="flex flex-col">
      <input type="hidden" />

      <label class="font-semibold my-2">Title</label>
      <input type="text" name="title" placeholder="Title..." class="bg-midnightshadow rounded-md p-2"/>

      <label class="font-semibold my-2">Description <span class="text-muted">(optional)</span></label>
      <textarea name="description" placeholder="Issue description" class="bg-midnightshadow rounded-md p-2"></textarea>

      <div class="flex justify-end space-x-2 mt-4">
        <button type="submit" class="px-4 py-1 rounded-md">Submit</button>
      </div>
    </div>
  </form>
</dialog>

<script>
  export let request, helpers;
</script>

<div class="pagination">
  {#if request.hasPrevious }
    <a href="{helpers.permalinks.blog(request.previousPage)}" class="prev">&lsaquo;</a>
  {/if}
  Page {request.page} / {request.lastPage}
  {#if request.hasNext}
    <a href="{helpers.permalinks.blog(request.nextPage)}" class="next">&rsaquo;</a>
  {/if}
</div>

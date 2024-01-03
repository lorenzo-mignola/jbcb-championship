<script>
  import { page } from '$app/stores';
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
  const emoji = $page.status === 404 ? '🤷🏻‍♂️' : '😢';
  const header =
    $page.status === 404 ? 'Pagina non trovata' : "C'è stato un errore nell'applicazione";
</script>

<div class="flex items-center justify-center">
  <h1 class="h1 flex items-center gap-4">
    <span class="text-4xl md:text-8xl">{emoji}</span>
    {header}
    <span class="text-4xl md:text-8xl hidden md:block">{emoji}</span>
  </h1>
</div>

<div class="card my-10">
  <Accordion>
    <AccordionItem>
      <svelte:fragment slot="summary">Dettagli</svelte:fragment>
      <svelte:fragment slot="content">{$page.error?.message}</svelte:fragment>
    </AccordionItem>
  </Accordion>
</div>

<a href="/" class="btn variant-filled-secondary shadow-sm">🏠 Torna alla home</a>

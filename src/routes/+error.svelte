<script>
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

  import { page } from '$app/stores';

  const emoji = $page.status === 404 ? '🤷🏻‍♂️' : '😢';
  const header =
    $page.status === 404 ? 'Pagina non trovata' : "C'è stato un errore nell'applicazione";
  $: ({ error } = $page);
</script>

<div class="flex items-center justify-center">
  <h1 class="h1 flex items-center gap-4">
    <span class="text-4xl md:text-8xl">{emoji}</span>
    {header}
    <span class="hidden text-4xl md:block md:text-8xl">{emoji}</span>
  </h1>
</div>

<div class="card my-10">
  <Accordion>
    <AccordionItem>
      <svelte:fragment slot="summary">Dettagli</svelte:fragment>
      <svelte:fragment slot="content">{error?.message}</svelte:fragment>
    </AccordionItem>
  </Accordion>
</div>

<a class="variant-filled-secondary btn shadow-sm" href="/">🏠 Torna alla home</a>

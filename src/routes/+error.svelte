<script>
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

  import { page } from '$app/stores';

  const emoji = $page.status === 404 ? '🤷🏻‍♂️' : '😢';
  const header =
    $page.status === 404 ? 'Pagina non trovata' : "C'è stato un errore nell'applicazione";
  let { error } = $derived($page);
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
      {#snippet summary()}
        Dettagli
      {/snippet}
      {#snippet content()}
        {error?.message}
      {/snippet}
    </AccordionItem>
  </Accordion>
</div>

<a class="variant-filled-secondary btn shadow-sm" href="/">🏠 Torna alla home</a>

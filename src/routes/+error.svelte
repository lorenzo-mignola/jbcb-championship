<script>
  import { Accordion } from '@skeletonlabs/skeleton-svelte';
  import { page } from '$app/state';

  const emoji = page.status === 404 ? '🤷🏻‍♂️' : '😢';
  const header
    = page.status === 404 ? 'Pagina non trovata' : 'C\'è stato un errore nell\'applicazione';

  const error = $derived(page.error);
</script>

<div class='flex items-center justify-center'>
  <h1 class='h1 flex items-center'>
    <span class='text-2xl md:text-5xl'>{emoji} </span>
    {header}
    <span class='hidden text-2xl md:text-5xl md:block'> {emoji}</span>
  </h1>
</div>

<div class='card m-8 ml-0 mr-0'>
  <Accordion>
    <Accordion.Item value='error-details'>
      <Accordion.ItemTrigger class='border'>Dettagli</Accordion.ItemTrigger>
      <Accordion.ItemContent>{error?.message}</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion>
</div>

<a class='preset-filled-secondary-500 btn shadow-sm' href='/'>🏠 Torna alla home</a>

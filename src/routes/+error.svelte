<script>
  import { Accordion } from '@skeletonlabs/skeleton-svelte';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';

  const queryMessage = $derived(page.url.searchParams.get('message'));
  const queryTitle = $derived(page.url.searchParams.get('title'));

  const custom = $derived(Boolean(queryTitle || queryMessage));

  const emoji = $derived(page.status === 404
    ? '🤷‍♂️'
    : '😢');

  const header = $derived(page.status === 404
    ? 'Pagina non trovata'
    : 'C\'è stato un errore nell\'applicazione');

  const displayMessage = $derived(page.error?.message || 'Si è verificato un errore sconosciuto');
</script>

<div class='flex items-center justify-center'>
  <h1 class='flex items-center text-center h1'>
    <span class='
      mr-4 text-2xl
      md:text-5xl
    '>
      {custom ? '⚠️' : emoji}
    </span>
    {queryTitle ?? header}
    <span class='
      ml-4 hidden text-2xl
      md:block md:text-5xl
    '>
      {custom ? '⚠️' : emoji}
    </span>
  </h1>
</div>

<div class='m-8 mx-0 card'>
  <Accordion>
    <Accordion.Item value='error-details'>
      <Accordion.ItemTrigger class='
        bg-gray-100
        hover:bg-gray-200
        dark:bg-gray-800
        dark:hover:bg-gray-700 dark:hover:text-white
      '>Dettagli</Accordion.ItemTrigger>
      <Accordion.ItemContent>{queryMessage ?? displayMessage}</Accordion.ItemContent>
    </Accordion.Item>
  </Accordion>
</div>

<a class='btn preset-filled-secondary-500 shadow-sm' href={resolve('/')}>🏠 Torna alla home</a>

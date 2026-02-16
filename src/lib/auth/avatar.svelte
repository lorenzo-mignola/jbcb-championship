<script lang='ts'>
  import { Avatar, Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
  import { invalidateAll } from '$app/navigation';

  import { signOut, useSession } from '$lib/auth/auth-client';

  const session = useSession();

</script>

{#if $session.data?.user}
  <Dialog>
    <Dialog.Trigger>
      <Avatar class='size-7'>
        <Avatar.Image
          title={$session.data.user.name}
          src={`https://api.dicebear.com/9.x/shapes/svg?seed=${$session.data.user.email}`}
          alt='small'
        />
        <Avatar.Fallback>{$session.data.user.name.substring(0, 1)}</Avatar.Fallback>
      </Avatar>
    </Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop class='fixed inset-0 z-50 bg-surface-50-950/70' />
      <Dialog.Positioner class='
        fixed inset-0 z-50 flex items-center justify-center p-4
      '>
        <Dialog.Content class='
          w-full max-w-xl space-y-4 card bg-surface-100-900 p-4 shadow-xl
        '>
          <header class='flex items-center justify-between'>
            <Dialog.Title class='text-lg font-bold'>Ciao, {$session.data.user.name}</Dialog.Title>
          </header>
          <Dialog.Description>
            Attualmente sei autenticato con l'email <strong>{$session.data.user.email}</strong>.
          </Dialog.Description>
          <footer class='flex justify-end gap-2'>
            <button type='button' class='btn preset-tonal' onclick={async () => {
              await signOut();
              await invalidateAll();
            }}>Logout</button>
            <Dialog.CloseTrigger class='btn preset-filled'>Chiudi</Dialog.CloseTrigger>
          </footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog>
{/if}

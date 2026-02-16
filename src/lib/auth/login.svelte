<script lang='ts'>
  import GoogleIcon from '../icons/google-icon.svelte';
  import { signInWithGoogle } from './sign-in';
</script>

<div>
  <button
    class='btn preset-filled-surface-950-50'
    on:click={() => signInWithGoogle()}
  >
    Usa account Google
    <GoogleIcon class='ml-2' />
  </button>
</div>

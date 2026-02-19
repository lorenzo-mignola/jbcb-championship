<script lang='ts'>
  import Login from '$lib/auth/login.svelte';
</script>

<div
  class='
    local-hero flex w-full flex-col items-center gap-8 card
    preset-filled-surface-100-900 p-10 text-white shadow-lg
    md:py-16
  '
>
  <h1 class='text-center text-3xl font-bold'>Login</h1>
  <Login />
</div>

<style>
  .local-hero {
    background-color: #7f2f3b;
    background-image: url('$lib/icons/hero.svg');
  }
</style>

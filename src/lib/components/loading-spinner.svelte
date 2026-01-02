<span class='flex items-center justify-center'>
  <span class='loader'></span>
</span>

<style>
/* @import 'tailwindcss';
@import '@skeletonlabs/skeleton'; */

    /* @apply h-7 w-7 border-4 border-surface-400 border-b-secondary-800 dark:border-white dark:border-b-secondary-400; */

  .loader {
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

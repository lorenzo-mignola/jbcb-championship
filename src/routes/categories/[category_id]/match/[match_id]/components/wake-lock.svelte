<script lang='ts'>
  import { browser } from '$app/environment';
  import { onDestroy, onMount } from 'svelte';

  let sentinel: WakeLockSentinel | null = null;

  export async function requestWakeLock() {
    if (!('wakeLock' in navigator)) {
      console.warn('wakeLock not in navigator');
      return;
    }

    try {
      sentinel = await navigator.wakeLock.request();
      // eslint-disable-next-line no-console -- debug log
      sentinel.addEventListener('release', () => console.debug('wakeLock released'));
      // eslint-disable-next-line no-console -- debug log
      console.debug('wakeLock acquired');
    } catch (error) {
      console.error('error requestWakeLock', error);
    }
  }

  async function release() {
    if (sentinel) {
      await sentinel.release();
      sentinel = null;
    }
  }

  async function onVisibilityChange() {
    if (sentinel !== null && document.visibilityState === 'visible') {
      await requestWakeLock();
    }
  }

  onMount(async () => {
    await requestWakeLock();
    if (browser) {
      document.addEventListener('visibilitychange', onVisibilityChange);
    }
  });

  onDestroy(() => {
    release();
    if (browser) {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    }
  });
</script>

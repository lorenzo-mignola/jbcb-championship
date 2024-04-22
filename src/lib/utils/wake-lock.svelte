<script lang="ts" strictEvents>
  import { onDestroy, onMount } from 'svelte';

  import { browser } from '$app/environment';

  let sentinel: WakeLockSentinel | null = null;

  export async function requestWakeLock() {
    if (!('wakeLock' in navigator)) {
      // eslint-disable-next-line no-console -- console warn
      console.warn('wakeLock not in navigator');
      return;
    }

    try {
      sentinel = await navigator.wakeLock.request();
      // eslint-disable-next-line no-console -- console info
      sentinel.addEventListener('release', () => console.log('wakeLock released'));
      // eslint-disable-next-line no-console -- console info
      console.log('wakeLock acquired');
    } catch (error) {
      // eslint-disable-next-line no-console -- console error
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

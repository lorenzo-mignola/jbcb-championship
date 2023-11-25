<script>
  import { getMin, getSec, timer } from './timer';

  $: min = getMin($timer);
  $: sec = getSec($timer);
</script>

<div class="text-timer w-full text-center p-4 text-5xl my-5 font-bold">
  {String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}
</div>

<style>
</style>

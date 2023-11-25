<script>
  import { timer } from './timer';

  $: min = Math.floor($timer / 60);
  $: sec = $timer - min * 60;
</script>

<div class="text-timer w-full text-center p-4 text-5xl my-5 font-bold">
  {String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}
</div>

<style>
</style>

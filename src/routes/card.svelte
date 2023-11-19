<script lang="ts">
  export let link: string;
  export let text: string;
</script>

<a class="block card card-hover p-4 bg-surface-200-700-token text-lg" href={link}>{text}</a>

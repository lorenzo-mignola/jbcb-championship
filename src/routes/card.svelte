<script lang="ts" strictEvents>
  export let link: string;
  export let text: string;
</script>

<a
  class="card card-hover bg-primary-500 dark:bg-primary-600 text-white text-xl p-8 block md:flex md:items-center md:justify-center hover:shadow-sm hover:shadow-primary-500"
  href={link}>{text}</a
>

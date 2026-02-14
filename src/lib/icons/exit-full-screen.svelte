<script lang='ts'>
  interface Props {
    [key: string]: any;
  }

  const { ...props }: Props = $props();
</script>

<svg height='1em' viewBox='0 0 20 20' width='1em' xmlns='http://www.w3.org/2000/svg' {...props}
><path
  d='M7 7V1H5v4H1v2zM5 19h2v-6H1v2h4zm10-4h4v-2h-6v6h2zm0-8h4V5h-4V1h-2v6z'
  fill='currentColor'
/></svg
>

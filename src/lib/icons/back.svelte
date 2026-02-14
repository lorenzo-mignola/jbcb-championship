<script lang='ts'>
  interface Props {
    [key: string]: any;
  }

  const { ...props }: Props = $props();
</script>

<svg height='1em' viewBox='0 0 20 20' width='1em' xmlns='http://www.w3.org/2000/svg' {...props}
><path d='m2 10l8 8l1.4-1.4L5.8 11H18V9H5.8l5.6-5.6L10 2z' fill='currentColor' /></svg
>

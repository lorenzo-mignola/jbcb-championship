<script lang='ts'>
  interface Props {
    [key: string]: any;
  }

  const { ...props }: Props = $props();
</script>

<svg
  height='1em'
  viewBox='0 0 20 20'
  width='1em'
  xmlns='http://www.w3.org/2000/svg'
  {...props}
>
  <path d='M4 9h12v2H4z' fill='currentColor' />
</svg>

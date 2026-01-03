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
  <path
    d='M7 14.2L2.8 10l-1.4 1.4L7 17L19 5l-1.4-1.4z'
    fill='currentColor' />
</svg>

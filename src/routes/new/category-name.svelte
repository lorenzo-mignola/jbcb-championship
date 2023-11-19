<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { CATEGORY_NAME } from '../../lib/utils/constants';

	const categoryName = $page.url.searchParams.get(CATEGORY_NAME) ?? '';

	let name = categoryName;

	function handleSetCategoryName() {
		$page.url.searchParams.set(CATEGORY_NAME, name);
		goto(`?${$page.url.searchParams.toString()}`);
	}
</script>

<label class="label">
	<span>Nome categoria</span>
	<input
		class="input"
		title="Nome categoria"
		type="text"
		placeholder="Categoria"
		on:focusout={handleSetCategoryName}
		bind:value={name}
	/>
</label>

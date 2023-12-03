<template>
	<div class="text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-gray-900">
        <NuxtIsland name="GNoScript" />
        ページが見つかりませんでした
		<pre>{{ error }}</pre>
	</div>
</template>

<script setup lang="ts">
const error = useError();
</script>
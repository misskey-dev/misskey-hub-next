<template>
	<div ref="tableContainer" class="w-full overflow-x-auto !overflow-y-hidden whitespace-nowrap mb-4">
		<table class="!max-w-none !mb-0 !overflow-visible">
			<slot />
		</table>
	</div>
</template>

<script setup lang="ts">
import 'scroll-hint/css/scroll-hint.css';
import { GNodeList } from '@/assets/js/misc/g-node-list.js';
import ScrollHint from 'scroll-hint';

const { t } = useI18n();

const tableContainer = useTemplateRef('tableContainer');

onMounted(() => {
	if (!import.meta.client || !tableContainer.value) return;

	new ScrollHint(new GNodeList([tableContainer.value]), {
		i18n: {
			scrollable: t('scrollable'),
		},
	});
});
</script>

<style lang="css">
.scroll-hint-icon {
	height: 85px;
}
</style>

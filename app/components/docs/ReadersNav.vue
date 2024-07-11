<template>
	<section>
		<h2 class="text-2xl lg:text-3xl font-title font-bold mb-4">
			{{ $t(`_docs._${sectionId}.title`) }}
		</h2>
		<MkIndex :wide="true" :base-path="basePath" />
	</section>
</template>

<script setup lang="ts">
const props = defineProps<{
	sectionId: "forUsers" | "forAdmin" | "forDevelopers";
}>();

const { locale } = useI18n();

const convertToKebabCase = (str: string): string => {
	if (typeof str !== "string") return str;

	str = str.replace(/^ *?[A-Z]/, function (allStr) {
		return allStr.toLowerCase();
	});
	str = str.replace(/_/g, "-");
	str = str.replace(/ *?[A-Z]/g, function (allStr, i) {
		return "-" + allStr.replace(/\s/g, "").toLowerCase();
	});
	return str;
};

const basePath = `/${locale.value === 'ja-ks' ? 'ja' : locale.value}/docs/${convertToKebabCase(props.sectionId)}/`;
</script>

<style scoped></style>

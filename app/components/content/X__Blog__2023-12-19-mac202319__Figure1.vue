<template>
	<div class="bg-slate-100 dark:bg-slate-900 rounded-lg">
		<div class="bg-slate-200 dark:bg-slate-800 gap-4 grid grid-auto-rows-max p-4 rounded-lg">
			<div class="gap-4 grid grid-cols-2">
				<div class="bg-accent-300 dark:bg-accent-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">Child Components</div>
				<div class="bg-indigo-300 dark:bg-indigo-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">Chart.js, etc.</div>
			</div>
			<div class="gap-4 grid grid-cols-1">
				<div class="bg-accent-300 dark:bg-accent-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">Page Components</div>
			</div>
			<div class="gap-4 grid grid-cols-1">
				<div class="bg-accent-300 dark:bg-accent-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">Router</div>
			</div>
			<div class="gap-4 grid grid-cols-3">
				<div class="bg-accent-300 dark:bg-accent-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">OS</div>
				<div class="bg-accent-300 dark:bg-accent-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">Global Components</div>
				<div class="bg-accent-300 dark:bg-accent-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">UI Components</div>
			</div>
			<div class="gap-4 grid grid-cols-2">
				<div class="bg-accent-300 dark:bg-accent-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">BOOT</div>
				<div class="bg-indigo-300 dark:bg-indigo-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">Vue.js</div>
			</div>
			<div class="flex gap-4 items-center">
				<div class="border-t border-slate-300 dark:border-slate-700 flex-grow"></div>
				<div class="text-center text-slate-500 dark:text-slate-400 uppercase"><ArrowUpIco class="mr-3" />frontend</div>
				<div class="border-t border-slate-300 dark:border-slate-700 flex-grow"></div>
				<div class="text-center text-slate-500 dark:text-slate-400 uppercase">backend<ArrowDownIco class="ml-3" /></div>
				<div class="border-t border-slate-300 dark:border-slate-700 flex-grow"></div>
			</div>
			<div class="gap-4 grid grid-cols-3">
				<div class="bg-indigo-300 dark:bg-indigo-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">Fastify</div>
				<div class="bg-indigo-300 dark:bg-indigo-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">Pug</div>
				<div class="bg-accent-300 dark:bg-accent-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">BOOT LOADER</div>
			</div>
			<div class="gap-4 grid grid-cols-1">
				<div class="bg-indigo-300 dark:bg-indigo-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">NestJS</div>
			</div>
			<div class="gap-4 grid grid-cols-1">
				<div class="bg-indigo-300 dark:bg-indigo-700 grid p-4 place-items-center rounded-lg text-black dark:text-white">Node.js</div>
			</div>
		</div>
		<div class="p-4 flex flex-wrap gap-4">
			<div class="bg-slate-200 dark:bg-slate-800 flex gap-2 p-2 place-items-center rounded-lg">
				<div class="bg-accent-300 dark:bg-accent-700 h-4 w-4 rounded-full"></div>
				<div class="text-slate-600 dark:text-slate-400 text-xs">1st Party</div>
			</div>
			<div class="bg-slate-200 dark:bg-slate-800 flex gap-2 p-2 place-items-center rounded-lg">
				<div class="bg-indigo-300 dark:bg-indigo-700 h-4 w-4 rounded-full"></div>
				<div class="text-slate-600 dark:text-slate-400 text-xs">3rd Party</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import ArrowDownIco from 'bi/arrow-down.svg';
import ArrowUpIco from 'bi/arrow-up.svg';
</script>

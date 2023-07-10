<template>
    <div>
        <GHero>
            <template #title>{{ $t('_blog.title') }}</template>
            <template #description>
                {{ $t('_blog.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-72">
                        <img class="drop-shadow-xl" src="/img/emojis/open_mailbox_with_raised_flag_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
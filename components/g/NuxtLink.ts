// 末尾スラッシュの統一のためにラッパーNuxtLinkを実装

export default defineNuxtLink({
    componentName: "NuxtLink",
    trailingSlash: 'append',
});
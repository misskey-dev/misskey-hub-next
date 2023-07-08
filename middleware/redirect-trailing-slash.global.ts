export default defineNuxtRouteMiddleware((to, from) => {
	if (process.client && to.path !== '/' && !to.path.endsWith('/') && !to.path.includes(".")) {
		const { path, query, hash } = to
		const nextPath = path + '/' || '/'
		const nextRoute = { path: nextPath, query, hash }
		return navigateTo(nextRoute, { redirectCode: 301 })
	}
})
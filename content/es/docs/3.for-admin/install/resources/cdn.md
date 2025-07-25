# Configuración CDN

Recomendamos encarecidamente el uso de un CDN como [Cloudflare](https://www.cloudflare.com/) al publicar tu servidor Misskey.

El uso de una CDN ofrece las siguientes ventajas

- Reducir la carga del servidor almacenando en caché el contenido estático
- Menor exposición de la dirección IP del servidor, lo que puede mitigar ataques DoS, etc.

## Caché

El Cliente Misskey es completamente estático y no requiere un servidor para funcionar.Por lo tanto, todo el Cliente Misskey puede ser almacenado en caché por la CDN con la excepción de la API Misskey que no puede ser almacenada en caché.

Por favor configura tu CDN de la siguiente manera:

- Cachea todas las peticiones excepto `/api/*`

:::tip

No es necesario purgar la caché al actualizar Misskey.

:::

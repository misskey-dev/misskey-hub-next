# Incrustar en un Sitio Web

Puedes incrustar notas y líneas de tiempo de un servidor Misskey dentro de tu página web.
Con Misskey, el diseño de los widgets es altamente personalizable así que puedes adaptarlos para tu página web.

A continuación describimos los contenidos que pueden incrustarse y cómo hacerlo.

:::warning

Esta característica está disponible en Misskey v2024.9.0 o posterior.

:::

:::tip

MFM y emojis personalizados también están soportados, pero dependiendo de cómo se muestren en la página incrustada, la distribución puede no ser la esperada.

:::

## Generar código de inserción con el generador integrado

Todos los códigos de inserción y su personalización mostrados en esta página pueden ser fácilmente realizados usando el generador integrado de código en la web de Misskey.
Si no tienes una razón concreta para obtener el código manualmente, recomendamos usar el generador.

![Generador de código incrustado](/img/docs/for-users/features/embed/generator.png)

## Incrustar una sola nota

::MiWebEmbed{src="https://0key.dev/embed/notes/9tht7ungi81f0005"}
::

Una sola nota local puede ser incrustada (las notas en un servidor remoto no pueden ser incrustadas usando otro servidor).Tu código debería verse así:

```html
<iframe
    src="https://<HOST>/embed/notes/<NOTE_ID>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

Los marcadores de posición se reemplazan por lo siguiente:

- `<HOST>`: Nombre de dominio del servidor Misskey
- `<NOTE_ID>`: Id de la nota a incrustar
- `<RANDOM>`: Cadena de texto aleatoria (Requerido si se usa embed.js.Si hay varios códigos de incrustación en la misma página, asegúrese de que no estén duplicados

## Incrustar una lista de notas de un usuario

::MiWebEmbed{src="https://0key.dev/embed/user-timeline/9tht7g9ki81f0002?maxHeight=500"}
::

Puedes incrustar una lista de notas públicas de un usuario (Con visibilidad pública o Inicio).Tu código debería verse así:

```html
<iframe
    src="https://<HOST>/embed/user-timeline/<USER_ID>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

Los marcadores de posición se reemplazan por lo siguiente:

- `<HOST>`: Nombre de dominio del servidor Misskey
- `<USER_ID>`: Id del usuario a incrustar (no el nombre de usuario que empieza por `@`)
- `<RANDOM>`: Cadena de texto aleatoria (Requerido si se usa embed.js.Si hay varios códigos de incrustación en la misma página, asegúrese de que no estén duplicados)

## Incrustar una lista de notas de un usuario en un clip

::MiWebEmbed{src="https://0key.dev/embed/clips/9y5mpno6871g00gv?maxHeight=500"}
::

Puedes incrustar una lista de notas de clips cuya visibilidad sea pública.Tu código debería verse así:

```html
<iframe
    src="https://<HOST>/embed/clips/<CLIP_ID>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

Los marcadores de posición se reemplazan por lo siguiente:

- `<HOST>`: Nombre de dominio del servidor Misskey
- `<NOTE_ID>`: Id de la nota a incrustar
- `<RANDOM>`: Cadena de texto aleatoria (Requerido si se usa embed.js.Si hay varios códigos de incrustación en la misma página, asegúrese de que no estén duplicados)

## Incrustar una lista de notas con un hashtag

::MiWebEmbed{src="https://0key.dev/embed/tags/misskey?maxHeight=500"}
::

Puedes incrustar una lista de notas con un hashtag específico.Tu código debería verse así:

```html
<iframe
    src="https://<HOST>/embed/tags/<TAG>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

Los marcadores de posición se reemplazan por lo siguiente:

- `<HOST>`: Nombre de dominio del servidor Misskey
- `<TAG>`: Nombre del Hashtag (sin `#`)
- `<RANDOM>`: Cadena de texto aleatoria (Requerido si se usa embed.js.Si hay varios códigos de incrustación en la misma página, asegúrese de que no estén duplicados)

## Parámetros de personalización

Puede personalizar la apariencia del widget de incrustación especificando un valor concreto para el parámetro URL.

<table>
	<tbody><tr>
		<th>Parámetros</th>
		<th>Valores Posibles</th>
		<th>Descripción</th>
	</tr>
    <tr>
		<td><code>maxHeight</code></td>
		<td>Número superior a 0</td>
		<td>
            Especifica la altura máxima del widget en píxeles.Si el contenido es más largo que eso verticalmente, se puede desplazar dentro del widget.<br>
            Si <code>0</code> la altura del elemento incrustado se ampliará automáticamente para coincidir con la altura interna <b>(obsoleto)</b>.<br>
            Si no se especifica, se establecerá a<code>700</code>.<br>
             Este parámetro no funcionará para la incrustación de una sola nota.        
</td>
	</tr>
	<tr>
		<td><code>colorMode</code></td>
		<td>
            <ul>
                <li><code>light</code></li>
                <li><code>dark</code></li>
            </ul>
        </td>
		<td>Fuerza el modo de color de claro a oscuro.<br>Si no se especifica, se sincronizará con el ajuste de modo oscuro del dispositivo.</td>
	</tr>
	<tr>
		<td><code>border</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>Especifica si se adjunta o no un borde al marco exterior.<code>true</code> si no se especifica</td>
	</tr>
	<tr>
		<td><code>rounded</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>Especifica si las esquinas deben redondearse o no.<code>true</code> si no se especifica</td>
	</tr>
	<tr>
		<td><code>showHeader</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>
            Especifica si debe mostrarse la cabecera superior.<code>true</code> si no se especifica.<br>
            Este parámetro no funciona si se incrusta solo una sola nota.    
        </td>
	</tr>
</tbody></table>

:::g-details{summary="maxHeight=0 ¿Cómo se usa?

Establecer  `maxHeight` a  `0` no se recomienda, pero puede ser útil para casos especiales tales como cuando quieres  proporcionar un contenedor de desplazamiento en el sitio de incrustación en lugar de dentro de un iframe.Aquí está un ejemplo:

```html
<div class="misskey-embed">
    <div class="custom-header">
        Misskeyやってます！
    </div>
    <div class="iframe-container">
        <iframe
            src="https://<HOST>/embed/user-timeline/<USER_ID>?maxHeight=0&showHeader=false&border=false&rounded=false"
            data-misskey-embed-id="v1_<RANDOM>"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
        ></iframe>
    </div>
</div>

<style>
    .misskey-embed {
        border: 1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
    }

    .custom-header {
        background-color: #f0f0f0;
        padding: 10px;
    }

    .iframe-container {
        max-height: 500px;
        overflow-y: auto;
    }
</style>
```

:::

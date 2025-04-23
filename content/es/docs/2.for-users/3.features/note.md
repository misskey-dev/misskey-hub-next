# Notas

Las notas son el contenido principal de Misskey. Pueden consistir en imágenes, textos, encuestas y más.En otras plataformas, las notas se conocen como posts.

:::tip

El nombre «nota» proviene del tipo de objeto ActivityPub `Note`, que en este contexto «Representa un breve trabajo escrito típicamente de menos de un párrafo de longitud».

:::

Una vez creada una nota, se añadirá a tu [Línea del Tiempo](./timeline) y será visible para tus [seguidores](./follow) y otros usuarios de tu instancia.

Puedes [reaccionar](./reaction),contestar o citar notas.

Puedes encontrar una nota más tarde añadiéndola a tus [Favoritos](./favorite).

## Redactar una nota

Para redactar una nota, haz clic en el botón Nota (representado por el icono de un lápiz) para abrir el formulario de redacción.Introduce el contenido y haz clic en el botón Nota (con el icono de un avión de papel) para enviar la nota. Las notas pueden contener texto, imágenes, vídeos y [encuestas](./poll).Puedes formatear tu nota usando [Markup language For Misskey (MFM)](./mfm), [mencionar](./mention) otros usuarios, o incluir [hashtags](./hashtag). También puedes añadir advertencias de contenido (CW) y cambiar la visibilidad de la nota (más sobre esto debajo).

:::tip

En Misskey Web, puedes pegar imágenes directamente desde el portapapeles al cuadro de texto utilizando los atajos habituales de copiar y pegar.

:::

:::tip

También puedes presionar <kbd class="key">Ctrl + Enter</kbd> dentro del cuadro de texto para publicar la nota.

:::

## Renota

El acto de citar una nota existente, compartir una nota existente o la nota creada como resultado de estos actos se denominan Renota (o "renotar" como verbo).
La mayoría de las veces se utiliza cuando quieres compartir una nota que te gusta con tus propios seguidores, o cuando quieres volver a compartir una nota que publicaste en el pasado.
Aunque es posible renotar la misma nota varias veces, ten en cuenta que hacerlo puede resultar molesto para los demás.

:::warning

Si has configurado la visibilidad de tu nota como Solo seguidores o Nota Directa, no será posible renotarla.

:::

Para eliminar una renota en la web de Misskey, presiona "..." junto a la hora de la renota y selecciona "Quitar Renota".

## CW Advertencia de Contenido

Abreviatura de "Advertencia de contenido", en inglés Content Warning, que hace que el contenido de una nota quede oculto a menos que el usuario que la ve solicite explícitamente que se muestre.Se utiliza principalmente para ocultar el contenido de notas largas o para evitar publicar spoilers públicamente.
Para activar el Cw de una nota, pulsa el botón «Esconder contenidos» (icono del ojo) en el formulario de publicación.Al hacerlo, aparecerá una nueva área de introducción de texto, donde podrás escribir un resumen del contenido oculto por el CW.

## Visibilidad

Para cada nota, puedes establecer el rango dentro del cual la nota se hará pública.
Para establecer la visibilidad en Misskey Web, haga clic en el icono situado a la izquierda del botón "Nota" del formulario de composición.
Existen los siguientes tipos de visibilidad:

### Público

Tu nota será visible para todos los usuarios y aparecerá en todas las líneas de tiempo (inicio, local, social, global).

:::warning

Si tu cuenta está [silenciada](./silence), no puedes establecer la visibilidad de tu nota como pública.

:::

### Inicio

Tu nota será visible para todos los usuarios, pero no aparecerá en la cronología local, social o global para los no seguidores.

### Seguidores

Tu nota solo será visible para quienes te sigan.La nota aparecerá en todas las líneas de tiempo de tus seguidores.

### Nota Directa

Tu nota solo será visible para los usuarios especificados individualmente.La nota aparecerá en todas las líneas de tiempo de los usuarios especificados.

### No Federado

Si activas esta opción, tu nota no se federará a instancias remotas.

### Comparación de visibilidad

<table>
	<tbody><tr><th></th><th>Público</th><th>Inicio</th><th>Seguidores</th><th>Nota Directa</th></tr>
	<tr><th>LTL/STL/GTL de Seguidores</th><td>✔</td><td>✔</td><td>✔</td><td></td></tr>
	<tr><th>LTL/STL/GTL de Otros</th><td>✔</td><td></td><td></td><td></td></tr>
</tbody></table>

## Fijar al perfil

Al fijar una nota a tu perfil, ésta se mostrará constantemente en tu página de perfil.
Para fijar una nota, abre el menú de notas y pulsa "Fijar al perfil".

:::tip

Puedes fijar múltiples notas en tu perfil.

:::

## Notificación sobre una nueva nota de usuario

Se puede enviar una notificación cuando un usuario publique una nueva nota.Ve a la página del usuario del que deseas recibir notificaciones, selecciona el botón Detalles situado junto al botón Seguir y, a continuación, haz clic en "Notificar nuevas notas" para activarlo.

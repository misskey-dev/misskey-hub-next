# Administrar emojis personalizados

:::warning

Esta documentación está actualmente en fase de confirmación.Es posible que parte de la información no esté actualizada, por lo que le rogamos tenga cuidado al consultarla.

:::

Los administradores o moderadores pueden gestionar los emoji personalizados accediendo a la configuración de la instancia y, a continuación, al submenú de emoji personalizados.
Por defecto verás una lista de los emoji instalados localmente. Al principio esta lista estará vacía, pero puedes añadir emoji personalizados de diferentes maneras.

## Copiar Emoji de otra Instancia

Los emoji pueden copiarse fácilmente de otra instancia.

Para ello, cambia a la pestaña "remoto" en la configuración de emoji personalizados.Puedes buscar emoji por su nombre y/o por el host del que proceden.

Cuando hayas encontrado el emoji que deseas, haz clic en él para abrir un pequeño menú que te permitirá importarlo.

Ten en cuenta que los emoji pueden estar sujetos a derechos de autor y eres responsable de comprobar si puedes utilizar legalmente otro emoji.

## Importar Emoji Individualmente

Si tienes un archivo de imagen que te gustaría convertir en un emoji personalizado, puedes importar la imagen como emoji.

:::danger

Cuando importas el emoji desde tu Drive el archivo permanecerá dentro de tu Drive. Misskey no hace una copia de este archivo por lo que si lo borras, el emoji se romperá.

:::

El emoji se añadirá a la instancia y luego podrás editarlo o eliminarlo como de costumbre.

## Importación Masiva

Los emojis se pueden importar a granel como archivos ZIP empaquetados con un formato especial. Esta capacidad se puede encontrar en el menú de tres puntos en la esquina superior derecha del menú personalizado emoji.

:::warning

La importación masiva de emoji puede sobrescribir los emoji existentes o estropear tu instancia. Asegúrate de importar solo emoji de fuentes fiables, idealmente solo los que hayas exportado tú mismo.

:::

### Formato Emoji Empaquetado

En el nivel superior hay un archivo llamado "meta.json" que contiene información sobre los emojis contenidos en el archivo empaquetado.

Una definición de tipo para este fichero tendría este aspecto, donde `Meta` es la estructura de todo el fichero.

```typescript
class Meta {
	metaVersion: number;
	host: string;
	/**
	 * ECMAScript の `Date.prototype.toString` によって返される日時の表現。
	 */
	exportedAt: string;
	emojis: Emoji[];
}

class Emoji {
	downloaded: boolean;
	fileName: string;
	emoji: {
		id: string;
		updatedAt: string;
		name: string;
		host: null;
		category: string;
		originalUrl: string;
		publicUrl: string;
		uri: null;
		type: string;
		aliases: string[];
	};
}
```

Actualmente, los campos de `Meta` no se utilizan ni se comprueban al importar emoji, excepto el campo `emojis`.

Para cada 'Emoji':

- `downloaded`: debe ser siempre true.Si el campo falta o no es true, el emoji no se importará.
- `fileName`: nombre del archivo de imagen dentro del archivo empaquetado.
- `emoji`: datos asociados al emoji tal y como estaban almacenados en la base de datos.Actualmente se utilizan los siguientes:
  - `name`: nombre del emoji para el usuario,, ej. `blobfox` si un usuario debe escribir `:blobfox:` para obtener el emoji.\
    Si existe un emoji anterior con el mismo nombre, **se sobrescribirá!**
  - `category`: categoría del emoji
  - `aliases`: lista de cadena de caracteres que deben añadirse como alias.La interfaz de administración las denomina "etiquetas (en inglés: tags)".

## Editando y Borrando Emojis

Las propiedades de un emoji se pueden editar haciendo clic en él en la lista de emojis locales.
Cuando hagas clic en un emoji personalizado, se abrirá un cuadro de diálogo para editar sus propiedades.
Este diálogo también te permitirá eliminar un emoji.

:::danger

Cuando eliminas un emoji personalizado, las notas antiguas que lo contengan seguirán teniendo el nombre de texto del emoji. El emoji ya no se mostrará correctamente.

:::

Ten en cuenta que los emoji remotos no se pueden editar ni borrar.

Cada emoji puede tener un nombre, una categoría y varias etiquetas.
La categoría se utiliza para estructurar el selector de emoji.
Mientras tanto, las etiquetas se pueden utilizar como nombres alternativos con los que se puede encontrar el emoji al buscarlo en el selector de emoji.

Cuando termine de editar, guarde los cambios haciendo clic en la marca de verificación de la esquina superior derecha del cuadro de diálogo.

### Edición masiva

Los emoji pueden editarse en bloque marcando la casilla situada debajo del campo de búsqueda.
Con esta opción activada, al hacer clic en un emoji, éste se seleccionará en lugar de abrirse el cuadro de diálogo de edición.

Las opciones de edición se mostrarán como botones debajo de la casilla de verificación.
Para volver al comportamiento normal basta con volver a desmarcar la casilla.

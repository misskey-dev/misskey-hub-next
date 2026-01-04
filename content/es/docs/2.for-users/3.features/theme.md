# Temas

Los temas se pueden utilizar para cambiar la apariencia del cliente Misskey.

## Configuración del tema

[Configuración > Tema](x-mi-web://settings/theme)

## Crear tema

Los temas se describen como objetos JSON5, escritos en el formato que se muestra a continuación:.

```js
{
	id: '17587283-dd92-4a2c-a22c-be0637c9e22a',

	name: 'Danboard',
	author: 'syuilo',

	base: 'light',

	props: {
		accent: 'rgb(218, 141, 49)',
		bg: 'rgb(218, 212, 190)',
		fg: 'rgb(115, 108, 92)',
		panel: 'rgb(236, 232, 220)',
		renote: 'rgb(100, 152, 106)',
		link: 'rgb(100, 152, 106)',
		mention: '@accent',
		hashtag: 'rgb(100, 152, 106)',
		header: 'rgba(239, 227, 213, 0.75)',
		navBg: 'rgb(216, 206, 182)',
		inputBorder: 'rgba(0, 0, 0, 0.1)',
	},
}

```

- `id` ... ID único del tema.Se recomienda un código UUID
- `name` ... Nombre del tema
- `author` ... El autor del tema
- `desc` ... Descripción del tema (opcional)
- `base` ... Si es un tema claro u oscuro
  - Si lo ajustas a `light`, el tema aparecerá como un tema de modo claro, si lo ajustas a `dark`, aparecerá como un tema de modo oscuro.
  - El tema heredará los valores por defecto del tema especificado aquí.
- `props` ... Definición del estilo del tema.Se explicará a continuación.

### Definiciones de los estilos de los temas

En `props` se define el estilo del tema.
La clave es el nombre de la variable Css y el valor especifica el contenido.
Tenga en cuenta que este objeto `props` hereda del tema base.
El tema base es [\_light.json5][_light.json5] si la `base` de este tema es `light` y [\_dark.json5][_dark.json5] si es `dark`.
Esto significa que incluso si no hay una clave `props` con `panel` en este tema, se asume que hay un `panel` del tema base allí.

[_light.json5]: https://github.com/misskey-dev/misskey/blob/develop/packages/frontend-shared/themes/_light.json5
[_dark.json5]: https://github.com/misskey-dev/misskey/blob/develop/packages/frontend-shared/themes/_dark.json5

#### Sintaxis de los valores

- Los colores representados en hexadecimal base 16
  - Ejemplo:. `#00ff00`
- Colores representados en el formato `rgb(r, g, b)`
  - Ejemplo: `rgb(0, 255, 0)`
- Colores con transparencia representados en el formato «rgba(r, g, b, a)»
  - Ej: rgba(0, 255, 0, 0.5)\`
- Referencias a valores de otras claves
  - Escribiendo @{keyname} se hace referencia al valor de la otra clave.Reemplaza {keyname} por el nombre de la clave al cual quieras hacer referencia.
  - Ej:`@panel`
- Referencia a constantes (como se describe más adelante)
  - Escribiendo ${constant-name} se hace referencia a la constante.Reemplaza `{nombre de la constante}` por el nombre de la constante a la que deseas hacer referencia.
  - Ejemplo: `$main`
- Funciones (ver más abajo)
  - `:{nombre de la función}{parámetros}{color}`

#### Constantes

Cuando hay un valor que no se quiere generar como variable CSS pero sí se quiere reutilizar como valor de otra variable CSS, es conveniente usar constantes. Cuando a un nombre de clave se le añade como prefijo <code>$</code>, esa clave no será generada como una variable CSS.

#### Funciones

Las funciones tienen la forma: `:{function-name}<{argument}<{color}`.

Puedes usar el formato «:{nombre de la función}<{argumento}<{color u otra referencia clave}».

```js
props: {
	accent: '#86b300',
	accentDarken: ':darken<10<#86b300',
	accentLighten: ':lighten<10<@accent'
}
```

##### Funciones disponibles

- `lighten` ... Devuelve un color obtenido al sumar el argumento (de 0 a 100) al brillo (de 0 a 100) del color proporcionado.
- `darken` ... Devuelve el color obtenido al restar el argumento (0 a 100) del brillo (0 a 100) del color proporcionado.
- `alpha` ... Devuelve el color con el valor de transparencia (alfa) ajustado al argumento dado (0.0-1.0).
  - 0,0 es completamente transparente, mientras que 1,0 es completamente opaco.
- `hue` ... Devuelve el color girado según el valor del argumento (-360 a 360) en relación con el tono (-360 a 360) del color proporcionado.
- `saturate` ... Devuelve un color obtenido al sumar el argumento (0 a 100) a la saturación (0 a 100) del color proporcionado.

## Distribuir temas

A partir de la versión 2023.11.0, puedes instalar temas directamente desde un sitio web con un solo clic.

Si desea proporcionar la funcionalidad de instalación de temas, tendrá que implementar una Api en su sitio.Para más información, consulta [aquí](../../for-developers/publish-on-your-website/).

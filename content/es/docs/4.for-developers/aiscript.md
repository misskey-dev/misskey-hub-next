# AiScript

AiScript es un lenguaje de scripting para Misskey que puede ser utilizado en las siguientes funciones:

- [Plugins](./plugin/create-plugin/)
- [Widgets](/docs/for-users/features/widgets/)
  - Botones
  - Consola de AiScript
  - Aplicación AiScript
- [Misskey Play](./plugin/create-play/)
- Scratchpad

:::tip

La implementación de AiScript está en un repositorio separado de Misskey y es [código abierto y disponible aquí](https://github.com/aiscript-dev/aiscript).

:::

## Uso

Se puede utilizar la sintaxis estándar de AiScript y las funciones incorporadas.

:::tip

La documentación está disponible [aquí](https://aiscript-dev.github.io/)
La versión de AiScript que se puede utilizar puede diferir dependiendo de la versión del propio Misskey.Para comprobar la versión, ejecute `<: Core:v` con Scratchpad o similar.

:::

Además, se proporcionan tres grupos de constantes y funciones incorporadas específicas de Misskey.

### Misskey AiScript API

Prefijo: `Mk:`
Un conjunto de funciones constantes que se pueden utilizar en todos los entornos AiScript dentro de Misskey.
Para obtener más información, consulte [AiScript Misskey Extension API Reference](. /plugin/plugin-api-reference/), donde se utiliza el prefijo `Mk:`.

### Plugin API

Prefijo: `Plugin:`
[Plugin] (. /plugin/).
Para obtener más información, consulte [Referencia API de la extensión AiScript Misskey](. /plugin/plugin-api-reference/) para más información.

### UI API

Prefijo: `Ui:`
[Widgets](/docs/for-users/features/widgets/) (AiScript App), [Misskey Play](. /plugin/create-play/), y Scratchpad.
Para obtener más información, consulte [AiScript Misskey Extension API Reference](. /plugin/plugin-api-reference/) con `Ui:`.

### Plugin I/O

Las implementaciones internas de las funciones `readline` e `print` (y la sintaxis `<:`) definidas en el estándar AiScript se proporcionan de forma independiente en el lado de Misskey.

#### readline(message)

`message`: `str`
Valor de retorno: `str`
Se puede utilizar en todos los entornos AiScript dentro de Misskey.\
Muestra una ventana emergente solicitando una cadena.

#### print(message)

`message`: `any`
Valor de retorno: `null`
[widget](/docs/for-users/features/widgets/) (consola AiScript), disponible en Scratchpad.\
Envía una cadena a la consola.\
La sintaxis `<:` funciona de forma similar.

# Federación

Como plataforma descentralizada, Misskey soporta federación ActivityPub por defecto, pero la federación pueden ser limitadas o desactivadas dependiendo de la política de funcionamiento del servidor y otros factores.

:::tip

La federación está activada por defecto, por lo que no es necesario configurarla de ninguna manera particular en circunstancias normales (cuando se utiliza en estado de federación).

:::

## Configuración

Puede configurarse en la sección "Federación" del [Panel de control > General] (x-mi-web://admin/settings).

### Todo

Federación con todos los servidores (excluyendo servidores bloqueados, etc.).Esta es la opción por defecto.

### Especificar Host

Sólo se federa con servidores específicos (lista blanca).Introduzca los nombres de host de los servidores que pueden federarse, separados por nuevas líneas, en "Servidores que pueden federarse".

### Ninguno

No hay federación con otros servidores.Se omiten algunas pantallas y elementos de configuración relacionados con la federación.

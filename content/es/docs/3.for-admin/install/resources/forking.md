# Notas sobre la bifurcación (Forking) y personalización de Misskey

La Licencia Pública General Affero GNU v3.0 (AGPL-3.0), adoptada por Misskey, obliga a revelar cualquier modificación realizada en el código fuente de Misskey.

A partir de Misskey v2024.2.0, se ha implementado una función para facilitar el cumplimiento de esta licencia.A continuación, presentamos cómo configurar esta función.

:::warning

Por supuesto, incluso si basas tu trabajo en versiones anteriores a ésta, debes tomar medidas para cumplir la licencia.

:::

## Usando de Misskey sin modificaciones

Si  tienes la intención de utilizar sólo las características incorporadas de Misskey sin hacer ningún cambio en el código base, no hay ninguna acción específica requerida.

## Realización de cambios en el código de Misskey y publicación de la versión modificada en plataformas como GitHub

Si modificas el código de Misskey y pretendes publicar la versión modificada en plataformas como GitHub, asegúrate de lo siguiente:

- Mantén tu repositorio público ( sin ninguna restricción de acceso, permitiendo que cualquiera pueda tener acceso)

Procedamos con la configuración.

1. Construye la versión modificada de Misskey y despliégalo en tu entorno de producción.
2. Abra [admin] (x-mi-web://admin/settings) mientras está conectado con la cuenta Admin.
3. Introduce la URL de tu repositorio Misskey en el campo 'URL del repositorio'.

## Si realiza algunos cambios en el código de Misskey, pero no publicas (o no puedes publicar) la versión modificada en GitHub o en otro lugar

En este caso, el código fuente debe seguir siendo accesible directamente en la interfaz de Misskey.En Misskey v2024.2.0 y posteriores, se ha implementado la capacidad de compilar automáticamente el código fuente en ficheros de archivo en tiempo de compilación.

:::tip

Obsérvese que el tratamiento de divulgar **el código fuente sólo previa solicitud se considera insuficiente para cumplir la licencia.**

Incluso si  no utilizas la función incorporada de Misskey para revelar el código fuente, asegúrate de que hay alguna manera de acceder directamente al código fuente de la versión en ejecución de Misskey desde la interfaz Web de Misskey.

:::

Procedamos con la configuración.

1. Abre el archivo de configuración de Misskey (por defecto es `.config/default.yml`).
2. Establece `publishTarballInsteadOfProvideRepositoryUrl` en `true` (puedes simplemente descomentar la parte especificada en el archivo de configuración).
3. Construye Misskey (esto generará un tarball del código fuente).
4. Abra el tarball generado y asegúrese de que **no se incluye información confidencial como tokens en el código fuente distribuido.**
5. Si se incluye alguna información confidencial, edita `scripts/tarball.mjs` para excluir dicha información.

:::warning

La generación del tarball del código fuente se produce durante el proceso de compilación.Asegúrese de reconstruir cada vez que se realicen cambios en `scripts/tarball.mjs`.

:::

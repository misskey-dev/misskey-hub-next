# Fan-out Timeline Technology (FTT)

FTT es una de las funciones de servidor disponibles en Misskey.

Cuando se activa, el rendimiento de la recuperación de varias líneas de tiempo puede mejorar significativamente y la carga de la base de datos puede reducirse.Sin embargo, el uso de memoria en Redis aumentará.Puede desactivarse si la capacidad de memoria del servidor es baja o si el funcionamiento es inestable.

Puede configurar los ajustes a través de [Panel de control > Rendimiento] (x-mi-web://admin/performance).

## Reenvío a la base de datos

- Si está activada, se realiza un proceso alternativo que consulta adicionalmente la base de datos si la línea de tiempo no está almacenada en caché.
- Deshabilitarlo reduce aún más la carga del servidor al no realizar el proceso fallback, pero limita el alcance de la recuperación de líneas temporales.

## Plazos en los que se puede aplicar el ITF

- Línea de tiempo de inicio
- Línea local
- Linea del tiempo social
- Listas de usuario

# Reportes

Misskey puede recibir informes sobre el contenido en el servidor de los usuarios dentro y fuera del servidor.

El informe se entrega en [panel de control > informe] (x-mi-web://admin/abuses).**Compruébalo con frecuencia.**

## Tramitación de informes.

Para informar,

- Usuarios a denunciar.
- Contenido reportado
- Reportador

La información incluye.

:::tip

El informe puede ser reenviado desde un servidor remoto.En este caso, el invocador puede ser la cuenta del sistema (`@instance.actor`) para ese servidor.

:::

Si es necesario, se puede dejar una nota de moderación, que sólo pueden ver las cuentas con derechos de administrador y moderador, para anotar el estado del informe.

Una vez que haya atendido el reporte, márquelo como completa.

- Resuelto (aprobado) si el contenido es legítimo y se ha tomado alguna medida, por ejemplo
- Resuelto (denegado)", por ejemplo, si el contenido es fraudulento y no se ha tomado ninguna medida

la respuesta puede terminarse distinguiendo el estado de la resolución en función del resultado de la acción emprendida.

## Reenviar a la instancia  remota

En el caso de un informe relativo a un usuario remoto, el informe puede reenviarse al servidor en cuestión.Al reenviar un informe, la persona que llama se reenvía en forma de cuenta anónima del sistema (`@instance.actor`).

## Notificación del informe.

Puede recibir una notificación de que se ha realizado un informe mediante un webhook o una notificación por correo electrónico.Abra [Panel de control > Informes] (x-mi-web://admin/abuses) y vaya a 'Configuración de notificaciones'.

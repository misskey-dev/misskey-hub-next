# Roles

Las funciones son atributos asignados a los usuarios que permiten mostrar distintivos y asignar permisos mediante la configuración de políticas.

La asignación de funciones puede hacerse manual (asignación) o automáticamente en función de determinadas condiciones.

Un usuario puede tener varios roles a la vez.

## Rol base

Puedes establecer políticas que se aplicarán por defecto a todos los usuarios en la configuración de la plantilla de roles (rol base).

Puede configurar la plantilla de funciones en el panel de control, en "Funciones > Plantilla de funciones".

## Modo de Asignación

Puedes configurar un rol para que se asigne manual o automáticamente.

- **Manual:**... Asignar y desasignar usuarios manualmente.(Roles manuales)
    - También puede establecer una duración para el rol.
- **Condicional:** Establezca las condiciones para la asignación. Los usuarios que cumplan las condiciones se asignarán automáticamente.(Rol Automático)

:::warning

En comparación con los roles manuales, los roles condicionales tienen las siguientes limitaciones.

- Los roles condicionales no se pueden asignar/desasignar manualmente.
- No hay forma de ver una lista de usuarios a los que se ha asignado un rol condicional.

:::

## Permisos

Cada rol puede recibir los siguientes permisos básicos.

- **Usuario Normal:**  No tiene ningún permiso especial.
- **Moderador:**... Puede realizar operaciones básicas de moderación
- **Administrador:** Puede modificar todos los ajustes de la instancia

Se pueden establecer permisos más detallados en Políticas.

## Políticas

Las políticas de roles pueden ajustarse para implementar permisos y restricciones de funciones.

Las políticas también pueden configurarse para que hereden los valores de la plantilla de roles.

### Prioridad

Si se asignan varios roles y se define la misma política con valores diferentes para cada rol, se pueden asignar prioridades a cada política para determinar cuál prevalece. Las políticas con mayor prioridad prevalecen sobre las de menor prioridad.

La prioridad se asigna por política, no por rol.Las plantillas de rol no pueden tener prioridad

**Si las prioridades de una política son las mismas, prevalece por defecto el valor mayor o más permisivo.**

:::tip

Por ejemplo, supongamos que a un usuario se le asignan los roles A y B. La política de capacidad de la unidad para el rol A se establece en 500 MB y la política de capacidad de la unidad para el rol B se establece en 300 MB

- Si la prioridad para esta política en el rol A es mayor o las prioridades son las mismas, entonces el usuario tendrá 500MB de capacidad en Drive.
- Si la prioridad para esta política en el rol B es más alta, entonces el usuario tendrá 300MB de capacidad en Drive.

Además, supongamos que el usuario también tiene asignados los roles C y D. El rol C tiene la política "Puede enviar notas públicas" establecida en "No", mientras que el rol D tiene la misma política establecida en "Sí".

- Si la prioridad de esta política en el rol D es mayor o las prioridades son las mismas, entonces el usuario tendrá la política establecida en "Sí".
- Si la prioridad de esta política en el rol C es mayor, entonces el usuario tendrá la política establecida en "No".

:::

### Usar los valores del rol base

Activa esta opción para heredar el valor de la política de la plantilla de roles.

## Creando Roles

Se pueden crear nuevos roles desde "Roles" en el Panel de Control.

## Ver, editar o eliminar detalles de roles

Los roles pueden editarse en "Roles" en el Panel de Control.

## Asignación y desasignación de funciones a los usuarios

Las funciones pueden asignarse a los usuarios en "Moderación > Funciones".

También puedes asignar funciones directamente desde el menú del usuario.

Puede establecer un periodo de tiempo para asignar el rol.

:::tip

Los cambios en la asignación de roles pueden tardar algún tiempo en surtir efecto.

:::

:::warning

Los roles condicionales no pueden asignarse manualmente.

:::

## Comprobación de las políticas de un usuario

Las políticas de un usuario pueden consultarse en "Moderación > Visión general > Políticas".

# Modo seguro

A partir de la versión 2025.8.0, Misskey Web incluye una función de «modo seguro». Este modo inicia el cliente con los complementos, el CSS personalizado y los temas desactivados en caso de que causen problemas operativos.

Puedes acceder al modo seguro mediante el siguiente método.

- (Si aparece una pantalla de error al iniciar) Haz clic en el botón «Iniciar Misskey en modo seguro» en la pantalla de error.
- (Si hay un teclado conectado) Pulsa rápidamente la tecla «g».
- Añade «?safemode=true» a la URL.
- (Cuando se utiliza PWA) Inicie seleccionando Safemode a través del acceso directo.

Las siguientes funciones están restringidas mientras se ejecuta en modo seguro.

- Independientemente de si están habilitados o deshabilitados, todos los complementos se desactivarán y no será posible realizar nuevas instalaciones.
- No se aplicará el CSS personalizado.
- Se iniciará utilizando el tema predeterminado independientemente de la configuración, y no podrás cambiar el tema (aunque se puede eliminar a través de la página de gestión de temas).
- El mensaje «Modo seguro» se muestra constantemente en la pantalla.

Utiliza el modo seguro para identificar y solucionar el problema causado por algún componente.Una vez completado el procedimiento, desactiva el modo seguro haciendo clic en «Desactivar» en el menú que se muestra siempre durante el funcionamiento del modo seguro.

:::tip

El modo seguro no está diseñado para un uso regularUna vez completado el procedimiento, apágalo y reinicia  en modo normal.

:::

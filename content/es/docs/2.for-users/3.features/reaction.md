# Reacciones

La función de reacción te permite mostrar fácilmente tus reacciones a las notas de otras personas utilizando emojis.Para reaccionar, haz clic en el icono + de la nota y selecciona un emoji del selector. También puedes reaccionar con [emojis personalizados](./custom-emoji.md).

## Personalizando el selector de Emojis

Puedes seleccionar qué emojis se muestran en el selector de emoji. Estas opciones se encuentran en Ajustes > Paleta emoji.

## Reacciones a Posts Remotos

Las reacciones son una característica original de Misskey. Las plataformas que no soportan las reacciones de Misskey recibirán la reacción como una actividad "me gusta".Esto podría llamarse "favorito" en algunas plataformas.

## Reacciones desde instancias remotas

Si una actividad genérica "me gusta" es recibida desde un servidor remoto, Misskey la interpretará como una reacción «❤».

## Viendo tus reacciones

En Misskey Web, puedes ver tus reacciones anteriores yendo a tu perfil y seleccionando la pestaña Reacciones.Puedes cambiar la privacidad de tus reacciones yendo a Ajustes > Privacidad.

## Aceptación de reacciones

Al publicar una nota, puedes limitar los tipos de reacciones que se aceptarán para esa nota.

- Todo: Se permiten todas las reacciones
- Todos (sólo Me gusta remotos): Permite todas las reacciones de tu servidor, pero solo acepta reacciones de otros servidores como Me gusta (❤)
- Solo no sensible: Todas las reacciones están permitidas, pero no podrás reaccionar con reacciones de tu propio servidor que estén marcadas como «sensibles»
- Solo contenido no sensible (Solo me gusta en remoto):  No podrás reaccionar usando emojis personalizados marcados como "sensibles" desde tu propio servidor, y todas las reacciones de otros servidores se aceptan como Me gusta/likes (❤)
- Solo Likes: Solo puedes reaccionar con un Me gusta/like (❤)

En este caso, la reacción que especifiques será aceptada en tu servidor.Por ejemplo, si ves una nota en otro servidor con la opción "Solo me gusta", la nota puede tener una reacción emoji en ese servidor.

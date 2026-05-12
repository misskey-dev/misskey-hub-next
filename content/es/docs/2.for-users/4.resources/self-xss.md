# Ataque Self-XSS

![](/img/docs/for-users/resources/self-xss/console_warn.png)

¿Has llegado a esta página después de seguir las instrucciones de alguien usando Misskey y ver una pantalla como la de arriba? <u>**Puede que hayas sido engañado por un atacante malintencionado.**</u>

A menos que escribas el contenido que se te indique (muy probablemente un programa), no se enviará ninguna información al atacante.**Por favor, deja de hacer lo que estás haciendo inmediatamente.**

La pantalla que estás viendo se llama "consola", una herramienta que los desarrolladores utilizan para comprobar el código y corregir errores. **Esta pantalla no es necesaria para el uso habitual.**

## Más detalles

En un ataque Self-XSS, un atacante engaña a un usuario para que pegue código malicioso en las herramientas de desarrollo del navegador.A menudo lo hacen con afirmaciones tentadoras como:

- Desbloquear funciones o ventajas ocultas
- Probar este código por motivos de seguridad
- Hackear la web para conseguir puntos extra

Si te convencen para que ejecutes este código, realizarás acciones que el atacante pretendía.

A diferencia de lo que podría imaginarse como un "ciberataque" típico, los ataques Self-XSS obtienen datos confidenciales engañando a los usuarios para que utilicen aplicaciones legítimas. Esto significa que, además de las medidas de seguridad del sistema, es crucial que los usuarios se mantengan alerta frente a estos trucos.

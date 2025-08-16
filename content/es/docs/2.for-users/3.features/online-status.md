# Estado de conexión

El **Estado en línea** de un usuario es una indicación del estado de uso de Misskey del usuario.
El estado en línea se muestra como un indicador en la esquina del icono del usuario en la página de usuario, por ejemplo.

<table>
	<tbody><tr>
		<th>Color</th>
		<th>Estado</th>
		<th>Descripción</th>
	</tr>
	<tr>
		<td>🟢Verde</td>
		<td>En línea</td>
		<td>El usuario parece estar usando Misskey ahora mismo</td>
	</tr>
	<tr>
		<td>🟡Amarillo</td>
		<td>Activo</td>
		<td>Este usuario parece no estar en línea ahora mismo, pero ha utilizado Misskey recientemente</td>
	</tr>
	<tr>
		<td>🔴Rojo</td>
		<td>Desconectado</td>
		<td>Parece que este usuario no ha utilizado Misskey recientemente</td>
	</tr>
	<tr>
		<td>⚫Gris</td>
		<td>Desconocido</td>
		<td>Este usuario tiene un estado que es privado, o el estado es desconocido por algunas razones como ser usuario remoto, etc.</td>
	</tr>
</tbody></table>

El estado en línea cambia automáticamente y no puede configurarse manualmente. Sin embargo, puedes establecer tu estado en línea como privado.

:::warning

Algunas funciones, como las recomendaciones de usuarios, pueden procesarse en función del estado en línea, por lo que hacer que tu estado sea privado puede dificultar que otros usuarios te encuentren.

:::

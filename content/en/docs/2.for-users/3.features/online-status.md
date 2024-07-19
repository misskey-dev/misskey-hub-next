# Online Status

A user's **Online Status** is an indication of the user's Misskey usage status.
The online status is displayed as an indicator in the corner of the user's icon on the user page, for example.

<table>
	<tbody><tr>
		<th>Color</th>
		<th>State</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>🟢Green</td>
		<td>Online</td>
		<td>The user seems to be using Misskey right now</td>
	</tr>
	<tr>
		<td>🟡Yellow</td>
		<td>Active</td>
		<td>This user seems seems not to be online right now, but has used Misskey recently</td>
	</tr>
	<tr>
		<td>🔴Red</td>
		<td>Offline</td>
		<td>This user seems to have not used Misskey recently</td>
	</tr>
	<tr>
		<td>⚫Gray</td>
		<td>Unknown</td>
		<td>This user has a status that is private, or the status is unknown for some reasons such as being remote user, etc.</td>
	</tr>
</tbody></table>

Online status changes automatically and cannot be set manually.
However, you can set your online status to private.

:::warning

Some features, such as user recommendations, may be processed based on online status, so making your status private may make it harder for other users to find you.

:::

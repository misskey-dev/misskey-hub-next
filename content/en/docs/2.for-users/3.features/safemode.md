# Safe Mode

Since Misskey Web v2025.8.0, Misskey features a Safe Mode which disables custom CSS, plugins, and themes. This is for cases where these features interfere with the normal operation of the app.

Safe Mode can be activated in the following ways:

- If an error appears on startup: Click the "Launch Misskey in safe mode" button on the error screen.
- If using a keyboard: Press the G key repeatedly
- Add "?safemode=true" to the URL
- If using the PWA: Use the Safe Mode shortcut to launch the app

When Safe Mode is enabled, the following limitations will apply:

- All plugins will be disabled regardless of whether they are configured to be enabled or disabled, and new plugins cannot be installed.
- Custom CSS will not be applied.
- The default theme will be applied regardless of settings, and theme changes will be disabled. Themes can still be deleted from the Theme settings page.
- A "Safe Mode" message will always be displayed on screen.

Use Safe Mode to troubleshoot issues.Once you have resolved your issues, click "Turn off" in the Safe Mode menu to return to normal operation.

:::tip

Safe Mode is not intended for normal use.Once you have finished troubleshooting your issue, disable Safe Mode and resume normal operation.

:::

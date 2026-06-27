# Safe Mode

Since Misskey Web v2025.8.0, Misskey features a safe mode which disables custom CSS, plugins, and themes. This is intended for troubleshooting cases where these customizations interfere with the normal operation of the client.

Safe mode can be activated in the following ways:

- If an error appears on startup: Click the "Launch Misskey in safe mode" button on the error screen
- If using a keyboard: Press the G key repeatedly
- Add `?safemode=true` to the URL
- If using the PWA: Select "Safemode" from the shortcut menu to launch the app

When safe mode is enabled, the following limitations apply:

- All plugins are disabled regardless of their enabled or disabled settings, and new plugins cannot be installed.
- Custom CSS is not applied.
- The default theme is used regardless of settings, and theme changes are disabled. Themes can still be deleted from the theme management page.
- A “safe mode” indicator is always displayed on screen.

Use safe mode to troubleshoot issues.Once the issue has been resolved, click "Turn off" in the safe mode menu to disable safe mode.

:::tip

Safe mode is not intended for regular use.Once troubleshooting is complete, disable it and start the app in normal mode.

:::

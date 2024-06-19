export default defineNitroPlugin((nitroApp) => {
	nitroApp.hooks.hook('render:html', (html, { event }) => {
		html.head.unshift(`\n<!---
   _____ _         _           
  |     |_|___ ___| |_ ___ _ _ 
  | | | | |_ -|_ -| '_| -_| | |
  |_|_|_|_|___|___|_,_|___|_  |
                          |___|
  Thank you for using Misskey!
  If you are reading this message... how about joining the development?
  https://github.com/misskey-dev/misskey

-->\n`);
	});
});

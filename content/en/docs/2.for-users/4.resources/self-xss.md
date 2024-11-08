# Self-XSS Attack

![](/img/docs/for-users/resources/self-xss/console_warn.png)

Did you land on this page after following someone's instructions while using Misskey and seeing a screen like the one above? <u>**You may have been tricked by a malicious attacker.**</u>

Unless you type in the content you were instructed to (most likely a program), no information will be sent to the attacker.**Please stop what you're doing immediately.**

The screen you're seeing is called the "console," a tool developers use to check code and fix bugs. **This screen is not needed for regular use.**

## More Details

In a Self-XSS attack, an attacker tricks a user into pasting malicious code into the browser’s developer tools.They often do this by making enticing claims like:

- Unlock hidden features or perks
- Test this code for security purposes
- Hack the website to get extra points

If you’re convinced to run this code, you’ll perform actions that the attacker intended.

Unlike what you might image as a typical "cyberattack," Self-XSS attacks get sensitive data by tricking users into using legitimate apps. This means that, in addition to system security measures, it's crucial for users to stay vigilant against these tricks.

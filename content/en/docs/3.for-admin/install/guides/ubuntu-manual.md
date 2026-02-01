# Detailed guide to installing Misskey on Ubuntu

## Other ways to install Misskey

- [Basic guide to building Misskey (manual)](./manual/)
- [List of alternative installation methods](/docs/for-admin/install/guides/#list-of-installation-methods)

## Shell Script Notice

“It's basically all copy-and-paste—just use a shell script,” right?
**So I went ahead and made one that does almost everything for you!**\
[**You can find details and usage instructions for the shell script here.**](./bash/)

:::tip

The shell script is not intended for setting up a development environment.

:::

:::tip

Please note that you need to purchase a domain, set up Cloudflare, and provision a server on your own.

:::

If you encounter any issues, please [mention @aqz@p1.a9z.dev](https://p1.a9z.dev/@aqz).

## About this article

As described in the [Misskey Setup Guide (manual)](./manual/), this article explains how to run Misskey using systemd.

If you [use docker-compose](./docker/), it should be possible to run Misskey a bit more easily, even with a manual setup.

:::danger

Do not recreate the database for a domain/hostname that is already in use on a running server!

:::

## Introduction

In this article, based on the [Misskey setup guide (manual)](./manual/), I’ll walk you through every step of installing and hosting Misskey publicly on a typical Ubuntu server.

The setup is designed to be completed using only Bash commands, a few configuration file edits, and basic browser steps.I provide brief explanations of the software you’ll install, but you don’t need to focus on the details.

To keep things concrete, this article is written for a specific environment.

Some details may differ depending on your operating system, or may have changed due to updates to Misskey itself or its dependencies. Please keep that in mind.

For unfamiliar terms, I suggest looking them up in [“An IT Terminology Dictionary That Lets You Feel Like You Understand What You ‘Almost’ Understand but Don’t,”](https://wa3.i-3-i.info/) and enjoy the feeling of “getting it.”

## Environment and Requirements

- **Ubuntu 22.04 LTS** is used as the operating system.
- Regarding hardware requirements, a recent CPU is sufficient to run the system with minimal resources.The supported architectures are amd64 and arm64.
- It is recommended to have around 4 GB of memory.
  - (Previously, it was explained that the build could be completed with approximately 1.5 GB of memory due to the introduction of Vite. However, the frontend build requirements have recently become more demanding again.)
- Purchase your own domain and use Cloudflare.
- Prepare the domain in advance using [Cloudflare Registrar](https://www.cloudflare.com/ja-jp/products/registrar/) or a similar service.
- In this guide, the domain example.tld is used for explanation. Replace it with your own domain as appropriate.For development environments, use localhost instead (explained separately in the configuration section).

:::danger

Never change the domain name or hostname of a server once it has been put into use!

:::

## How to use nano

In this guide, we will use nano as the text editor.Start it as follows:

```sh
nano /path/to/file
```

You can move the cursor using the arrow keys as well as Home/End.

To exit, press Ctrl+X. If you are asked whether to save changes, type Y (Yes) and press Enter to save.

A list of commands is shown at the bottom of the screen. Here, ^ means Ctrl and M- means Alt.

## Creating a user

Since Misskey should not be run as root, create a dedicated user.

```sh
sudo adduser --disabled-password --disabled-login misskey
```

:::tip

In a development environment, you do not need to create a separate user.

:::

## Basic Software Installation and Configuration

Install the basic software required.

### Node.js

Node.js is a server-side JavaScript runtime and is the core runtime environment required to run Misskey.

```sh
sudo rm /usr/share/keyrings/nodesource.gpg;
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg;
NODE_MAJOR=20; echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list;
sudo apt update;
sudo apt install -y nodejs;

# Now that node.js is installed, check the version
node -v

# corepack enable
sudo corepack enable
```

If the output shows something like v22.x.x, the installation is successful.If a lower version such as v8.x.x is displayed, Node.js was not installed correctly. In that case, try rebooting the server and installing it again.

### pnpm

pnpm is the package manager used by Misskey. It is used to install external libraries and manage their dependencies.

This guide explains how to install pnpm using npm, the package manager bundled with Node.js. However, the pnpm website also offers several other installation methods. We recommend reviewing them and choosing the method that best suits your environment.

```sh
npm i -g pnpm
```

### PostgreSQL

PostgreSQL is an object-relational database management system and is essential for storing various types of data used by Misskey.

#### Installation

Run the shell script to install the latest version (v15).

```sh
sudo apt install -y postgresql-common

sudo sh /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh -i -v 15;

# check the status of the service with systemctl.
systemctl status postgresql
```

If the status is "active", you're good to go.

#### Create a user and database

Start psql:

```sh
sudo -u postgres psql
```

Create a user for Misskey.\
For example, to create a user named misskey with the password hoge, run the following commands.\
(Note: Linux users and PostgreSQL roles/users are different. Be careful not to confuse them.)

```sql
CREATE ROLE misskey LOGIN PASSWORD 'hoge';
```

Create the database.The database name is mk1.

```sql
CREATE DATABASE mk1 OWNER misskey;
\q
```

### Redis

Redis is an in-memory NoSQL data store. It is required for tasks such as caching and managing internal communication, including database- and federation-related processing.  
Install Redis by following the official documentation on redis.io:

https\://redis.io/docs/getting-started/installation/install-redis-on-linux/

```sh
sudo apt-get install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis
```

Start Redis:

```sh
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

Check the daemon status with systemctl:

```sh
systemctl status redis-server
```

If it shows active, Redis is running correctly.

### FFmpeg

FFmpeg is used for processing video and audio.Install it with the following command.

```sh
sudo apt install ffmpeg
```

### nginx

nginx is a web server mainly used as a reverse proxy.It is not strictly required for Misskey, but installing it is recommended, as it can improve performance with caching and can also redirect HTTP to HTTPS.

:::tip

If you're setting up a development environment, you don't need nginx.

:::

Follow the nginx.org documentation http\://nginx.org/en/linux_packages.html#Ubuntu to install nginx.

```sh
sudo apt install -y curl ca-certificates gnupg2 lsb-release ubuntu-keyring

curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

Check that the output is `573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62`.

```sh
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list

echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" | sudo tee /etc/apt/preferences.d/99nginx

sudo apt update

sudo apt install -y nginx
```

Check the service status with systemctl:

```sh
systemctl status nginx
```

If the status is active (running), you're all set.If not, run:

```sh
sudo systemctl start nginx

sudo systemctl enable nginx
```

Access <http://localhost>. If you see \*Welcome to nginx!\*, it’s working.\
You can also verify with curl:

```sh
curl http://localhost
```

### Other

Install Git (a version control tool) and build-essential (required to build Misskey):

```sh
sudo apt update

sudo apt install -y git build-essential
```

## Additional Configuration and Installation

Prepare the server for public Internet access.

:::tip

For development environments, firewall, Cloudflare, and Certbot configuration are not required.

:::

### Firewall

In this setup, ufw is used as the firewall.

In the following setup, a whitelist-based policy is applied: the SSH port (22) is opened with connection rate limiting enabled, and the HTTP (80) and HTTPS (443) ports are opened.

```sh
sudo ufw enable

sudo ufw default deny

sudo ufw limit 22

sudo ufw allow 80

sudo ufw allow 443
```

Check the status of ufw.

```sh
sudo ufw status
```

Enable ufw to start automatically at boot using systemctl.

```sh
sudo systemctl enable ufw
```

:::tip

ufw is a tool that makes netfilter (iptables) easier to manage.In OCI environments, the installation script configures netfilter directly.

:::

### Cloudflare

Cloudflare is a very convenient service that provides DNS servers, a reverse proxy, and a CDN for your own domain all in one place.\
While it is possible to make your server publicly accessible without Cloudflare, its convenience makes it highly recommended.
[**→ CDN Configuration**](../resources/cdn/)

[Sign up for Cloudflare](https://dash.cloudflare.com/sign-up) and register the domain you purchased by following the instructions.

On the DNS settings page, it is recommended to enter your server’s IP address.

Depending on where you purchased the domain, it may take up to three days for the changes to take effect.

### Certbot (Let’s Encrypt) Setup

Obtain TLS certificates for HTTPS and WSS communication from Let’s Encrypt using Cloudflare.

Install Certbot and the Cloudflare plugin

```sh
sudo apt install -y certbot python3-certbot-dns-cloudflare
```

Obtain a Cloudflare API key.Follow the steps below to obtain the API key:

1. Access <https://dash.cloudflare.com/profile/api-tokens>
2. Select "View" next to Global API Key.
3. Enter your password, complete the hCaptcha verification, and click "View".

Create the file `/etc/cloudflare/cloudflare.ini` and add your Cloudflare credentials.

```sh
mkdir /etc/cloudflare
nano /etc/cloudflare/cloudflare.ini
```

Set the email address that is registered with Cloudflare in dns_cloudflare_email (in the example below, it's bar\@fuga.foo).

```sh
dns_cloudflare_email = bar@fuga.foo
dns_cloudflare_api_key = xxxxxxxxxxxxxxxxxxxxxxxxxx
```

Save this file and set the permissions to 600.

```sh
sudo chmod 600 /etc/cloudflare/cloudflare.ini
```

Now that you're ready, execute the command.**Replace the two instances of `example.tld` with your actual domain.**

```sh
sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials /etc/cloudflare/cloudflare.ini --dns-cloudflare-propagation-seconds 60 --server https://acme-v02.api.letsencrypt.org/directory -d example.tld -d *.example.tld
```

Once you see "\*Congratulations!\*", you're good to go.Note down the path to the generated .pem files, as you will need them in the next steps.

Automatic renewal is configured during the Certbot installation, so no further action is required.

## Installing Misskey

Now that most of the preparations are complete, let's proceed with setting up Misskey.

Switch to the misskey user.

```sh
sudo su - misskey
```

Clone the files using Git.

```sh
git clone -b master https://github.com/misskey-dev/misskey.git --recurse-submodules

cd misskey

git checkout master
```

Install the necessary npm packages.

```sh
NODE_ENV=production pnpm install --frozen-lockfile
```

## Configuring Misskey

### default.yml

Create the configuration file .config/default.yml.

```sh
nano .config/default.yml
```

Paste the following content and replace it as needed.The configuration values that need to be changed are marked with ●, and the values that should be used based on previous steps are marked with 〇.

This configuration file is written in YAML format, so be particularly careful with the number of spaces at the beginning of each line; if incorrect, Misskey will not work.

The configurable values and their notation methods are described in [.config/example.yml](https://github.com/syuilo/misskey/blob/develop/.config/example.yml).

:::tip

For a development environment, specify the URL as `url: http://localhost:3000`

:::

```yml
# ● URL to access Misskey
url: https://example.tld/
# Set the port to 3000
port: 3000

# ● PostgreSQL configuration
db:
  host: localhost
  port: 5432
  db  : mk1 # 〇 PostgreSQLのデータベース名
  user: misskey # 〇 PostgreSQLのユーザー名
  pass: hoge # ● PostgreSQLのパスワード

# 　 Redis configuration
redis:
  host: localhost
  port: 6379

# 　 ID type setting
id: 'aidx'

# 　 syslog configuration
syslog:
  host: localhost
  port: 514
```

Save the file once you are finished.

### nginx configuration

Configure nginx with root privileges.



```sh
exit
```

Create `/etc/nginx/conf.d/misskey.conf`.

```sh
sudo nano /etc/nginx/conf.d/misskey.conf
```

Copy and paste the [Misskey Hub configuration example](/docs/for-admin/install/resources/nginx/) into nano, and replace the following parts with your own:

- The domain names on lines 18 and 30
- The certificate paths on lines 34-35, which should be the ones obtained through Certbot (essentially, just replace example.tld)
- From line 56 (If it's behind another reverse proxy or CDN, remove the following.) remove the next 4 lines

Save the changes.

Verify if the configuration file works correctly.

```sh
sudo nginx -t
```

If it’s OK, restart the nginx daemon.

```sh
sudo systemctl restart nginx
```

Check the status.

```sh
sudo systemctl status nginx
```

If it shows "active", it’s all set.

## Building Misskey

Log in again as the misskey user.

```sh
sudo su - misskey
```

Start the build.Yes, we can…

```sh
cd misskey
NODE_ENV=production pnpm run build
```

:::tip

In development environments, `NODE_ENV=production` is not required.Please remove it in the subsequent commands as well.

:::

### If the Build Fails on the Server

Insufficient RAM may be the cause.

Building Misskey and running database migrations (including initialization) require at least 2GB of RAM.\
If the server does not have enough RAM, consider the following solutions:

- Add swap space to the server.
- Build locally and transfer the built files (the built directory) to the server via SFTP.

## Database Initialization

```sh
pnpm run init
```

## Start Misskey

```sh
NODE_ENV=production pnpm run start
```

If you see the message "**Now listening on port 3000 on** [**http://example.tld**](http://example.tld)", access the URL you set up.

The Misskey welcome page should appear.

Check if you can correctly perform operations like creating an account, creating notes, and uploading files.

### If You Can't Access the Page

#### Check Cloudflare DNS Settings

Double-check that your Cloudflare DNS record points to the correct IP address.

#### Check Router Settings

If you are hosting on a home server, make sure your router allows inbound connections on ports 80 and 443 between the internet and your server.

Even on a cloud server, you may still need to open ports in your network or firewall settings.

## Create a systemd service for Misskey

:::tip

This is not necessary in a development environment.

:::

Press Ctrl+C to stop the current process, then set up Misskey to run as a daemon.

Run the following as root.

```sh
exit
```

Create `/etc/systemd/system/misskey.service`.

```sh
sudo nano /etc/systemd/system/misskey.service
```

Paste the following content and save it.

```ini
[Unit]
Description=Misskey daemon

[Service]
Type=simple
User=misskey
ExecStart=/usr/bin/npm start
WorkingDirectory=/home/misskey/misskey
Environment="NODE_ENV=production"
TimeoutSec=60
StandardOutput=journal
StandardError=journal
SyslogIdentifier=misskey
Restart=always

[Install]
WantedBy=multi-user.target
```

Set up systemd and start the Misskey service.

```sh
sudo systemctl daemon-reload

sudo systemctl enable misskey

sudo systemctl start misskey
```

Check the status of the service using systemctl.It might take a few seconds to fully start, so wait about 15 seconds before checking.

```sh
sudo systemctl status misskey
```

If it shows as active, it’s working fine.

**At this point, the Misskey installation is almost complete.**

Register and log in to your Misskey account, and continue with the setup.

## Continue with Misskey setup

- [**Explanation of the initial server configurations and other settings for Misskey**](https://hide.ac/articles/Y504SIabp)
- [**Set up Squid proxy to secure Misskey**](https://hide.ac/articles/MC7WsPDqw)
- [**Back up Misskey's database (OCI Object Storage version)**](https://hide.ac/articles/E2Ea3cauk)

## Misskey Update Process

[Updating Misskey](./manual/#updating-misskey)

During the update, Misskey will be unavailable.

```sh
sudo systemctl stop misskey

su - misskey

git pull;
NODE_ENV=production pnpm install --frozen-lockfile
pnpm run clean;
NODE_ENV=production pnpm run build;
pnpm run migrate;

exit
```

### Case 1: When upgrading with apt

```sh
sudo apt update -y
sudo apt full-upgrade -y
sudo reboot
```

After reboot, Misskey will start automatically.

### Case 2: Start manually

```sh
sudo systemctl start misskey
```

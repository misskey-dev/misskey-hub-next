# Misskey Installation Shell Script v3.0.0

This shell script was made to make the installation of Misskey easy!

By answering a couple of questions, you can easily install Misskey on an Ubuntu server!

There is also an update script.

[The (older) v12 script is available here](https://github.com/joinmisskey/bash-install/blob/a096e874f93d493aa68975a31be9ce12d644e767/README.md)

## Requirements

1. Domain
2. Ubuntu server
3. Cloudflare account (recommended)

:::danger

Do not recreate the database with the domain/hostname of the server once you have started using it!

:::

Since Let's Encrypt's verification attempts are limited, please double-check your server's network and DNS settings prior to starting the installation.

## Cloudflare Configuration

If you use Cloudflare, make sure you’ve finished setting up your domain on Cloudflare before starting the installation.  
\
It may take up to 3 days for the nameserver changes to take effect.

Also, if you configure nginx together with Cloudflare, do the following in the Cloudflare dashboard:

- Configure DNS.
- Under SSL/TLS, set the encryption mode to "Full".

## Procedure

### 1. SSH

Connect to the server via SSH.  
(If you are using the server's desktop session, open a shell instead.)

### 2. Update the system

Update all packages to the latest versions and reboot the server.

```sh
sudo apt update; sudo apt full-upgrade -y; sudo reboot
```

### 3. Installation

Reconnect to the server via SSH and start the Misskey installation.

However, we strongly recommend reading the [Tips](#tips) before you proceed.

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/ubuntu.sh -O ubuntu.sh; sudo bash ubuntu.sh
```

Please replace example.com with your own domain.

### 4. Update

An update script is also available.

The update script does not update the environment.Refer to the CHANGELOG (Japanese) and [the GitHub releases (English)](https://github.com/joinmisskey/bash-install/releases), and run migrations as needed.

First, download the script.

```sh
wget https://raw.githubusercontent.com/joinmisskey/bash-install/main/update.ubuntu.sh -O update.sh
```

To update, run the script.

```sh
sudo bash update.sh
```

- In a systemd environment, you can use the -r option to update the system and reboot.
- In a Docker environment, you can specify the target image as an argument in the form of `repo:tag`.

## Tested environment

### Oracle Cloud Infrastructure

This script works on both shapes offered by Oracle Cloud Infrastructure (OCI) Always Free.

- VM.Standard.E2.1.Micro (AMD)
- VM.Standard.A1.Flex (ARM) [1OCPU RAM6GB or greater]

Please make sure to use iptables.

## Issues & PRs Welcome

If it doesn't work in the environment described above, it may be a bug.Please report it via GitHub Issues, and include the installation conditions/configuration you used.

We may not be able to provide full support for environments other than those listed above, but if you share detailed information about your setup, we may still be able to help.

Feature suggestions are also welcome.

# Tips

How to choose options, and notes on behavior/specifications.

## Systemd or Docker?

Starting from v1, you can choose systemd or Docker as the installation method.

Even when using Docker, only Misskey itself runs in Docker, while Redis, Postgres, etc. run directly on the host.  
\
[If you want to run the whole stack with docker-compose, we recommend this article written by mamemononga.](https://gist.github.com/mamemomonga/5549bb69cad8e5618e5527593d4890e0)

If you use the Docker Hub image, you won’t need to build Misskey yourself, so **this is the recommended option**.  
However, migrations are still required, so downtime during updates won’t be zero.  
Also, since you won’t be setting up a build environment for Misskey (i.e., you won’t be updating the source with git pull), configuration can get more complicated if you later decide to run a fork.

Building Docker images locally is not recommended for performance reasons.

The systemd approach is recommended if you want to use a fork but don’t need to publish images to Docker Hub.

The recommended order is as follows:

1. Docker Hub
2. systemd
3. Local Docker build

## Whether to use nginx

We recommend using nginx as a reverse proxy between the internet and Misskey, except in the following cases:

- The server is for yourself only (a so-called single-user server) or has only a very small number of users
- You have other means to handle reverse proxy and caching functions provided by nginx, such as a load balancer (advanced users)

Using nginx as a reverse proxy lets you cache static content such as image files and reduce unnecessary server resource usage.
Additionally, nginx has features that help handle traffic spikes when the cache is cold (i.e., on cache misses), which can help keep load on Misskey under control.

Example configurations are available on [the nginx configuration page](../resources/nginx/).

## Add more swaps!

If you have swap configured, the script will not run unless the total available memory is at least 3 GB.

## If the script fails and you run it again

If it fails partway through and you need to run the script again, keep the following in mind:

- If Redis and Postgres have already been installed, set "install locally" to No.  
  \
  For the host and port prompts, just press Enter to keep the current values.
  For the username and password, enter the ones you specified the last time you ran the script.

## About the .env files

The installation script creates two .env files.  
They are used during updates.

### /root/.misskey.env

This file is required to keep track of which user runs Misskey.

### /home/(misskey user)/.misskey.env

This file is generated when using systemd.  
It is mainly used to store the directory path.

### /home/(misskey user)/.misskey-docker.env

This file is generated when using Docker.  
It stores the IDs of the running containers and images.  
The container IDs are updated during updates, and old images are removed.

## Self-managed

These notes may be helpful when you want to change the configuration after installation.

When reading this section, replace "example.com" with your own domain.

### Misskey directory

The Misskey source code is cloned into `/home/{{user}}/{{directory}}`.  
(The default values for `{{user}}` and `{{directory}}` are both `misskey`.)

To move to the Misskey directory, run:

```sh
sudo -iu {{user}}
cd {{directory}}
```

To return to the previous user, run:

```sh
exit
```

### systemd

The systemd service name is example.com.  
For example, to restart the service, run:

```sh
sudo systemctl restart example.com
```

You can check the logs with journalctl:

```sh
journalctl -t example.com
```

The service file is stored at `/etc/systemd/system/example.com.service`.

### Docker

Docker is running in rootless mode under the Misskey user.

When becoming the Misskey user with sudo, you need to set `XDG_RUNTIME_DIR` and `DOCKER_HOST`:

```sh
# Replace {{user}} with the Misskey username.
sudo -iu {{user}}
export XDG_RUNTIME_DIR=/run/user/$UID
export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/docker.sock

# Show running containers
docker ps

# Build (repository: local/misskey:latest)
docker build -t local/misskey:latest ./misskey

# docker run
docker run -d -p 3000:3000 --add-host=docker_host:10.0.0.1 -v /home/misskey/misskey/files:/misskey/files -v "/home/misskey/misskey/.config/default.yml":/misskey/.config/default.yml:ro --restart unless-stopped -t "local/misskey:latest"

# Show logs
# Replace {{CONTAINER_ID}} with the container ID.
docker logs --tail 50 -f {{CONTAINER_ID}}
```

As a one-liner, you can run:

```sh
# Replace {{user}} with the Misskey username.
sudo -u {{user}} XDG_RUNTIME_DIR=/run/user/$(id -u {{user}}) DOCKER_HOST=unix:///run/user/$(id -u {{user}})/docker.sock docker ps
```

### nginx

The nginx configuration is saved in `/etc/nginx/conf.d/example.com.conf`.

### Redis

requirepass and bind are configured in `/etc/redis/misskey.conf`.

## Q. I get a 502 error and can’t access the site after an update

With Docker, Misskey runs migrations on startup, so it may not be accessible immediately.  
Please check whether the migrations have finished.

If you are using systemd, `pnpm install` might have failed.

Run the following in the Misskey directory, then try running the update again:

```sh
pnpm run clean-all
```

If you check the logs with `journalctl`, you will usually see log entries mentioning `re2`.

## Q. I want to set up another Misskey instance on the same server

This script does not support installing an additional Misskey instance on the same server.  
Some settings may be overwritten, or it may fail with an error partway through.

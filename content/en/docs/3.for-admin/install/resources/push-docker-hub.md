# How to push to Docker Hub using GitHub Actions

An example of how to push to Docker Hub using Github Actions can be found on the original repository in the file [/.github/workflows/docker.yml](https://github.com/misskey-dev/misskey/blob/develop/.github/workflows/docker.yml)

In the original workflow when a new release happens, it will be pushed to Docker Hub with the `latest` and `<release name>` tags.\
\
\
※ Docker Hub may have a tag like `<branch name>`, but those tags are not automatically pushed.\
\
\
※ Docker Hub may have a tag like `<branch name>`, but those tags are not automatically pushed.\
\
\
※ Docker Hub may have a tag like `<branch name>`, but those tags are not automatically pushed.

Executing this workflow in a fork will fail.

In the following information, we describe how to make the Fork push to its own Docker Hub repository.

## How to set up a workflow to push to your own Docker Hub repository

1. Create a repository on Docker Hub.
2. Replace the [image mentions in the workflow file](https://github.com/misskey-dev/misskey/blob/53f3b779bf16abcda4f6e026c51384f3b8fbcc62/.github/workflows/docker.yml#L20) with the name of the repository you created.
3. Create two [encrypted secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-encrypted-secrets-for-a-repository) on GitHub.\
   Create two [encrypted secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-encrypted-secrets-for-a-repository) on GitHub.\
   \
   You need to create `DOCKER_USERNAME` and `DOCKER_PASSWORD`, which are the Docker Hub username and password, respectively.\
   Create two [encrypted secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-encrypted-secrets-for-a-repository) on GitHub.\
   \
   You need to create `DOCKER_USERNAME` and `DOCKER_PASSWORD`, which are the Docker Hub username and password, respectively.

## How to push

The default settings in the workflow will automatically push to Docker Hub upon a new release.\
\
Specifically, when a release is made using GitHub's release function it is pushed to Docker Hub with the tags `latest` and `<release name>`\
The default settings in the workflow will automatically push to Docker Hub upon a new release.\
\
Specifically, when a release is made using GitHub's release function it is pushed to Docker Hub with the tags `latest` and `<release name>`\
\
Specifically, when a release is made using GitHub's release function it is pushed to Docker Hub with the tags `latest` and `<release name>`

You can also push manually from GitHub.\
You can also push manually from GitHub.\
You can also push manually from GitHub.\
\
To do so, go to Actions => Publish Docker image => Run workflow and then select a branch.\
\
However doing this will make it push with a tag labeled as `<branch name>`.\
\
However doing this will make it push with a tag labeled as `<branch name>`.\
\
However doing this will make it push with a tag labeled as `<branch name>`.

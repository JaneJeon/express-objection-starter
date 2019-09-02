#!/usr/bin/env sh
# see: https://v1.vuepress.vuejs.org/guide/deploy.html#github-pages

GH_USER=JaneJeon
GH_REPO=express-objection-starter

# abort on errors
set -e

# build
yarn docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f "git@github.com:$GH_USER/$GH_USER.github.io.git" master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f "git@github.com:$GH_USER/$GH_REPO.git" master:gh-pages

cd -

#!/bin/bash
set -e

colorRed=$'\e[1;31m'
colorGreen=$'\e[1;32m'
colorYellow=$'\e[1;33m'
colorBlue=$'\e[1;34m'
colorMagenta=$'\e[1;35m'
colorCyan=$'\e[1;36m'
colorEnd=$'\e[0m'

function readVersion {
  version=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g' \
    | tr -d '[[:space:]]')
}

function approveBump {
  # Lint project
  gulp lint

  # No errors; proceed
  readVersion
  printf "\n${colorGreen}READY TO START RELEASE${colorEnd}\n"
  printf "Current Version: ${colorMagenta}${version}${colorEnd}\n\n"
}

function promptVersion {
  read -p "Enter new semantic version: " newVersion

  # Ensure something was entered
  if [ -z "$newVersion" ]; then
    printf "\n${colorRed}/!\ NO VERSION SUPPLIED. EXITING.${colorEnd}\n"
    help
    exit
  fi
}

function bumpPackageJson {
	npm version $newVersion --no-git-tag-version
  readVersion
  git add .
  git commit -m "Bumped version to ${version}"
}

function startRelease {
  git checkout develop
  git pull origin develop
  git push origin develop
  git flow release start $version
}

# Check for unstaged commits
if [ -d ".git" ]; then
	changes=$(git status --porcelain)

	if [ -z "${changes}" ]; then
    approveBump
    promptVersion
    startRelease
  	bumpPackageJson
	else
		echo "Please commit staged files prior to bumping"
	fi
fi

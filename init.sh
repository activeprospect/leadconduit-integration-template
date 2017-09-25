#!/usr/bin/env bash

USAGE="$0: Usage is: $0 ServiceBeingIntegrated"

if [ -z "$1" ]
then
  echo $USAGE
  exit 3
fi

SERVICE_NAME=$1 # this should have right capitalization, e.g., "SendGrid"
SERVICE_NAME_LOWER=`echo $SERVICE_NAME | awk '{print tolower($0)}'`

TARGET_DIR=../leadconduit-integration-$SERVICE_NAME_LOWER

if [ -d "$TARGET_DIR" ]
then
  echo "$0: Target directory '$TARGET_DIR' already exists; exiting"
  echo $USAGE
  exit 2
fi

mkdir "$TARGET_DIR"
if [ $? -ne 0 ]
then
  echo "$0: Error creating directory '$TARGET_DIR'"
  echo $USAGE
  exit 3
fi

cd "$TARGET_DIR"
git init
echo > README.md
git add README.md
git commit -m"initialize repo"
git checkout -b init

cd -

FILES=".gitignore .npmignore .npmrc .travis.yml CHANGELOG.md docs index.js lib package.json test"
for FILE in $FILES
do
  cp -vr "$FILE" "$TARGET_DIR/"
done

# copy modified README
sed -n '/^# LeadConduit.*Integration$/,$p' README.md | sed "s/service_being_integrated/$SERVICE_NAME_LOWER/g" | sed "s/Service_Being_Integrated/$SERVICE_NAME/g" > "$TARGET_DIR/README.md"

# copy modified package.json
sed "s/service_being_integrated/$SERVICE_NAME_LOWER/g" package.json | sed "s/Service_Being_Integrated/$SERVICE_NAME/g" > "$TARGET_DIR/package.json"

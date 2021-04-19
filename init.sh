#!/usr/bin/env bash

USAGE="$0: Usage is: $0 ServiceBeingIntegrated"
FILES=".github .gitignore .npmignore .npmrc CHANGELOG.md docs index.js lib package.json test"

if [ -z "$1" ]
then
  echo $USAGE
  exit 3
fi

# make sure all the files are here (& we're running this from the right place)
for FILE in $FILES
do
  if [ ! -e "$FILE" ]
  then
    echo "$0: File '$FILE' not found"
    echo "$0: This script must be run from the template repo directory"
    exit 8
  fi
done

SERVICE_NAME=$* # this should have right capitalization and spacing, e.g., "Amazon Web Services"
SERVICE_NAME_LOWER=`echo $SERVICE_NAME | awk '{gsub(/ /, "-"); print tolower($0)}'`

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

for FILE in $FILES
do
  if [ -e "$TARGET_DIR/$FILE" ]
  then
    echo "Error: '$TARGET_DIR/$FILE' already exists. Halting."
    echo $USAGE
    exit 5
  fi
  cp -vr "$FILE" "$TARGET_DIR/"
done

# copy modified README
sed -n '/^# LeadConduit.*Integration$/,$p' README.md | sed "s/service_being_integrated/$SERVICE_NAME_LOWER/g" | sed "s/Service_Being_Integrated/$SERVICE_NAME/g" > "$TARGET_DIR/README.md"

# copy modified package.json
sed "s/service_being_integrated/$SERVICE_NAME_LOWER/g" package.json | sed "s/Service_Being_Integrated/$SERVICE_NAME/g" > "$TARGET_DIR/package.json"

# copy modified outbound w/vars

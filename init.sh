#!/usr/bin/env bash

USAGE="$0: Usage is: $0 ServiceBeingIntegrated"

if [ -z "$1" ]
then
  echo $USAGE
  exit 3
fi

MANIFEST=./init_files.txt
if [ ! -f $MANIFEST ]
then
  echo "$0: File '$MANIFEST' not found"
  echo "$0: This script must be run from the template repo directory"
  exit 8
fi

SERVICE_NAME=$* # this should have right capitalization and spacing, e.g., "Amazon Web Services"

# name in kebab-case: 'amazon-web-services'
SERVICE_NAME_KEBAB=`echo $SERVICE_NAME | awk '{gsub(/ /, "-"); print tolower($0)}'`

# name in snake_case: 'amazon_web_services'
SERVICE_NAME_SNAKE=`echo $SERVICE_NAME_KEBAB | sed 's/-/_/g'`

TARGET_DIR=../leadconduit-integration-$SERVICE_NAME_KEBAB

copy_it() {
  IT="$1"

  if [ -e "$TARGET_DIR/$IT" ]
  then
    echo "Error: '$TARGET_DIR/$IT' already exists. Halting."
    exit 5
  fi

  echo "$IT -> $TARGET_DIR/$IT"

  if [ -d $IT ]
  then
    # if it's a directory, mkdir
    mkdir -p "$TARGET_DIR/$IT"
  elif [ "$IT" = "lib/ui/public/images/icon.png" ]
  then
    # can't sed a PNG
    cp -p "$IT" "$TARGET_DIR/$IT"
  else
    # if it's a file, copy it, with text substitutions
    sed "s/service_being_integrated/$SERVICE_NAME_SNAKE/g" "${IT}" | \
      sed "s/Service_Being_Integrated/$SERVICE_NAME/g" | \
      sed "s/service-being-integrated/$SERVICE_NAME_KEBAB/g" > "$TARGET_DIR/${IT}"
  fi

  # special case rename
  if [ $IT = "README2.md" ]
  then
    mv "$TARGET_DIR/$IT" "$TARGET_DIR/README.md"
  fi
}

# prompt about a group of files, copy and return 1 if "y"
prompt_and_copy() {
  PROMPT="$1"
  TAG="$2"
  read -p "$PROMPT (Y/n) " ANSWER

  if [ "$ANSWER" = "" -o "$ANSWER" = "y" -o "$ANSWER" = "Y" ]
  then
    for FILE in `grep ",${TAG}" $MANIFEST`
    do
      FILE=`echo $FILE | cut -d',' -f1`
      copy_it "$FILE"
    done
    return 1
  fi
  return 0
}

strip_dependencies() {
  for dep in $*
  do
    grep -v "\"$dep\": " $TARGET_DIR/package.json > $TARGET_DIR/package.tmp
    mv $TARGET_DIR/package.tmp $TARGET_DIR/package.json
  done
}

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
git branch -M master # AP standard, vs. git default of 'main'
echo > README.md
git add README.md
git commit -m"initialize repo"
git checkout -b init

# back to the template directory
cd -

# always copy entries in the manifest that have no comma
for FILE in `grep -v , $MANIFEST`
do
  copy_it "$FILE"
done

# start index.js
echo "module.exports = {" > $TARGET_DIR/index.js

##
## Inbound?
##
prompt_and_copy "Will this integration receive INBOUND leads?" inbound
if [ $? -eq 1 ]
then
  # update index.js
  echo -e "  inbound: {\n    request_response: require('./lib/inbound/request_response')\n  }," >> $TARGET_DIR/index.js
fi

##
## Rich UI?
##
prompt_and_copy "Will this integration have a UI?" ui
if [ $? -eq 1 ]
then
  echo "  ui: require('./lib/ui')," >> $TARGET_DIR/index.js

  ##
  ## API-backing for the rich UI?
  ##
  # only ask this if the answer to UI was yes
  prompt_and_copy "Will the UI need a backend API?" apiui
  if [ $? -eq 0 ]
  then
    # a UI but with no backend API
    strip_dependencies axios body-parser
  fi

else
  # no UI - none of these dependencies are needed
  strip_dependencies \
    @activeprospect/integration-components \
    axios \
    body-parser \
    bson-objectid \
    express \
    leadconduit-integration-ui \
    vue \
    vue-router \
    vuex
fi

##
## Request/Response-style outbound?
##
prompt_and_copy "Will this integration send leads via REQUEST/RESPONSE functions?" reqres
if [ $? -eq 1 ]
then
  echo -e "  outbound: {\n    request_response: require('./lib/outbound/request_response')\n  }" >> $TARGET_DIR/index.js
  strip_dependencies request nock-nock
else
  ##
  ## Or handle-style outbound?
  ##
  # only ask if the answer to request/response was no
  prompt_and_copy "Will this integration send leads via a HANDLE function?" handle
  if [ $? -eq 1 ]
  then
    echo -e "  outbound: {\n    handle_style: require('./lib/outbound/handle')\n  }" >> $TARGET_DIR/index.js
  fi
fi

# finish index.js
echo "};" >> $TARGET_DIR/index.js

exit 0

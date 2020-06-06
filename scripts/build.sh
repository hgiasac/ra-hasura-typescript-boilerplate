#! /bin/bash

function load_env {
  ENV_PATH=".env"
  echo "load environment at $ENV_PATH"

  if [ -f "$ENV_PATH" ]; then
    # Load Environment Variables
    export $(cat $ENV_PATH | grep -v '#' | awk '/=/ {print $1}')
  fi

  if [ -z $DATA_DOMAIN ]; then 
    echo "Environment isn't succesfully loaded. Did you copy 'dotenv' file to '.env' and set variables?"
    exit 1
  fi
}

case "$1" in
  prod)
    echo "building production code..."
    load_env
    npm run build:prod
    ;;
  ci*)
    echo "building unoptimized code on CI environment..."
    npm run build
    ;;
  ci-prod)
    echo "building production code on CI environment..."
    npm run build:prod
    ;;
  *)
    echo "building unoptimized code..."
    load_env
    npm run build
  ;;
esac

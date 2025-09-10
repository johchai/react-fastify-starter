#!/bin/bash

echo "Which environment do you want to run? (prod/dev)"
read ENV

if [ "$ENV" == "prod" ]; then
  FILE="docker-compose.prod.yml"
  PROJECT="react-fastify-starter-prod"
  CMD="docker compose -f $FILE -p $PROJECT up -d --build"
  ENV_FILES="-e .env.base -e .env.docker"
elif [ "$ENV" == "dev" ]; then
  FILE="server/docker-compose.dev.yml"
  PROJECT="react-fastify-starter-dev"
  CMD="docker compose -f $FILE -p $PROJECT up -d --build"
  ENV_FILES="-e .env.base -e .env.local"
else
  echo "Invalid option. Please choose 'prod' or 'dev'."
  exit 1
fi

echo "Running: $CMD"
$CMD

if [ $? -eq 0 ]; then
  echo "Docker started successfully. Running Prisma migration..."
  (
    cd server || exit 1
    npx dotenv $ENV_FILES -- npx prisma migrate dev --name init

    echo "Do you want to run the seed script? (y/n)"
    read SEED

    if [ "$SEED" == "y" ] || [ "$SEED" == "Y" ]; then
      echo "Running seed script..."
      npx dotenv $ENV_FILES -- npx tsx prisma/seed.ts
    else
      echo "Skipping seed script."
    fi
  )
else
  echo "Docker failed. Aborting."
  exit 1
fi
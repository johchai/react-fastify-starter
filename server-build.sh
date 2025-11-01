#!/bin/bash

echo "Which environment do you want to run? (prod/dev)"
read ENV

# Step 1: Prepare environment files
echo "Setting up environment files..."
cd server || exit 1

for FILE in .env.base .env.docker .env.local; do
  if [ ! -f "$FILE" ] && [ -f "$FILE.example" ]; then
    cp "$FILE.example" "$FILE"
    echo "Created $FILE from $FILE.example"
  elif [ -f "$FILE" ]; then
    echo "$FILE already exists. Skipping."
  else
    echo "Warning: Missing $FILE.example — cannot create $FILE"
  fi
done

cd ..

# Step 2: Build shared types
# echo "Building shared types package..."
# cd packages/types || exit 1
# npm run build
# if [ $? -ne 0 ]; then
#   echo "Type build failed. Aborting."
#   exit 1
# fi
# cd ../..

# Step 3: Determine environment config
if [ "$ENV" == "prod" ]; then
  echo "⚠️  Production mode is not supported yet. Please use 'dev' instead."
  exit 1
# if [ "$ENV" == "prod" ]; then
#   FILE="docker-compose.prod.yml"
#   PROJECT="react-fastify-starter-prod"
#   CMD="docker compose -f $FILE -p $PROJECT up -d --build"
#   ENV_FILES="-e .env.base -e .env.docker"
elif [ "$ENV" == "dev" ]; then
  FILE="server/docker-compose.dev.yml"
  PROJECT="react-fastify-starter-dev"
  CMD="docker compose -f $FILE -p $PROJECT up -d --build"
  ENV_FILES="-e .env.base -e .env.local"
else
  echo "Invalid option. Please choose 'prod' or 'dev'."
  exit 1
fi

# Step 4: Run Docker
echo "Running: $CMD"
$CMD

if [ $? -eq 0 ]; then
  echo "Docker started successfully. Running Prisma migration..."
  (
    cd server || exit 1
    npx dotenv $ENV_FILES -- npx prisma migrate dev --name init
    if [ $? -ne 0 ]; then
      echo "❌ Prisma migration failed. Skipping seed script."
      exit 1
    fi

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
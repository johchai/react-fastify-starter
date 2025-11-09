#!/bin/bash
set -e

echo "Which environment do you want to run? (prod/dev)"
read ENV

# Step 1: Prepare environment files
echo "Setting up environment files..."
cd server || exit 1

for FILE in .env; do
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

# Step 2: Determine environment config
if [ "$ENV" == "prod" ]; then
  FILE="server/docker-compose.prod.yml"
  PROJECT="react-fastify-starter-prod"
  CMD="docker compose -f $FILE -p $PROJECT up -d --build"
elif [ "$ENV" == "dev" ]; then
  FILE="server/docker-compose.dev.yml"
  PROJECT="react-fastify-starter-dev"
  CMD="docker compose -f $FILE -p $PROJECT up -d --build"
else
  echo "Invalid option. Please choose 'prod' or 'dev'."
  exit 1
fi

# Step 3: Run Docker
echo "Running: $CMD"
$CMD

if [ $? -eq 0 ]; then
  echo "Docker started successfully."
  
  # Step 4: Database setup
  (
    cd server || exit 1
    
    if [ "$ENV" == "prod" ]; then
      echo "Pushing Prisma schema to production database..."
      npx prisma db push
      
      if [ $? -eq 0 ]; then
        echo "✅ Prisma db push completed successfully."
      else
        echo "❌ Prisma db push failed."
        exit 1
      fi

    elif [ "$ENV" == "dev" ]; then
      echo "Running Prisma migration (development)..."
      npx prisma migrate dev --name init
      
      if [ $? -ne 0 ]; then
        echo "❌ Prisma migration failed. Skipping seed script."
        exit 1
      fi
    fi
    
    # Prompt for seed in both environments
    echo "Do you want to run the seed script? (y/n)"
    read SEED

    if [[ "$SEED" =~ ^[Yy]$ ]]; then
      echo "Running seed script..."
      npx tsx prisma/seed.ts
      if [ $? -eq 0 ]; then
        echo "✅ Seed completed successfully."
      else
        echo "❌ Seed script failed."
      fi
    else
      echo "Skipping seed script."
    fi
  )
  
  echo "✅ Setup complete!"
else
  echo "❌ Docker failed to start. Aborting."
  exit 1
fi
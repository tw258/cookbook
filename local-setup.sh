#!/bin/bash

ORANGE='\033[0;33m'
NC='\033[0m' # Reset

if ! command -v node -v &> /dev/null
then
    printf "${ORANGE}node${NC} could not be found on your system...exiting\n"
    exit
fi

if ! command -v npm -v &> /dev/null
then
    printf "${ORANGE}npm${NC} could not be found on your system...exiting\n"
    exit
fi

if ! command -v docker -v &> /dev/null
then
    printf "${ORANGE}docker${NC} could not be found on your system...exiting\n"
    exit
fi

printf "(1/3) Creating '.env' file..."

if ! test -f ".env"; then
    cat .env.example | sed -r '/^\s*$/d' | grep -v '^#' > .env
    printf "\xE2\x9C\x94\n"
    printf "      ${ORANGE}- Please add your credentials to '.env'!${NC}\n"

else 
    printf "\xE2\x9C\x94\n"
    echo "      - File already exists, skipping this step"
fi

printf "(2/3) Installing backend dependencies..."
cd backend
npm install --force --silent > /dev/null 2>&1
printf "\xE2\x9C\x94\n"
cd ..


printf "(3/3) Installing frontend dependencies..."
cd frontend
npm install --force --silent > /dev/null 2>&1
printf "\xE2\x9C\x94\n"
cd ..
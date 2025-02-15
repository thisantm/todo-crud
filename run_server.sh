#!/bin/bash

cd server

if [ ! -d "node_modules" ]; then
  npm install
fi

npm run dev

#!/bin/bash

cd client

if [ ! -d "node_modules" ]; then
  npm install
fi

npm run dev

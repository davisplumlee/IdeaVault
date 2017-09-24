# Idea Vault

## Overview
Web app that serves as a discussion board for ideas between devs and designers.

## Deployment

1. ```dotnet restore```
1. ```npm i```
1. ```node node_modules/webpack/bin/webpack.js --config webpack.config.vendor.js --env.prod```
1. ```node node_modules/webpack/bin/webpack.js --env.prod```
1. ```dotnet run```
# Campus Connect web app monorepo
This monorepo contains frontend and admin-frontend packages.

## Packages
* root_dir : ./packages
* admin-frontend
* frontend

## Environment
You need to set up the environment before running the frontends
1. Create a `.env` file in the root turborepo workspace
2. Add `NEXT_PUBLIC_API_URL` and set its value to the backend url. If no changes were made to the Spring MVC backend, just set its value to `http://localhost:8080`
3. Add `NEXT_PUBLIC_ADMIN_APIKEY` and set its value to the `admin.apikey` property found in  `application.properties` of the Spring MVC backend

## Usage

1. suggested node version __16.17.0__ 
2. run ```npm install```
3. To run both admin and app run ```npm run dev```
4. To run admin only, run ```npm run dev:admin```
5. To run app only, run ```npm run dev:app```
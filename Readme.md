# Setup

## 1. Local Environment Setup

To setup environment variables, run these commands:
```shell
cp ./fcv-be/.env.example ./fcv-be/.env # Backend env file setup
cp ./fcv-fe/.env.example ./fcv-fe/.env # Frontend env file setup
```

## 2. Building Containers and Starting up

To build the containers, run this command:

```shell
docker compose up -d
```

This should build the images and run containers

## 3. Seeding users

To create users, run this command:

```shell
docker compose exec backend npm run seed
```

This command will seed 3 dummy users:
- test1@test.com
- test2@test.com
- test3@test.com

Password: `testtest` 

## 4. Accessing the Site

Go to http://localhost:3001 to access the web application.

To sign in, you can use any of the 3 users created by step 3.

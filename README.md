# SkySpecs Code Sample - Starter Repo

Welcome to the SkySpecs Code Sample starter repo! 

We’ve created a code sample repository to help avoid any initial trouble with getting a project started, allowing you to focus on the important aspects of this exercise. The technologies we chose represent what our team frequently works with, such as React and Express.js. Feel free to swap these tools out with options that you are most comfortable if you believe you can shine best using something different.

Please direct any questions regarding this exercise to the SkySpecs recruiter you've been working with.

[SkySpecs_Code_Sample_Software_Engineer.pdf](https://drive.google.com/file/d/1vIrNPICCYwGIkfKBKEzn6uW5BWfnhLEr/view)

# Getting Started

## Prerequisites

- Node.js
- npm

[https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

- yarn ( optional )

[https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

## Installation

### Server

1. Navigate to the server directory

```bash
cd skyspecs-starter/server
```

2. Install necessary dependencies

```bash
npm i
```

or 

```bash
yarn
```

3. Run the application

```bash
npm run start
```

or 

```bash
yarn start
```

#### Database

A quick way to get a database instance running:

1. Install [docker](https://www.docker.com/)
2. Run an instance of the official postgres docker image (and expose the port for connecting to it)
```bash
docker run --name my-pg -p 5432:5432 -e POSTGRES_PASSWORD=superSecretPassword -d postgres
```
3. (Optional) Verify the instance is running
```bash
docker ps # (You should see your instance named my-pg in the output)
```
4. You should now be able to connect to your database using the connection string: `postgresql://postgres:superSecretPassword@localhost:5432/postgres`

### Client

1. Navigate to the client directory. If you’re already in the server directory:

```bash
cd ../client
```

otherwise:

```bash
cd skyspecs-starter/server
```

1. Install necessary dependencies

```bash
npm i
```

or 

```bash
yarn
```

2. Run the application

```bash
npm run start
```

or 

```bash
yarn start
```

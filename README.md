
# Nft Collection

---

## Getting Started

These instructions will guide you through setting up and running the NFT Collection project locally.

---

## Step 1: Setting up Dependencies

1. Navigate to the root folder of the project.

2. Run the following command to start the PostgreSQL database using Docker:

   ```bash
   docker-compose up -d
   ```
    >  This command launches the necessary services in the background.

---

## Step 2: Setting up API

Create a .env file and populate it with the required environment variables. Refer to the .env.example file for the necessary configuration values, check for .env.example file in the root folder of the project for reference.

Install the project dependencies by running the following command:

```bash
npm install
```

After the dependencies are installed, generate the Prisma client by executing the following command:

```bash
npx prisma generate
```

Once the Prisma client is generated, run the database migrations using the following command:

```bash
npx prisma migrate deploy
```

Start the API in development mode:

```bash
npm run dev
```

---

## Step 3: Ready to go!

The NFT-Collection API is now running and accessible locally.

You can access the API at http://localhost:3000/swagger to view the API documentation.

**change the port number in the .env file if you want to run the API on a different port.**

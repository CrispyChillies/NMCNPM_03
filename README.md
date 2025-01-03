# NMCNPM_03

An e-commerce website for selling video games

## How To Run

### Prerequisites

1. [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio)
3. [Node.js](https://nodejs.org/) (Ensure you have npm installed)

### Step 1: Initialize Docker Image

1. Clone the repository:

```sh
git clone https://github.com/your-repo/game-market.git
cd game-market
```

2. Run Docker Compose to initialize the Docker image:

```sh
docker-compose up -d
```

### Step 2: Set Up the Database

1. Open Azure Data Studio.
2. Connect to your SQL Server instance.
3. Open the `init.sql` script located at `init.sql`.
4. Execute the script to create and set up the `gamemarket` database.

### Step 3: Run the Backend

1. Navigate to the backend folder:

```sh
cd backend
```

2. Install the dependencies:

```sh
npm install
```

3. Start the backend server, specifying the port you want to run at:

```sh
npm start -- --port=<PORT>
```

4. Access the backend API at `http://localhost:<PORT>`.

### Step 4: Run the Frontend

1. Navigate to the frontend folder:

```sh
cd gamemarket
```

2. Install the dependencies:

```sh
npm install
```

3. Start the frontend server:

```sh
npm run dev
```

4. Access the frontend at `http://localhost:6969`.

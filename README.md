# Weather App API (NestJS + Prisma)

A RESTful API built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/) to manage user authentication, location search, weather forecasts, and user-saved locations. It integrates with a third-party weather API and uses MySQL as the database.

## Features

- JWT-based authentication (Login, Register)
- Location search and forecast using external weather API
- Users can save and delete locations
- Background processing using BullMQ and Redis
- Prisma ORM with MySQL support

---

## Technologies Used

- **NestJS** – Scalable Node.js framework
- **Prisma** – Type-safe ORM for database access
- **Passport.js** – Authentication middleware
- **BullMQ** – Job queue for background tasks
- **MySQL** – Primary relational database
- **Redis** – Message broker for BullMQ

---

## Getting Started

### Prerequisites

- Node.js
- MySQL database
- Redis server (for job queue)
- Weather API key (WeatherAPI.com)

### TODOS on fresh install:

- Install node via [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating).

- Install PNPM

```
corepack enable pnpm
```

- Install dependencies

```
pnpm i
```

- run migration for prisma

```
npx prisma migrate dev
```

- run the project

```
pnpm run start:dev
```

---

### Environment Variables

Create a `.env` file with the following:

```env
WEATHER_API_KEY=your_weather_api_key
WEATHER_API_URL=https://api.weatherapi.com/v1
PORT=free_port_on_local_host
DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your_jwt_secret
QUEUE_HOST=localhost
REDIS_PORT=free_port_on_local_host
```

---

## 📁 Project Structure

```bash
.
├── prisma
│   ├── migrations/                    # Prisma database migrations
│   └── schema.prisma                  # Prisma schema with models (User, Location, etc.)

├── src
│   ├── app.module.ts                  # Root module combining all submodules

│   ├── authentication/               # Handles user registration and login
│   │   ├── auth.controller.ts         # Auth endpoints: /register, /login
│   │   ├── auth.module.ts             # Auth module definition
│   │   ├── auth.service.ts            # Auth logic and JWT generation
│   │   ├── decorators/
│   │   │   └── getCurrentUser.decorator.ts   # Custom decorator to extract user from request
│   │   ├── dto/
│   │   │   └── register.dto.ts        # DTO for user registration
│   │   ├── errors/
│   │   │   └── authentication.error-codes.enum.ts  # Error codes for auth issues
│   │   ├── guards/
│   │   │   ├── jwt-authentication.guard.ts # JWT auth guard for protected routes
│   │   │   └── local-authentication.guard.ts # Guard for local strategy (login)
│   │   └── strategies/
│   │       ├── jwt.strategy.ts       # JWT token validation logic
│   │       └── local.strategy.ts     # Local auth logic for login

│   ├── general/
│   │   └── dto/
│   │       └── paginated-query.dto.ts # Reusable DTO for pagination queries

│   ├── location/                      # Location logic (search, list, delete)
│   │   ├── dto/
│   │   │   ├── get-locations.dto.ts   # DTO for filtering locations
│   │   │   └── location.dto.ts        # DTO for creating locations
│   │   ├── errors/
│   │   │   └── location.error-codes.enum.ts # Location-specific error codes
│   │   ├── location.consumer.ts      # Event-based consumer (for queues)
│   │   ├── location.controller.ts    # API endpoints for locations
│   │   ├── location.module.ts        # Module wrapper
│   │   ├── location.service.ts       # Business logic
│   │   └── repositories/
│   │       └── location.repository.ts # DB logic for locations

│   ├── main.ts                        # Entry point of the app

│   ├── prisma/
│   │   ├── prisma.module.ts          # Prisma module
│   │   └── prisma.service.ts         # PrismaService extending PrismaClient

│   ├── user-saved/                   # Module for saving user’s favorite locations
│   │   ├── dto/
│   │   │   ├── get-user-saved-location.dto.ts # DTO for filtering saved locations
│   │   │   └── user-saved-location.dto.ts     # DTO for creating/updating saved location
│   │   ├── errors/
│   │   │   └── user-saved-locations.error-codes.enum.ts # Custom errors
│   │   ├── repositories/
│   │   │   └── user-saved-location.repository.ts # DB access logic
│   │   ├── user-saved.controller.ts  # Endpoints to manage saved locations
│   │   ├── user-saved.module.ts      # Module setup
│   │   └── user-saved.service.ts     # Business logic

│   └── weather/                      # Weather-related logic and API integration
│       ├── dto/
│       │   ├── forecast.dto.ts       # DTO for forecast responses
│       │   └── search.dto.ts         # DTO for city search queries
│       ├── errors/
│       │   └── weather.error-codes.enum.ts # Error codes related to weather API
│       ├── helper/
│       │   └── data-formatter.helper.ts # Data formatting helpers
│       ├── interfaces/
│       │   ├── *.interface.ts        # Typed interfaces for API responses (location, forecast, etc.)
│       │   └── general.ts            # General/shared types
│       ├── services/
│       │   └── weather-api.service.ts # Service to fetch weather data from external API
│       ├── weather.controller.ts     # Weather endpoints (search, forecast)
│       ├── weather.module.ts         # Module wrapper
│       └── weather.service.ts        # Business logic and transformation

├── .env.test                         # Environment variables for test env
├── .gitignore                        # Git ignored files
├── .prettierignore                   # Prettier ignored files
├── .prettierrc                       # Prettier config
├── eslint.config.mjs                 # ESLint configuration
├── nest-cli.json                     # NestJS CLI config
├── package.json                      # Dependencies and scripts
├── pnpm-lock.yaml                    # Lockfile for pnpm
├── README.md                         # Project documentation
├── tsconfig.build.json               # TypeScript config for builds
└── tsconfig.json                     # Global TypeScript configuration
```

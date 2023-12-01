# Microfin

## Description

An application using microservices patterns, JWT authentication, SOLID, DDD and Clean Arch to simulate monetary transactions between accounts.

## How it works

_All data is synchronized with the both microservices using messages (RabbitMQ)._

- Account is created by HTTP API request
- The account must increase the amount and this amount is synchronized
- When create a transaction, the transaction status is **PENDING**
- When a transaction is processed, the status is updated to **COMPLETED** or **REFUSED**
- Account can see all transactions (received and sent)

## Techs

- Node.js
- Typescript
- Express
- Prisma
- Postgres
- RabbitMQ
- Nginx
- Docker
- Redis

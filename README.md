# Task Tracker — Dockerized Application on AWS EC2

A full-stack Task Tracker application built with the MEAN stack and containerized using Docker. This project demonstrates full-stack development, containerization, cloud deployment, environment configuration, and application troubleshooting.

## Project Overview

The Task Tracker allows users to manage tasks through an Angular frontend connected to a Node.js and Express REST API, with MongoDB for data persistence.

The application is developed and containerized locally, with AWS EC2 deployment as the next stage of the project.

## Technology Stack

- **Frontend:** Angular, TypeScript, HTML, CSS, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose
- **Cloud Platform:** AWS EC2
- **Operating System:** Ubuntu Linux
- **Version Control:** Git and GitHub

## Architecture

```text
              User / Browser
                    |
                    v
             Angular Frontend
             Docker Container
                    |
                    v
             Node.js / Express
              REST API Backend
             Docker Container
                    |
                    v
                 MongoDB
              Database Layer

       AWS EC2 — Deployment Environment
```

The frontend communicates with the backend through REST API endpoints. The backend connects to MongoDB to store and retrieve task data.

## Features

- Create, view, update, and manage tasks
- Angular frontend integrated with a REST API
- Node.js and Express backend
- MongoDB database integration
- Docker-based application containerization
- Docker Compose for managing local services
- Environment-based application configuration
- AWS EC2 deployment and troubleshooting *(in progress)*

## Project Structure

```text
task-tracker-aws-docker/
├── frontend/
│   ├── Dockerfile
│   └── Angular application files
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── Node.js application files
├── docker-compose.yml
├── .gitignore
└── README.md
```

*The structure above is illustrative; adjust it to match the actual files in your repository.*

## Run Locally with Docker

### Prerequisites

- Git
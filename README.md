# Temperature Monitoring Web Application

![Temperature Monitoring](https://img.shields.io/badge/temperature-monitoring-green)

A web application for monitoring temperature data collected from a Raspberry Pi. This application allows users to view, edit, and delete temperature records. The backend is built with Flask and PostgreSQL, and the frontend is a simple HTML page served by Nginx. The entire application is containerized using Docker.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- Collect temperature data from a Raspberry Pi
- Display temperature data in a user-friendly web interface
- Edit and delete temperature records from the frontend
- Containerized using Docker for easy deployment

## Architecture

```plaintext
+-----------------+        +-------------+        +----------------+
| Raspberry Pi    |        | EC2 Instance|        | PostgreSQL RDS |
| (Data Source)   |        | (Frontend   |        | (Database)     |
|-----------------|------->| & Backend)  |------->|                |
| Python Script   |        | Flask       |        |                |
+-----------------+        | Nginx       |        +----------------+
                           +-------------+


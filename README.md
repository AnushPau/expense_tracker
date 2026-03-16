FinanceYou

FinanceYou is a full-stack expense tracking web application that allows users to record, manage, and analyze their personal spending.
The application is built using Node.js, Drizzle ORM, Neon PostgreSQL, and deployed on Vercel using serverless functions.

🌐 Live App: https://financeyou.site

Table of Contents

Background

Install

Usage

Architecture

Tech Stack

Contributing

License

Background

Managing personal finances requires clear visibility into daily spending. Many individuals struggle to track expenses effectively without structured tools.

FinanceYou was built to explore modern full-stack development practices while solving a real-world problem: helping users understand where their money goes.

The project demonstrates how a serverless architecture combined with modern database tooling can create scalable financial applications.

Install

Clone the repository:

git clone https://github.com/AnushPau/expense_tracker.git
cd expense_tracker

Install dependencies:

npm install

Create an environment file:

DATABASE_URL=your_neon_database_connection_string
Usage

Run the development server:

npm run dev

Open the application:

http://localhost:3000

The app allows users to:

Add expenses

Delete expenses

View transaction history

Store financial data in a cloud database

Architecture
User Browser
     |
     v
FinanceYou Web App (Frontend)
     |
     v
Vercel Serverless API (Node.js)
     |
     v
Drizzle ORM
     |
     v
Neon PostgreSQL Database

The system uses a serverless backend architecture where API endpoints run as Vercel functions and interact with a Neon PostgreSQL database using Drizzle ORM.

Tech Stack

Frontend

JavaScript

HTML

CSS

Backend

Node.js

Vercel Serverless Functions

Database

Neon PostgreSQL

ORM

Drizzle ORM

Deployment

Vercel

Contributing

Feel free to contribute improvements or new features.

Fork the repository

Create a feature branch

Submit a pull request

License

MIT License

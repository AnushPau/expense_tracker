# FinanceYou

### Modern Personal Finance & Expense Tracking Platform

Live Application: https://financeyou.site

FinanceYou is a modern full-stack expense tracking application that helps users record, organize, and analyze their personal spending.

The platform demonstrates how modern web technologies can be used to build scalable financial applications using a serverless architecture.

---

## Tech Stack

Backend: Node.js  
Database: Neon PostgreSQL  
ORM: Drizzle ORM  
Deployment: Vercel Serverless Functions

---

## Features

- Add expenses
- Delete expenses
- View transaction history
- Persistent cloud database storage
- Serverless backend architecture
- Clean and responsive user interface

---

## System Architecture

```
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
```

FinanceYou uses a **serverless backend architecture** deployed on Vercel.  
The backend communicates with a Neon PostgreSQL database using Drizzle ORM.

---

## Running Locally

### Clone repository

```bash
git clone https://github.com/AnushPau/expense_tracker.git
cd expense_tracker
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

```
DATABASE_URL=your_neon_database_connection_string
```

### Start development server

```bash
npm run dev
```

Open the application:

```
http://localhost:3000
```

---

## Future Improvements

- Expense categories
- Spending analytics charts
- Budget tracking system
- User authentication
- AI financial insights
- Mobile responsive interface

---

## Author

Anush Paudel  
University of Texas at Arlington

GitHub: https://github.com/AnushPau

---

## License

MIT License

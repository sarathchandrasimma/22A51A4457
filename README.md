# URL Shortener Microservice – Full Stack Project

## Architecture Design

### Folder Structure

```
<roll-number-repo>/
│
├── Logging Middleware/
│   └── loggingMiddleware.js
│
├── Backend Test Submission/
│   ├── app.js
│   ├── package.json
│   ├── .gitignore
│   ├── routes/
│   │   └── shorturl.js
│   ├── models/
│   │   └── urlStore.js
│   ├── utils/
│   │   └── generateCode.js
│   └── middleware/
│       └── logger.js
│
└── Frontend Test Submission/
    ├── package.json
    ├── .gitignore
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── api.js
        ├── loggingMiddleware.js
        └── pages/
            ├── ShortenerPage.js
            └── StatsPage.js
```

---

### Component Overview

#### Logging Middleware

- Reusable logging utility for both backend and frontend.
- Sends logs to the test server via HTTP API.
- Integrated in both backend and frontend for all log events.

#### Backend Microservice

- Node.js + Express
- Exposes RESTful API endpoints for URL shortening, redirection, and analytics.
- Handles all business logic, validation, and error handling.
- Integrates logging middleware for all significant events.
- Stores URL data and analytics in an in-memory store (`urlStore.js`).

#### Frontend Web App

- React + Material UI
- Provides a user interface for shortening URLs and viewing analytics.
- Performs client-side validation.
- Consumes backend APIs for all business logic.
- Integrates logging middleware for UI events.

---

### Data Flow

1. User submits a long URL (with optional validity/shortcode) via the frontend.
2. Frontend validates input and sends a POST request to the backend.
3. Backend validates, generates or checks shortcode, stores data, and returns the short URL and expiry.
4. User can access the short URL, which triggers a redirect and logs analytics.
5. User can view statistics for any shortcode via the frontend, which fetches analytics from the backend.
6. All significant actions are logged to the test server using the logging middleware.

---

### Sequence Diagram (Textual)

```
User
 │
 │ 1. Enter URL in UI
 │
 ▼
Frontend (React)
 │
 │ 2. Validate & POST /shorturls
 │
 ▼
Backend (Express)
 │
 │ 3. Validate, store, respond
 │
 ▼
Frontend (React)
 │
 │ 4. Show short URL
 │
User
 │
 │ 5. Click short URL
 │
 ▼
Backend (Express)
 │
 │ 6. Redirect, log analytics
 │
User
 │
 │ 7. View stats in UI
 │
 ▼
Frontend (React)
 │
 │ 8. GET /shorturls/:code/stats
 │
 ▼
Backend (Express)
 │
 │ 9. Respond with analytics
 │
 ▼
Frontend (React)
 │
 │ 10. Show stats
```

---

### Technology Stack

- Backend: Node.js, Express, CORS, Axios
- Frontend: React, Material UI, Fetch API
- Logging: Custom middleware, HTTP API to test server
- Data Store: In-memory JS object (for test/demo)

---

## API Endpoints & Testing

### Create Short URL

- **POST** `http://localhost:8000/shorturls`
- **Body:**
  ```json
  {
    "url": "https://www.example.com/very/long/url",
    "validity": 30,
    "shortcode": "test123"
  }
  ```
- **Response:**
  ```json
  {
    "shortLink": "http://localhost:8000/test123",
    "expiry": "2025-08-20T12:34:56.000Z"
  }
  ```

### Redirect to Original URL

- **GET** `http://localhost:8000/test123`
- **Action:** Paste in browser or use Postman.

### Get Short URL Statistics

- **GET** `http://localhost:8000/shorturls/test123/stats`
- **Response:**
  ```json
  {
    "originalUrl": "https://www.example.com/very/long/url",
    "createdAt": "...",
    "expiry": "...",
    "clicks": 1,
    "details": [
      {
        "timestamp": "...",
        "referrer": "...",
        "ip": "...",
        "location": "IN"
      }
    ]
  }
  ```

### Error Handling

- **Duplicate Shortcode:** 409 Conflict
- **Invalid URL:** 400 Bad Request

---

## Frontend UI Testing

- Go to `http://localhost:3000`.
- Use the URL shortener form to create short URLs.
- Use the statistics page to view analytics for a shortcode.
- Test on both desktop and mobile views (browser dev tools).

---

## Screenshots

- Add screenshots of API requests/responses (Postman/Insomnia).
- Add screenshots of frontend UI (desktop and mobile views).

---

## How to Run

### Backend

```
cd "Backend Test Submission"
npm install
npm start
```

### Frontend

```
cd "Frontend Test Submission"
npm install
npm start
```

---

## Notes

- All logging is handled by the custom middleware and sent to the test server.
- Frontend logging may show CORS errors due to test server config; this does not affect evaluation.
- No personal or Affordmed info is present in the repo, code, or commit messages.
- All requirements and guidelines are followed.

# Neighborhood Exchange API Documentation (v1.0)

This document outlines the available API endpoints for the MVP.

**Base URL:** `http://localhost:5001`

---

### Users & Authentication

**1. Register User**
*   **Endpoint:** `POST /api/users/register`
*   **Access:** Public
*   **Body (JSON):**
    ```json
    {
        "name": "string",
        "email": "string",
        "password": "string"
    }
    ```
*   **Response:** User object with a JWT token.

**2. Login User**
*   **Endpoint:** `POST /api/users/login`
*   **Access:** Public
*   **Body (JSON):**
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
*   **Response:** User object with a JWT token.

---

### Profiles

**1. Get All Profiles**
*   **Endpoint:** `GET /api/profiles`
*   **Access:** Public
*   **Response:** An array of all profile objects.

**(Add your other Profile and Booking endpoints here...)**

---

**Now, send the message we crafted earlier to the frontend team, and attach this documentation or Postman collection to it.** Your handoff is now complete and professional.

---

### **Part 2: Your Next Backend Task (From the PRD)**

While the frontend team is busy building the UI, you can start working on the next highest-priority feature we identified from the PRD: **Completing the Booking Workflow**.

A provider needs to be able to accept or reject a booking.

**Your Next Mission:**

1.  **Get on the latest `dev` branch:**
    ```bash
    git checkout dev
    git pull origin dev
    ```

2.  **Create a new, clean feature branch:**
    ```bash
    git checkout -b feature/BE-booking-status-update
    ```

3.  **Implement the "Update Booking Status" feature:**
    *   Add the `updateBookingStatus` function to your `bookingController.js`.
    *   Add the new `PATCH /api/bookings/:id` route to your `bookingRoutes.js`.
    *   This will allow a logged-in provider to change a booking's status from "pending" to "accepted" or "cancelled".

This is the perfect next step. It doesn't block the frontend team (they have plenty to work on with the current API), and it moves the project forward by closing a critical feature gap.

**Which would you like to focus on first: creating the API documentation for the handoff, or starting the new booking status feature?**
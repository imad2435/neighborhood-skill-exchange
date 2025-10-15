# Neighborhood Skill & Service Exchange Platform (MVP Complete)

**Project Status: Live & Ready for Review!**

This repository contains the complete source code for the Neighborhood Skill & Service Exchange Platform. The Minimum Viable Product (MVP), including a real-time chat system, is now complete and all code has been merged into the `main` branch.

This application is built on the MERN stack and is designed to connect local service providers with neighbors who need their skills.

## Core Features
- **Dual User Roles:** Users can sign up as either a "Service Seeker" or a "Service Provider".
- **Secure Authentication:** Full user registration and login system using JWT for secure sessions.
- **Provider Discovery:** A public page where anyone can browse and search for providers.
- **Advanced Search:** Filter providers by skill and location.
- **Detailed Profiles:** Providers can create and edit detailed profiles showcasing their headline, skills, location, and rates.
- **Booking System:** A complete workflow allowing seekers to request bookings and providers to manage them (Accept/Decline).
- **Ratings & Reviews:** Seekers can leave reviews on completed jobs to build trust within the community.
- **Real-time Messaging:** A fully functional, live chat system for direct communication between users.

## Technology Stack
- **Frontend:** React (with Vite), Tailwind CSS, Redux Toolkit, Socket.IO Client
- **Backend:** Node.js, Express.js, Socket.IO
- **Database:** MongoDB (with Mongoose)

---

## How to Run This Project Locally

Follow these instructions to get the application running on your own machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and running locally.
- A code editor like [Visual Studio Code](https://code.visualstudio.com/).

### Step 1: Clone the Repository
Open your terminal and clone the project:
```bash
git clone https://github.com/imad2435/neighborhood-skill-exchange.git
cd neighborhood-skill-exchange
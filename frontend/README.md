# (Name of the system)

> **Your inbox is not a calendar.** (Name of the system) is a privacy-first, local AI-powered digital assistant that scans your Gmail inbox, automatically extracts critical events—such as RSVPs, meeting invitations, and deadlines—and seamlessly schedules them directly into your Google Calendar.

---

## Key Features

- **Automated Context Extraction:** Intelligently reads email threads, recognizes scheduling context, and parses dates, times, and agendas without manual copy-pasting.
- **100% Private & Local Processing:** Your emails are processed entirely on your local machine using a local Large Language Model (LLM). Sensitive corporate correspondence and personal data never leave your local environment.
- **One-Click Google Sync:** Provides an interactive dashboard where you can review extracted event details before instantly syncing them to Google Calendar via the official API.
- **Seamless Responsive UI:** A smooth, responsive interface featuring dynamic cursor particle glow effects, automated typewriter placeholders, and complete light/dark mode persistence.

---

## Tech Stack

### Frontend

- **Core:** React 18 (Vite)
- **Styling:** Tailwind CSS (Class-based dark mode optimization)
- **Routing:** React Router DOM

### Backend & Integrations

- **API Framework:** Node.js / Express _OR_ Python (FastAPI)
- **Integrations:** Official Google OAuth 2.0 & Gmail API
- **Local AI Engine:** _// need more info (Configuring local LLM orchestration framework)_

---

## Installation & Setup

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- Python 3.10+ (if utilizing the FastAPI backend variant)

### 1. Clone the Repository

```bash
git clone [https://github.com/Sajib-Akonda/Add-Event-On-Google-Calendar-](https://github.com/Sajib-Akonda/Add-Event-On-Google-Calendar-)
cd frontend
npm run dev
git pull origin main
```

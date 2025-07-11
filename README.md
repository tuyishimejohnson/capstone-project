
# Community Health Workers Dashboard
**Description** 

A portal for Community Health Workers (CHWs) to manage, track, and analyze health cases related to malaria, nutrition, and maternal health. The dashboard provides insights, patient data collection, AI-powered assistance, and scheduling tools to streamline community healthcare delivery.


## Features

- **Authentication**: Secure login and signup for CHWs.
- **Dashboard Overview**: Visual summary of key health metrics (malaria, nutrition, maternal cases).
- **Patient Data Collection**: Intuitive forms for malaria, nutrition, and maternal health data entry.
- **Active & Improving Cases**: Track, filter, and manage ongoing and improving health cases.
- **Urgent Actions**: Highlight and manage critical cases requiring immediate attention.
- **AI Assistant**: Chatbot for instant Q&A and guidance on malaria, nutrition, and maternal health.
- **Availability Scheduling**: Set and display work availability and view registered CHWs.
- **Responsive UI**: Mobile-friendly interface.

---

## Technologies

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS, custom CSS
- **UI Libraries**: Lucide React, MUI (Material UI)
- **State & Forms**: React Hook Form
- **HTTP**: Axios
- **Backend (API)**: Express, Node.js
- **Database**: MongoDB
- **Other**: JWT, bcrypt, ESLint, PostCSS, Autoprefixer

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/tuyishimejohnson/capstone-project.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file or set `VITE_BASE_URL` in your environment to point to your backend API.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

---

## Usage

### Authentication
- **Login**: Enter your full name and password to access the dashboard.
- **Signup**: Register as a new CHW with your full details.

### Dashboard
- **Overview**: View key health metrics.
- **Ask Assistant**: Click "Ask Assistant" to chat with the AI bot for instant help.
- **Add Patient**: Use the "Add Patient" button to record new malaria, nutrition, or maternal cases using forms.
- **Availability**: Set your weekly work schedule and view other registered CHWs.
- **Active/Improving/Urgent Cases**: Access modals to manage and review cases by status.
- **Patient Details**: View and manage patient bookings and details.

---

## User Roles
- **health_worker**: Community Health Worker (CHW) has the main user role.
---



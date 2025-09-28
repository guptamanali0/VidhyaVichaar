# VidyaVichar - Student Frontend

A React-based student interface for the VidyaVichar learning platform.

## Features

- **Student Dashboard**: View live and past classes with tabbed interface
- **Live Class Interface**: Post doubts and view Q&A in real-time
- **Past Class Interface**: Review previous class doubts and questions
- **Mock Data Integration**: Uses mock data service for development
- **Responsive Design**: Modern, clean UI with colorful sticky notes
- **React Router**: Navigation between different views

## Project Structure

```
src/
├── components/
│   └── ClassCard.jsx          # Reusable class card component
├── pages/
│   ├── StudentDashboard.jsx   # Main dashboard with tabs
│   ├── LiveClass.jsx         # Live class Q&A interface
│   └── PastClass.jsx         # Past class doubts view
├── services/
│   ├── mockData.js           # Mock data with exact schema
│   └── api.js                # Mock API service
├── App.js                    # Main app with routing
├── index.js                  # React entry point
└── index.css                 # Global styles
```

## Data Schema

The application uses the following exact data attributes:
- `tid`: Teacher ID
- `sid`: Student ID (hardcoded as "student101")
- `classtopic`: Class topic/subject
- `doubtasked`: The question/doubt text
- `sstatus`: Status ("answered" or "unanswered")
- `timestamp`: ISO timestamp for class timing

## Getting Started

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Features Overview

### Student Dashboard
- Displays unique classes grouped by topic and teacher
- Separates live classes (today's date) from past classes
- Tabbed interface for easy navigation
- Card-based layout with hover effects

### Live Class Interface
- Post new doubts with textarea input
- View all student's doubts as colorful sticky notes
- Real-time status tracking (answered/unanswered)
- Random color generation for visual appeal

### Past Class Interface
- Review historical doubts and questions
- Same sticky note design for consistency
- Formatted timestamps for better readability

## Styling

- Modern, clean design with subtle shadows and hover effects
- Colorful sticky notes with random colors
- Responsive grid layout
- Consistent button and form styling
- Professional color scheme

## Mock Data

The application includes sample data with:
- Multiple class topics (System Design, MongoDB, React)
- Various doubt statuses
- Realistic timestamps
- Different teachers and students

## Next Steps

When the backend is ready, replace the mock API service with real API calls to your backend endpoints.

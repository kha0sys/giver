# Guiver - Crowdfunding Social Network

A crowdfunding platform that connects people with causes and projects, facilitating direct contact between users.

## Project Structure

```plaintext
├── backend/                 # Go Server
│   ├── cmd/                # Application entry point
│   ├── internal/           # Private application code
│   │   ├── domain/        # Business entities and rules
│   │   ├── delivery/      # HTTP handlers and routing
│   │   ├── repository/    # Data access layer
│   │   └── middleware/    # HTTP middleware
│   ├── pkg/               # Public packages
│   └── config/            # Configuration files
└── frontend/              # React Application
    ├── public/            # Static files
    └── src/              # Source code
        ├── components/   # Reusable UI components
        ├── pages/        # Application views/routes
        ├── contexts/     # React contexts
        ├── hooks/        # Custom React hooks
        ├── config/       # Configuration files
        └── types/        # TypeScript type definitions

```

## Features

- User authentication and profile management
- Creation and management of social causes
- Product listing linked to causes
- Direct messaging between users
- Cause and product search
- Social interactions (comments, likes, shares)
- Impact tracking and statistics

## Tech Stack

### Backend
- Go
- Firebase Authentication
- Firestore Database
- Cloud Functions

### Frontend
- React
- TypeScript
- Material-UI
- Firebase SDK
- React Router

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Go (v1.16 or higher)
- Firebase CLI
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/kha0sys/giver.git
cd giver
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
go mod download
```

4. Set up environment variables
- Create a `.env` file in the frontend directory based on `.env.example`
- Configure your Firebase credentials

5. Start the development servers

Frontend:
```bash
cd frontend
npm start
```

Backend:
```bash
cd backend
go run cmd/main.go
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Applicant Portal

A full-stack web application for managing job applications, built with Angular frontend and C# (.NET) backend.

## Project Structure

```
Applicant Portal/
├── frontend/          # Angular application
├── backend/           # .NET Web API
└── database/          # JSON file storage
```

## Features

- **Application Management**: Create, read, update, and delete job applications
- **Status Tracking**: Track application status (Pending, Interview, Approved, Rejected)
- **Responsive Design**: Built with Bootstrap for mobile-friendly interface
- **RESTful API**: Clean API design with proper HTTP methods
- **JSON Storage**: Simple file-based storage for development

## Technologies

### Frontend
- Angular 17+
- TypeScript
- Bootstrap 5
- RxJS
- Angular Router
- Reactive Forms

### Backend
- .NET 8
- ASP.NET Core Web API
- C#
- Newtonsoft.Json
- Swagger/OpenAPI

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- .NET 8 SDK
- Angular CLI

### Frontend Setup
```bash
cd frontend
npm install
ng serve
```
The application will be available at `http://localhost:4200`

### Backend Setup
```bash
cd backend
dotnet restore
dotnet run
```
The API will be available at `https://localhost:5001` (or `http://localhost:5000`)

## API Endpoints

- `GET /api/applications` - Get all applications
- `GET /api/applications/{id}` - Get specific application
- `POST /api/applications` - Create new application
- `PUT /api/applications/{id}` - Update application
- `DELETE /api/applications/{id}` - Delete application

## Development Notes

This is a basic project structure. For production use, consider:
- Adding authentication and authorization
- Implementing proper database (SQL Server, PostgreSQL, etc.)
- Adding input validation and error handling
- Implementing logging and monitoring
- Adding unit and integration tests
- Setting up CI/CD pipeline
- Adding file upload functionality for resumes
- Implementing email notifications

## License

This project is for educational/demonstration purposes.

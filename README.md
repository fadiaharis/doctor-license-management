# Doctor License Management System

A full-stack Doctor License Management module built for a Medical SaaS platform.

---

## Overview

This project allows managing doctor licenses, including:

- Creating, updating, and deleting doctors
- Searching and filtering doctors
- Tracking license expiry status
- Server-side pagination
- Clean and modern UI with proper UX states

---

## Tech Stack

### Backend
- .NET 8 Web API
- Clean Architecture
- CQRS (MediatR)
- Dapper
- SQL Server
- Stored Procedures

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod
- Sonner (toast notifications)

---

## Features

### Core Features
- Add doctor
- Edit doctor
- Soft delete doctor
- Search by name or license number
- Filter by status
- Status badges (Active / Expired / Suspended)

### Advanced Features
- Server-side pagination
- Expiry logic handled in SQL
- Form validation with error messages
- Toast notifications for actions
- Loading, empty, and error states

---

## Project Structure

```text
doctor-license-management/
  backend/
    src/
      DoctorLicenseManagement.API/
      DoctorLicenseManagement.Application/
      DoctorLicenseManagement.Domain/
      DoctorLicenseManagement.Infrastructure/

  web/
    app/
    features/
    lib/
    types/
    config/

  database/
    SQL scripts + setup instructions

  README.md
```

## Backend Architecture

The backend follows **Clean Architecture principles**:

```text
API → Application → Domain → Infrastructure
```

## API Layer

- Controllers
- Request handling
- Returns standardized API responses

## Application Layer

- CQRS commands and queries  
- MediatR handlers  
- DTOs  
- Interfaces  
- Business logic coordination  

## Domain Layer

- Entities  
- Enums  

## Infrastructure Layer

- Dapper repositories  
- Database access  
- Stored procedure execution  

---

## CQRS Design

The project uses **CQRS (Command Query Responsibility Segregation)** to separate read and write operations.

### Queries

- `GetDoctorsQuery`
- `GetDoctorByIdQuery`

### Commands

- `CreateDoctorCommand`
- `UpdateDoctorCommand`
- `DeleteDoctorCommand`
- `UpdateDoctorStatusCommand`

This approach keeps controllers thin and ensures business logic is well-organized.

---

## Database

SQL Server is used with stored procedures.

## Main Table

### Doctors

#### Key Columns:

- **Id**
- **FullName**
- **Email**
- **Specialization**
- **LicenseNumber**
- **LicenseExpiryDate**
- **Status**
- **CreatedDate**
- **IsDeleted**

---

## Stored Procedures

### usp_Doctors_GetAll

Handles:

- Search (name / license number)
- Filter by status
- Expiry logic (Active / Expired)
- Server-side pagination

---

### usp_Doctors_GetExpired (Bonus)

- Returns only expired doctors

---

## API Response Format

All APIs follow a standard response structure:

```json
{
  "success": true,
  "message": "Doctors fetched successfully",
  "data": {}
}
```
## Paginated Response

```json
{
  "success": true,
  "message": "Doctors fetched successfully",
  "data": {
    "items": [],
    "pageNumber": 1,
    "pageSize": 5,
    "totalCount": 20,
    "totalPages": 4
  }
}
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|---------|------------|
| GET | `/api/Doctors?pageNumber=1&pageSize=5` | Get doctors (paginated) |
| GET | `/api/Doctors/{id}` | Get doctor by ID |
| POST | `/api/Doctors` | Create doctor |
| PUT | `/api/Doctors/{id}` | Update doctor |
| DELETE | `/api/Doctors/{id}` | Soft delete doctor |
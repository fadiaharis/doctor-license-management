# Database Setup

This folder contains all SQL scripts required to set up the database for the Doctor License Management system.

## Prerequisites

- SQL Server (Express or higher)
- SQL Server Management Studio (SSMS)

---

## Setup Steps

### 1. Create Database
Run:
01_create_database.sql

### 2. Create Tables
Run:
02_create_tables.sql

### 3. Create Indexes & Constraints
Run:
03_indexes_constraints.sql

### 4. Create Stored Procedures
Run:
04_stored_procedures.sql

---

## Verification

After setup, run the following:

```sql
EXEC dbo.usp_Doctors_GetAll 
    @PageNumber = 1,
    @PageSize = 5;
```
You should see a paginated list of doctors.

## Stored Procedures
### usp_Doctors_GetAll

Handles:

- Search by name or license number
- Filter by status
- Expiry logic (Active / Expired)
- Server-side pagination

### usp_Doctors_GetExpired

Returns only expired doctors

Verify:

```sql
EXEC dbo.usp_Doctors_GetExpired;
```

## Notes
- Soft delete is implemented using the IsDeleted column
- Duplicate license numbers are prevented using a filtered unique index
- Expiry status is calculated dynamically in the stored procedure
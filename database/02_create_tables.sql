USE DoctorLicenseManagementDb;
GO

CREATE TABLE Doctors (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(150) NOT NULL,
    Email NVARCHAR(150) NOT NULL,
    Specialization NVARCHAR(100) NOT NULL,
    LicenseNumber NVARCHAR(50) NOT NULL,
    LicenseExpiryDate DATE NOT NULL,
    Status NVARCHAR(20) NOT NULL DEFAULT 'Active',
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    IsDeleted BIT NOT NULL DEFAULT 0
);
GO
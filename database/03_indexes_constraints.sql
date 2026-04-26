USE DoctorLicenseManagementDb;
GO

CREATE UNIQUE INDEX UX_Doctors_LicenseNumber_NotDeleted
ON Doctors(LicenseNumber)
WHERE IsDeleted = 0;
GO

ALTER TABLE Doctors
ADD CONSTRAINT CK_Doctors_Status
CHECK (Status IN ('Active', 'Expired', 'Suspended'));
GO
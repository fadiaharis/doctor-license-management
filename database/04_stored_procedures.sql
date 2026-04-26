
-- stored procedure for doctor listing --

CREATE OR ALTER PROCEDURE dbo.usp_Doctors_GetAll
    @Search NVARCHAR(150) = NULL,
    @Status NVARCHAR(20) = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH DoctorData AS
    (
        SELECT
            Id,
            FullName,
            Email,
            Specialization,
            LicenseNumber,
            LicenseExpiryDate,
            CASE
                WHEN LicenseExpiryDate < CAST(GETDATE() AS DATE) THEN 'Expired'
                ELSE Status
            END AS Status,
            CreatedDate
        FROM dbo.Doctors
        WHERE IsDeleted = 0
    ),
    FilteredDoctors AS
    (
        SELECT
            *,
            COUNT(*) OVER() AS TotalCount
        FROM DoctorData
        WHERE
            (
                NULLIF(@Search, '') IS NULL
                OR FullName LIKE '%' + @Search + '%'
                OR LicenseNumber LIKE '%' + @Search + '%'
            )
            AND
            (
                NULLIF(@Status, '') IS NULL
                OR Status = @Status
            )
    )
    SELECT
        Id,
        FullName,
        Email,
        Specialization,
        LicenseNumber,
        LicenseExpiryDate,
        Status,
        CreatedDate,
        TotalCount
    FROM FilteredDoctors
    ORDER BY CreatedDate DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END;
GO

-- stored procedure for expired doctors --

CREATE OR ALTER PROCEDURE dbo.usp_Doctors_GetExpired
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        Id,
        FullName,
        Email,
        Specialization,
        LicenseNumber,
        LicenseExpiryDate,
        'Expired' AS Status,
        CreatedDate
    FROM dbo.Doctors
    WHERE IsDeleted = 0
      AND LicenseExpiryDate < CAST(GETDATE() AS DATE)
    ORDER BY LicenseExpiryDate ASC;
END;
GO
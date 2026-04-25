using DoctorLicenseManagement.Application.DTOs;
using DoctorLicenseManagement.Domain.Entities;
using DoctorLicenseManagement.Domain.Enums;

namespace DoctorLicenseManagement.Application.Common.Mapping;

public static class DoctorMappings
{
    public static DoctorDto ToDto(this Doctor doctor)
    {
        var status = doctor.LicenseExpiryDate.Date < DateTime.UtcNow.Date
            ? DoctorStatus.Expired.ToString()
            : doctor.Status.ToString();

        return new DoctorDto
        {
            Id = doctor.Id,
            FullName = doctor.FullName,
            Email = doctor.Email,
            Specialization = doctor.Specialization,
            LicenseNumber = doctor.LicenseNumber,
            LicenseExpiryDate = doctor.LicenseExpiryDate,
            Status = status,
            CreatedDate = doctor.CreatedDate
        };
    }
}

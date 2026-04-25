using DoctorLicenseManagement.Application.DTOs;
using DoctorLicenseManagement.Domain.Entities;

namespace DoctorLicenseManagement.Application.Interfaces;

public interface IDoctorRepository
{
    Task<int> CreateAsync(Doctor doctor, CancellationToken cancellationToken);
    Task<Doctor?> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<List<DoctorListItemDto>> GetAllAsync(string? search, string? status, CancellationToken cancellationToken);
    Task UpdateAsync(Doctor doctor, CancellationToken cancellationToken);
    Task<bool> LicenseNumberExistsAsync(string licenseNumber, int? excludeId, CancellationToken cancellationToken);
}

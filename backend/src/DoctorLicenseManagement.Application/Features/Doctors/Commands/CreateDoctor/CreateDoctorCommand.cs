using DoctorLicenseManagement.Application.DTOs;
using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Commands.CreateDoctor;

public record CreateDoctorCommand(
    string FullName,
    string Email,
    string Specialization,
    string LicenseNumber,
    DateTime LicenseExpiryDate,
    string Status = "Active") : IRequest<int>;

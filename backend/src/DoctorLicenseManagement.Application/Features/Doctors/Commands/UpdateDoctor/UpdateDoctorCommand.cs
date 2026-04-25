using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Commands.UpdateDoctor;

public record UpdateDoctorCommand(
    int Id,
    string FullName,
    string Email,
    string Specialization,
    string LicenseNumber,
    DateTime LicenseExpiryDate,
    string Status) : IRequest;

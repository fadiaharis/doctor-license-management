using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Commands.UpdateDoctorStatus;

public record UpdateDoctorStatusCommand(int Id, string Status) : IRequest;

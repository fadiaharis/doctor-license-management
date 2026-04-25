using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Commands.DeleteDoctor;

public record DeleteDoctorCommand(int Id) : IRequest;

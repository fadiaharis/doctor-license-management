using DoctorLicenseManagement.Application.Interfaces;
using DoctorLicenseManagement.Domain.Enums;
using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Commands.UpdateDoctorStatus;

public class UpdateDoctorStatusCommandHandler : IRequestHandler<UpdateDoctorStatusCommand>
{
    private readonly IDoctorRepository _doctorRepository;

    public UpdateDoctorStatusCommandHandler(IDoctorRepository doctorRepository)
    {
        _doctorRepository = doctorRepository;
    }

    public async Task<Unit> Handle(UpdateDoctorStatusCommand request, CancellationToken cancellationToken)
    {
        if (request.Id <= 0)
        {
            throw new ArgumentException("Id must be greater than zero.");
        }

        if (!new[] { "Active", "Expired", "Suspended" }.Contains(request.Status))
        {
            throw new ArgumentException("Status must be Active, Expired, or Suspended.");
        }

        var doctor = await _doctorRepository.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new KeyNotFoundException("Doctor not found.");

        doctor.Status = doctor.LicenseExpiryDate.Date < DateTime.UtcNow.Date
            ? DoctorStatus.Expired
            : Enum.Parse<DoctorStatus>(request.Status, ignoreCase: true);

        await _doctorRepository.UpdateAsync(doctor, cancellationToken);
        return Unit.Value;
    }
}

using DoctorLicenseManagement.Application.Interfaces;
using DoctorLicenseManagement.Domain.Enums;
using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Commands.UpdateDoctor;

public class UpdateDoctorCommandHandler : IRequestHandler<UpdateDoctorCommand>
{
    private readonly IDoctorRepository _doctorRepository;

    public UpdateDoctorCommandHandler(IDoctorRepository doctorRepository)
    {
        _doctorRepository = doctorRepository;
    }

    public async Task<Unit> Handle(UpdateDoctorCommand request, CancellationToken cancellationToken)
    {
        var validator = new UpdateDoctorCommandValidator();
        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            throw new ArgumentException(string.Join(" | ", validationResult.Errors.Select(x => x.ErrorMessage)));
        }

        var doctor = await _doctorRepository.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new KeyNotFoundException("Doctor not found.");

        var exists = await _doctorRepository.LicenseNumberExistsAsync(request.LicenseNumber, request.Id, cancellationToken);
        if (exists)
        {
            throw new InvalidOperationException("License number already exists.");
        }

        doctor.FullName = request.FullName.Trim();
        doctor.Email = request.Email.Trim();
        doctor.Specialization = request.Specialization.Trim();
        doctor.LicenseNumber = request.LicenseNumber.Trim();
        doctor.LicenseExpiryDate = request.LicenseExpiryDate.Date;
        doctor.Status = request.LicenseExpiryDate.Date < DateTime.UtcNow.Date
            ? DoctorStatus.Expired
            : Enum.Parse<DoctorStatus>(request.Status, ignoreCase: true);

        await _doctorRepository.UpdateAsync(doctor, cancellationToken);
        return Unit.Value;
    }
}

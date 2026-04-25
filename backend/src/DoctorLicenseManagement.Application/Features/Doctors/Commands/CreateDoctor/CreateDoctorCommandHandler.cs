using DoctorLicenseManagement.Application.Interfaces;
using DoctorLicenseManagement.Domain.Entities;
using DoctorLicenseManagement.Domain.Enums;
using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Commands.CreateDoctor;

public class CreateDoctorCommandHandler : IRequestHandler<CreateDoctorCommand, int>
{
    private readonly IDoctorRepository _doctorRepository;

    public CreateDoctorCommandHandler(IDoctorRepository doctorRepository)
    {
        _doctorRepository = doctorRepository;
    }

    public async Task<int> Handle(CreateDoctorCommand request, CancellationToken cancellationToken)
    {
        var validator = new CreateDoctorCommandValidator();
        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            throw new ArgumentException(string.Join(" | ", validationResult.Errors.Select(x => x.ErrorMessage)));
        }

        var exists = await _doctorRepository.LicenseNumberExistsAsync(request.LicenseNumber, null, cancellationToken);
        if (exists)
        {
            throw new InvalidOperationException("License number already exists.");
        }

        var doctor = new Doctor
        {
            FullName = request.FullName.Trim(),
            Email = request.Email.Trim(),
            Specialization = request.Specialization.Trim(),
            LicenseNumber = request.LicenseNumber.Trim(),
            LicenseExpiryDate = request.LicenseExpiryDate.Date,
            Status = request.LicenseExpiryDate.Date < DateTime.UtcNow.Date
                ? DoctorStatus.Expired
                : Enum.Parse<DoctorStatus>(request.Status, ignoreCase: true),
            CreatedDate = DateTime.UtcNow,
            IsDeleted = false
        };

        return await _doctorRepository.CreateAsync(doctor, cancellationToken);
    }
}

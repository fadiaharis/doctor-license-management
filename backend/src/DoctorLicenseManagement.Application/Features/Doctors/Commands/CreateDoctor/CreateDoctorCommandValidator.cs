using FluentValidation;

namespace DoctorLicenseManagement.Application.Features.Doctors.Commands.CreateDoctor;

public class CreateDoctorCommandValidator : AbstractValidator<CreateDoctorCommand>
{
    public CreateDoctorCommandValidator()
    {
        RuleFor(x => x.FullName).NotEmpty().MaximumLength(150);
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(150);
        RuleFor(x => x.Specialization).NotEmpty().MaximumLength(100);
        RuleFor(x => x.LicenseNumber).NotEmpty().MaximumLength(50);
        RuleFor(x => x.Status)
            .NotEmpty()
            .Must(x => new[] { "Active", "Expired", "Suspended" }.Contains(x))
            .WithMessage("Status must be Active, Expired, or Suspended.");
    }
}

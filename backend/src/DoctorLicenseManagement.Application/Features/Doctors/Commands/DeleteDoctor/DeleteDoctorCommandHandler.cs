using DoctorLicenseManagement.Application.Interfaces;
using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Commands.DeleteDoctor;

public class DeleteDoctorCommandHandler : IRequestHandler<DeleteDoctorCommand>
{
    private readonly IDoctorRepository _doctorRepository;

    public DeleteDoctorCommandHandler(IDoctorRepository doctorRepository)
    {
        _doctorRepository = doctorRepository;
    }

    public async Task<Unit> Handle(DeleteDoctorCommand request, CancellationToken cancellationToken)
    {
        if (request.Id <= 0)
        {
            throw new ArgumentException("Id must be greater than zero.");
        }

        var doctor = await _doctorRepository.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new KeyNotFoundException("Doctor not found.");

        doctor.IsDeleted = true;
        await _doctorRepository.UpdateAsync(doctor, cancellationToken);
        return Unit.Value;
    }
}

using DoctorLicenseManagement.Application.Common.Mapping;
using DoctorLicenseManagement.Application.DTOs;
using DoctorLicenseManagement.Application.Interfaces;
using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Queries.GetDoctorById;

public class GetDoctorByIdQueryHandler : IRequestHandler<GetDoctorByIdQuery, DoctorDto>
{
    private readonly IDoctorRepository _doctorRepository;

    public GetDoctorByIdQueryHandler(IDoctorRepository doctorRepository)
    {
        _doctorRepository = doctorRepository;
    }

    public async Task<DoctorDto> Handle(GetDoctorByIdQuery request, CancellationToken cancellationToken)
    {
        if (request.Id <= 0)
        {
            throw new ArgumentException("Id must be greater than zero.");
        }

        var doctor = await _doctorRepository.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new KeyNotFoundException("Doctor not found.");

        return doctor.ToDto();
    }
}

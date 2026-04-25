using DoctorLicenseManagement.Application.DTOs;
using DoctorLicenseManagement.Application.Interfaces;
using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Queries.GetDoctors;

public class GetDoctorsQueryHandler : IRequestHandler<GetDoctorsQuery, List<DoctorListItemDto>>
{
    private readonly IDoctorRepository _doctorRepository;

    public GetDoctorsQueryHandler(IDoctorRepository doctorRepository)
    {
        _doctorRepository = doctorRepository;
    }

    public Task<List<DoctorListItemDto>> Handle(GetDoctorsQuery request, CancellationToken cancellationToken)
    {
        return _doctorRepository.GetAllAsync(request.Search, request.Status, cancellationToken);
    }
}

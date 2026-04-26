using DoctorLicenseManagement.Application.Common;
using DoctorLicenseManagement.Application.DTOs;
using DoctorLicenseManagement.Application.Interfaces;
using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Queries.GetDoctors;

public class GetDoctorsQueryHandler
    : IRequestHandler<GetDoctorsQuery, PaginatedResponse<DoctorListItemDto>>
{
    private readonly IDoctorRepository _doctorRepository;

    public GetDoctorsQueryHandler(IDoctorRepository doctorRepository)
    {
        _doctorRepository = doctorRepository;
    }

    public async Task<PaginatedResponse<DoctorListItemDto>> Handle(
        GetDoctorsQuery request,
        CancellationToken cancellationToken)
    {
        return await _doctorRepository.GetAllAsync(
            request.Search,
            request.Status,
            request.PageNumber,
            request.PageSize
        );
    }
}
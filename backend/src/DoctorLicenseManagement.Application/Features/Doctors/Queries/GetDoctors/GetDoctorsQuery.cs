using DoctorLicenseManagement.Application.Common;
using DoctorLicenseManagement.Application.DTOs;
using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Queries.GetDoctors;

public record GetDoctorsQuery(
    string? Search,
    string? Status,
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<PaginatedResponse<DoctorListItemDto>>;

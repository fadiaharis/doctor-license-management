using DoctorLicenseManagement.Application.DTOs;
using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Queries.GetDoctors;

public record GetDoctorsQuery(string? Search, string? Status) : IRequest<List<DoctorListItemDto>>;

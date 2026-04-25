using DoctorLicenseManagement.Application.DTOs;
using MediatR;

namespace DoctorLicenseManagement.Application.Features.Doctors.Queries.GetDoctorById;

public record GetDoctorByIdQuery(int Id) : IRequest<DoctorDto>;

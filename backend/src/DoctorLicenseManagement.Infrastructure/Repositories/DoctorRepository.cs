using Dapper;
using DoctorLicenseManagement.Application.Common;
using DoctorLicenseManagement.Application.DTOs;
using DoctorLicenseManagement.Application.Interfaces;
using DoctorLicenseManagement.Domain.Entities;
using DoctorLicenseManagement.Infrastructure.Persistence;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace DoctorLicenseManagement.Infrastructure.Repositories;

public class DoctorRepository : IDoctorRepository
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public DoctorRepository(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<int> CreateAsync(Doctor doctor, CancellationToken cancellationToken)
    {
        await _context.Doctors.AddAsync(doctor, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return doctor.Id;
    }

    public async Task<Doctor?> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        return await _context.Doctors
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted, cancellationToken);
    }

    public async Task<PaginatedResponse<DoctorListItemDto>> GetAllAsync(
     string? search,
     string? status,
     int pageNumber,
     int pageSize)
    {
        using IDbConnection db = new SqlConnection(
            _configuration.GetConnectionString("DefaultConnection")
        );

        var result = (await db.QueryAsync<DoctorListItemDto>(
            "dbo.usp_Doctors_GetAll",
            new
            {
                Search = string.IsNullOrWhiteSpace(search) ? null : search,
                Status = string.IsNullOrWhiteSpace(status) ? null : status,
                PageNumber = pageNumber,
                PageSize = pageSize
            },
            commandType: CommandType.StoredProcedure
        )).ToList();

        var totalCount = result.FirstOrDefault()?.TotalCount ?? 0;

        return new PaginatedResponse<DoctorListItemDto>
        {
            Items = result,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task UpdateAsync(Doctor doctor, CancellationToken cancellationToken)
    {
        _context.Doctors.Update(doctor);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> LicenseNumberExistsAsync(string licenseNumber, int? excludeId, CancellationToken cancellationToken)
    {
        return await _context.Doctors.AnyAsync(x =>
            !x.IsDeleted &&
            x.LicenseNumber == licenseNumber &&
            (!excludeId.HasValue || x.Id != excludeId.Value), cancellationToken);
    }
}

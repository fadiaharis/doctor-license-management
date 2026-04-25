using System.Data;
using Dapper;
using DoctorLicenseManagement.Application.DTOs;
using DoctorLicenseManagement.Application.Interfaces;
using DoctorLicenseManagement.Domain.Entities;
using DoctorLicenseManagement.Infrastructure.Persistence;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

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

    public async Task<List<DoctorListItemDto>> GetAllAsync(string? search, string? status, CancellationToken cancellationToken)
    {
        await using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        var result = await connection.QueryAsync<DoctorListItemDto>(
            sql: "dbo.usp_Doctors_GetAll",
            param: new { Search = search, Status = status },
            commandType: CommandType.StoredProcedure);

        return result.ToList();
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

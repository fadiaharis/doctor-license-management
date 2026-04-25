using DoctorLicenseManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DoctorLicenseManagement.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Doctor> Doctors => Set<Doctor>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.ToTable("Doctors", "dbo");
            entity.HasKey(x => x.Id);

            entity.Property(x => x.FullName).IsRequired().HasMaxLength(150);
            entity.Property(x => x.Email).IsRequired().HasMaxLength(150);
            entity.Property(x => x.Specialization).IsRequired().HasMaxLength(100);
            entity.Property(x => x.LicenseNumber).IsRequired().HasMaxLength(50);
            entity.Property(x => x.LicenseExpiryDate).HasColumnType("date");
            entity.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
            entity.Property(x => x.CreatedDate)
                .HasColumnType("datetime2")
                .HasDefaultValueSql("GETUTCDATE()");
            entity.Property(x => x.IsDeleted).HasDefaultValue(false);
        });
    }
}

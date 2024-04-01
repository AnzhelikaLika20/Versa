using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using VersaProject.Dal.Entities;

namespace VersaProject.Dal.Infrastructure;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext<User>(options)
{
    public required DbSet<FileData> FilesData { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<FileData>()
            .Property(e => e.CreationTime)
            .HasColumnType("TIMESTAMP");
    }
}
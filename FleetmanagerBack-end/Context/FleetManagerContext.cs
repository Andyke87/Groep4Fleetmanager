using Microsoft.EntityFrameworkCore;

namespace FleetManager.Models;
public partial class FleetManagerContext : DbContext
{
    public FleetManagerContext(DbContextOptions<FleetManagerContext> options)
        : base(options)
    {
        ChangeTracker.LazyLoadingEnabled = false;
    }


    public virtual DbSet<Connection> Connections { get; set; }

    public virtual DbSet<Driver> Drivers { get; set; }

    public virtual DbSet<GasCard> GasCards { get; set; }

    public virtual DbSet<Vehicle> Vehicles { get; set; }

    public virtual DbSet<Authentication> Authentications { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Driver>(entity =>
        {
            entity.HasKey(e => e.IdDriver);
            entity.ToTable("Driver", tb =>
                {
                    tb.HasTrigger("TG_Check_Age_Driver");
                    tb.HasTrigger("TG_Check_Driver");
                    tb.HasTrigger("TG_Check_ZipCode");
                });
            entity.Property(e => e.IdDriver).HasColumnName("IdDriver");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Inserts)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Street)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Number)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ZipCode)
                .IsUnicode(false);
            entity.Property(e => e.DayOfBirth).HasColumnType("date");
            entity.Property(e => e.RegistryNumber)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.CategoryLicense)
                .HasMaxLength(10)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Connection>()
                .HasIndex(c => new { c.IdDriver, c.IdGasCard, c.IdVehicle })
                .IsUnique();
        modelBuilder.Entity<Connection>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("Connection", tb =>
                {

                });
            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.IdDriver).HasColumnName("IdDriver");
            entity.Property(e => e.IdGasCard).HasColumnName("IdGasCard");
            entity.Property(e => e.IdVehicle).HasColumnName("IdVehicle");

            entity.HasOne(d => d.IdDriverNavigation).WithMany()
                .HasForeignKey(d => d.IdDriver)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Connectie__IdBes__1A9EF37A")
                .IsRequired();

            entity.HasOne(d => d.IdGasCardNavigation).WithMany()
                .HasForeignKey(d => d.IdGasCard)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Connectie__IdTan__1B9317B3")
                .IsRequired();

            entity.HasOne(d => d.IdVehicleNavigation).WithMany()
                .HasForeignKey(d => d.IdVehicle)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Connectie__IdVoe__1C873BEC")
                .IsRequired();
        });

        modelBuilder.Entity<GasCard>(entity =>
        {
            entity.HasKey(e => e.IdGasCard);
            entity.ToTable("GasCard", tb =>
                {
                    tb.HasTrigger("TG_Check_GasCard");
                    tb.HasTrigger("TG_Check_ValidationDate");
                });

            entity.Property(e => e.IdGasCard).HasColumnName("IdGasCard");
            entity.Property(e => e.CardNumber)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.ValidationDate).HasColumnType("date");
            entity.Property(e => e.Pin)
                .HasMaxLength(6)
                .IsUnicode(false);
            entity.Property(e => e.Fuel)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.BlockedCard);
        });

        modelBuilder.Entity<Vehicle>(entity =>
        {
            entity.HasKey(e => e.IdVehicle);

            entity.ToTable("Vehicle", tb =>
                {
                    tb.HasTrigger("TG_Check_ChassisNumber");
                    tb.HasTrigger("TG_Check_NumberOfDoors");
                });

            entity.Property(e => e.IdVehicle).HasColumnName("IdVehicle");
            entity.Property(e => e.Brand)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Model)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.ChassisNumber)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LicensePlate)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Fuel)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.VehicleType)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Color)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.NumberOfDoors)
                .HasDefaultValue(0);
        });

        modelBuilder.Entity<Authentication>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.ToTable("Authentication"); // Voeg de tabelnaam toe.
            entity.Property(e => e.Id).HasColumnName("Id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Role)
                .HasMaxLength(5)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}


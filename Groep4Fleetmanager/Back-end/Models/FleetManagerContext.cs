using Connections.Models;
using Microsoft.EntityFrameworkCore;

namespace FleetManager.Models;
public partial class FleetManagerContext : DbContext
{
    public FleetManagerContext(DbContextOptions<FleetManagerContext> opties)
        : base(opties)
    {
        ChangeTracker.LazyLoadingEnabled = false;
    }

    public virtual DbSet<Bestuurder> Bestuurders { get; set; }

    public virtual DbSet<Connectie> Connecties { get; set; }

    public virtual DbSet<Tankkaart> Tankkaarten { get; set; }

    public virtual DbSet<Voertuig> Voertuigen { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Bestuurder>(entity =>
        {
            entity.HasKey(e => e.IdBestuurder);
            entity.ToTable("Bestuurder", tb =>
                {
                    tb.HasTrigger("TG_Controleer_Bestuurder");
                    tb.HasTrigger("TG_Controleer_Bestuurder_Leeftijd");
                    tb.HasTrigger("TG_Controleer_Postcode");
                });
            entity.Property(e => e.IdBestuurder).HasColumnName("IdBestuurder");
            entity.Property(e => e.Naam)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Voornaam)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Straat)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Huisnummer)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Stad)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Postcode)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Geboortedatum).HasColumnType("date");
            entity.Property(e => e.Rijksregisternummer)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.CategorieRijbewijs)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("CategorieRijbewijs");
            entity.Property(e => e.Login)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Paswoord)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Connectie>(entity =>
                {
                    entity.Property(e => e.Id).HasColumnName("Id");
                    entity.Property(e => e.IdBestuurder).HasColumnName("IdBestuurder");
                    entity.Property(e => e.IdTankkaart).HasColumnName("IdTankkaart");
                    entity.Property(e => e.IdVoertuig).HasColumnName("IdVoertuig");

                    entity.HasOne(d => d.IdBestuurderNavigation).WithMany()
                        .HasForeignKey(d => d.IdBestuurder)
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Connectie__IdBes__1A9EF37A")
                        .IsRequired();

                    entity.HasOne(d => d.IdTankkaartNavigation).WithMany()
                        .HasForeignKey(d => d.IdTankkaart)
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Connectie__IdTan__1B9317B3")
                        .IsRequired();

                    entity.HasOne(d => d.IdVoertuigNavigation).WithMany()
                        .HasForeignKey(d => d.IdVoertuig)
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Connectie__IdVoe__1C873BEC")
                        .IsRequired();
                });


        modelBuilder.Entity<Tankkaart>(entity =>
        {
            entity.HasKey(e => e.IdTankkaart);

            entity.ToTable("Tankkaart", tb =>
                {
                    tb.HasTrigger("TG_Controleer_Geldigheidsdatum");
                    tb.HasTrigger("TG_Controleer_Tankkaart");
                });

            entity.Property(e => e.IdTankkaart).HasColumnName("IdTankkaart");
            entity.Property(e => e.Kaartnummer)
                .HasMaxLength(12)
                .IsUnicode(false);
            entity.Property(e => e.Geldigheidsdatum).HasColumnType("date");
            entity.Property(e => e.Pincode)
                .HasMaxLength(6)
                .IsUnicode(false);
            entity.Property(e => e.Brandstoffen)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Geblokkeerd).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<Voertuig>(entity =>
        {
            entity.HasKey(e => e.IdVoertuig);

            entity.ToTable("Voertuig", tb =>
                {
                    tb.HasTrigger("TG_Controleer_AantalDeuren");
                    tb.HasTrigger("TG_Controleer_Chassisnummer");
                });

            entity.Property(e => e.IdVoertuig).HasColumnName("IdVoertuig");
            entity.Property(e => e.Merk)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Model)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Chassisnummer)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nummerplaat)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Brandstoftype)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.TypeVoertuig)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("Type_voertuig");
            entity.Property(e => e.Kleur)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.AantalDeuren).HasColumnName("Aantal_deuren");
        });

        OnModelCreatingPartial(modelBuilder);
    }
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

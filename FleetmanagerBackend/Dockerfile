# Eerste stage: build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Kopieer de projectbestanden naar de image
COPY ["./Back-end.csproj", "FleetmanagerBackend/"]
RUN dotnet restore "FleetmanagerBackend/Back-end.csproj"

# Kopieer de rest van de code
COPY . .

# Kopieer het certificaat naar de image en wijzig de bestandsrechten
COPY ["./certificate.pfx", "/app/certificate.pfx"]
RUN chmod 644 /app/certificate.pfx

# Build de app
RUN dotnet build "./Back-end.csproj" -c Release -o /app/build

# Tweede stage: publish
FROM build AS publish
RUN dotnet publish "Back-end.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Derde stage: final
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Expose de poort waarop de app draait
EXPOSE 5043

# Kopieer de gepubliceerde bestanden van de vorige stage
COPY --from=publish /app/publish .

# Definieer de entrypoint voor de container
ENTRYPOINT ["dotnet", "Back-end.dll"]

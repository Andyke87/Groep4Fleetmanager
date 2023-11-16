// API-gateway klasse
using Back_end.Controllers;
using Connections.Models;

public class ConnectieApiGateway
{
    private readonly ConnectieController _connectieController;

    public ConnectieApiGateway(ConnectieController connectieController)
    {
        _connectieController = connectieController;
    }

    // API voor het ophalen van alle connecties
    public IEnumerable<Connectie> GetAlleConnecties()
    {
        return (IEnumerable<Connectie>)_connectieController.Get();
    }

    // API voor het ophalen van een connectie op basis van de code
    public Connectie? GetConnectieBijCode(int code)
    {
        var result = _connectieController.Get(code);
        if (result is Connectie connectie)
        {
            return connectie;
        }
        return null;
    }

    // API voor het verwijderen van een connectie
    public bool VerwijderConnectie(int code)
    {
        var result = _connectieController.Remove(code);
        return result is not null;
    }

    // API voor het maken van een nieuwe connectie
    public bool MaakConnectie(Connectie connectie)
    {
        var result = _connectieController.Create(connectie);
        return result is not null && result.GetType() == typeof(Microsoft.AspNetCore.Mvc.OkResult);
    }
}

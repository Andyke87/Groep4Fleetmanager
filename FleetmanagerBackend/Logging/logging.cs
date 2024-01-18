
namespace FleetManager.Logging
{
    public static class Logging
    {
        private static readonly string LogFilePath = Path.Combine(Directory.GetCurrentDirectory(), "log.txt");

        public static void LogToFile(string logMessage)
        {
            try
            {
                if (!File.Exists(LogFilePath))
                {
                    File.Create(LogFilePath).Dispose();
                }
                using var streamWriter = new StreamWriter(LogFilePath, true);
                streamWriter.WriteLine(logMessage);
            }
            catch (Exception ex)
            {
                // Handel de fout af, log deze naar de console of een ander logkanaal.
                Console.WriteLine($"Error logging to file: {ex.Message}");
            }
        }

    }
}
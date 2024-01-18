
namespace FleetManager.Logging
{
    public static class Logging
    {
        private static readonly string LogFilePath = Path.Combine(Directory.GetCurrentDirectory(), "log.txt");

        public static void LogToFile(string logMessage)
        {
            using var streamWriter = new StreamWriter(LogFilePath, true);
            streamWriter.WriteLine(logMessage);
        }
    }
}
using ApplicantPortal.Api.Models;
using Newtonsoft.Json;

namespace ApplicantPortal.Api.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly string _dataFilePath;
        private readonly ILogger<ApplicationService> _logger;

        public ApplicationService(ILogger<ApplicationService> logger)
        {
            _logger = logger;
            _dataFilePath = Path.Combine(Directory.GetCurrentDirectory(), "..", "database", "applications.json");
            
            // Ensure the database directory exists
            var directory = Path.GetDirectoryName(_dataFilePath);
            if (directory != null && !Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
        }

        public async Task<IEnumerable<Application>> GetAllApplicationsAsync()
        {
            try
            {
                var applications = await LoadApplicationsFromFileAsync();
                return applications;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving applications");
                return new List<Application>();
            }
        }

        public async Task<Application?> GetApplicationByIdAsync(string id)
        {
            try
            {
                var applications = await LoadApplicationsFromFileAsync();
                return applications.FirstOrDefault(a => a.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving application with id {Id}", id);
                return null;
            }
        }

        public async Task<Application> CreateApplicationAsync(CreateApplicationRequest request)
        {
            try
            {
                var application = new Application
                {
                    Id = Guid.NewGuid().ToString(),
                    Position = request.Position,
                    Company = request.Company,
                    Description = request.Description,
                    Requirements = request.Requirements,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    Phone = request.Phone,
                    Address = request.Address,
                    CoverLetter = request.CoverLetter,
                    ResumeUrl = request.ResumeUrl,
                    Status = ApplicationStatus.Pending,
                    AppliedDate = DateTime.Now
                };

                var applications = (await LoadApplicationsFromFileAsync()).ToList();
                applications.Add(application);
                await SaveApplicationsToFileAsync(applications);

                return application;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating application");
                throw;
            }
        }

        public async Task<Application?> UpdateApplicationAsync(string id, UpdateApplicationRequest request)
        {
            try
            {
                var applications = (await LoadApplicationsFromFileAsync()).ToList();
                var existingApplication = applications.FirstOrDefault(a => a.Id == id);

                if (existingApplication == null)
                    return null;

                // Update only provided fields
                if (!string.IsNullOrEmpty(request.Position))
                    existingApplication.Position = request.Position;
                if (!string.IsNullOrEmpty(request.Company))
                    existingApplication.Company = request.Company;
                if (!string.IsNullOrEmpty(request.Description))
                    existingApplication.Description = request.Description;
                if (!string.IsNullOrEmpty(request.Requirements))
                    existingApplication.Requirements = request.Requirements;
                if (request.Status.HasValue)
                    existingApplication.Status = request.Status.Value;
                if (!string.IsNullOrEmpty(request.FirstName))
                    existingApplication.FirstName = request.FirstName;
                if (!string.IsNullOrEmpty(request.LastName))
                    existingApplication.LastName = request.LastName;
                if (!string.IsNullOrEmpty(request.Email))
                    existingApplication.Email = request.Email;
                if (!string.IsNullOrEmpty(request.Phone))
                    existingApplication.Phone = request.Phone;
                if (!string.IsNullOrEmpty(request.Address))
                    existingApplication.Address = request.Address;
                if (!string.IsNullOrEmpty(request.CoverLetter))
                    existingApplication.CoverLetter = request.CoverLetter;
                if (!string.IsNullOrEmpty(request.ResumeUrl))
                    existingApplication.ResumeUrl = request.ResumeUrl;
                if (!string.IsNullOrEmpty(request.Notes))
                    existingApplication.Notes = request.Notes;

                await SaveApplicationsToFileAsync(applications);
                return existingApplication;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating application with id {Id}", id);
                throw;
            }
        }

        public async Task<bool> DeleteApplicationAsync(string id)
        {
            try
            {
                var applications = (await LoadApplicationsFromFileAsync()).ToList();
                var applicationToRemove = applications.FirstOrDefault(a => a.Id == id);

                if (applicationToRemove == null)
                    return false;

                applications.Remove(applicationToRemove);
                await SaveApplicationsToFileAsync(applications);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting application with id {Id}", id);
                throw;
            }
        }

        private async Task<IEnumerable<Application>> LoadApplicationsFromFileAsync()
        {
            if (!File.Exists(_dataFilePath))
            {
                return new List<Application>();
            }

            var json = await File.ReadAllTextAsync(_dataFilePath);
            if (string.IsNullOrWhiteSpace(json))
            {
                return new List<Application>();
            }

            return JsonConvert.DeserializeObject<List<Application>>(json) ?? new List<Application>();
        }

        private async Task SaveApplicationsToFileAsync(IEnumerable<Application> applications)
        {
            var json = JsonConvert.SerializeObject(applications, Formatting.Indented);
            await File.WriteAllTextAsync(_dataFilePath, json);
        }
    }
}

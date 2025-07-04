using ApplicantPortal.Api.Models;

namespace ApplicantPortal.Api.Services
{
    public interface IApplicationService
    {
        Task<IEnumerable<Application>> GetAllApplicationsAsync();
        Task<Application?> GetApplicationByIdAsync(string id);
        Task<Application> CreateApplicationAsync(CreateApplicationRequest request);
        Task<Application?> UpdateApplicationAsync(string id, UpdateApplicationRequest request);
        Task<bool> DeleteApplicationAsync(string id);
    }
}

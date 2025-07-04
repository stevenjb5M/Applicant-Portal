using Microsoft.AspNetCore.Mvc;
using ApplicantPortal.Api.Models;
using ApplicantPortal.Api.Services;

namespace ApplicantPortal.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationsController : ControllerBase
    {
        private readonly IApplicationService _applicationService;
        private readonly ILogger<ApplicationsController> _logger;

        public ApplicationsController(IApplicationService applicationService, ILogger<ApplicationsController> logger)
        {
            _applicationService = applicationService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Application>>> GetApplications()
        {
            try
            {
                var applications = await _applicationService.GetAllApplicationsAsync();
                return Ok(applications);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving applications");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Application>> GetApplication(string id)
        {
            try
            {
                var application = await _applicationService.GetApplicationByIdAsync(id);
                if (application == null)
                {
                    return NotFound();
                }
                return Ok(application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving application with id {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Application>> CreateApplication(CreateApplicationRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var application = await _applicationService.CreateApplicationAsync(request);
                return CreatedAtAction(nameof(GetApplication), new { id = application.Id }, application);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating application");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Application>> UpdateApplication(string id, UpdateApplicationRequest request)
        {
            try
            {
                var updatedApplication = await _applicationService.UpdateApplicationAsync(id, request);
                if (updatedApplication == null)
                {
                    return NotFound();
                }
                return Ok(updatedApplication);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating application with id {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteApplication(string id)
        {
            try
            {
                var deleted = await _applicationService.DeleteApplicationAsync(id);
                if (!deleted)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting application with id {Id}", id);
                return StatusCode(500, "Internal server error");
            }
        }
    }
}

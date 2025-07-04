using System.ComponentModel.DataAnnotations;

namespace ApplicantPortal.Api.Models
{
    public class CreateApplicationRequest
    {
        [Required]
        public string Position { get; set; } = string.Empty;
        
        [Required]
        public string Company { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        public string Requirements { get; set; } = string.Empty;
        
        [Required]
        public string FirstName { get; set; } = string.Empty;
        
        [Required]
        public string LastName { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Phone { get; set; } = string.Empty;
        
        public string Address { get; set; } = string.Empty;
        public string CoverLetter { get; set; } = string.Empty;
        public string? ResumeUrl { get; set; }
    }

    public class UpdateApplicationRequest
    {
        public string? Position { get; set; }
        public string? Company { get; set; }
        public string? Description { get; set; }
        public string? Requirements { get; set; }
        public ApplicationStatus? Status { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? CoverLetter { get; set; }
        public string? ResumeUrl { get; set; }
        public string? Notes { get; set; }
    }
}

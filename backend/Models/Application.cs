namespace ApplicantPortal.Api.Models
{
    public class Application
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Position { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Requirements { get; set; } = string.Empty;
        public ApplicationStatus Status { get; set; } = ApplicationStatus.Pending;
        public DateTime AppliedDate { get; set; } = DateTime.Now;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string CoverLetter { get; set; } = string.Empty;
        public string? ResumeUrl { get; set; }
        public string? Notes { get; set; }
    }

    public enum ApplicationStatus
    {
        Pending,
        Approved,
        Rejected,
        Interview
    }
}

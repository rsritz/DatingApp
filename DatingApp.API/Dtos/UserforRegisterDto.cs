using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserforRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="Password must be in between 4 to 8 charater")]
        public string Password { get; set; }
    }
}
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;

        }
        [HttpPost("register")]

        public async Task<IActionResult> Register(UserforRegisterDto userforRegisterDto)
        {
            userforRegisterDto.Username = userforRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userforRegisterDto.Username))
                return BadRequest("Username Already Exists!!");

            var userToCreate = new User
            {
                Username = userforRegisterDto.Username
            };
            var createdUser = await _repo.Register(userToCreate, userforRegisterDto.Password);
            return StatusCode(201);

        }

        [HttpPost("login")]

        public async Task<IActionResult> Login(UserForLoginDto userforLoginDto)
        {
            var userForRepo = await _repo.Login(userforLoginDto.Username.ToLower(), userforLoginDto.Password);

            if (userForRepo == null)
                return Unauthorized();

            var claim = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userForRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userForRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSettings:Token").Value));
            
            var cred= new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor= new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claim),
                Expires=DateTime.Now.AddDays(1),
                SigningCredentials= cred
            };
            var tokenHandler= new JwtSecurityTokenHandler();
            var token= tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
            token=tokenHandler.WriteToken(token)
            });
        }

    }
}
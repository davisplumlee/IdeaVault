using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using IdeaVault.Models;

namespace IdeaVault.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class SampleDataController : Controller
    {

        [HttpGet]
        public IEnumerable<Idea> GetIdeas()
        {
            return SampleData;
        }

        [HttpGet("{id}")]
        public Idea GetIdea(string id){
            return new Idea{
                Id = id,
                Date = new DateTime(2017, 10, 2, 5, 24, 6),
                Content = "A simple web app that allows people to select their form of transport into the office and routes them through a random coffee and random donut shop to get there. Could use user's location from browser to determine starting point and give both visual and step by step instructions. Should work for walking, biking, and public transit.",
                Title = "Breakfast Route App",
                Comments = new List<Comment>()
            };
        }

        [HttpPost("add")]
        public Idea AddIdea([FromBody] Idea idea)
        {
            return SampleData.First();
        }

        [HttpDelete("{id}")]
        public void DeleteIdea(string id)
        {
            
        }

        [HttpPut("update")]
        public void UpdateIdea([FromBody] Idea idea)
        {
            
        }

        private static List<Idea> SampleData = new List<Idea>{
            new Idea{
                Id = "abc123",
                Date = new DateTime(2017, 10, 1, 5, 24, 6),
                Content = "This is a test of the new add feature",
                Title = "Test Title",
                Comments = new List<Comment>()
            },
            new Idea{
                Id = "def456",
                Date = new DateTime(2017, 10, 1, 6, 24, 6),
                Content = "An app that can store ideas so that devs and designers can pitch and discuss product ideas ",
                Title = "Idea App",
                Comments = new List<Comment>()
            },
            new Idea{
                Id = "ghi789",
                Date = new DateTime(2017, 10, 2, 5, 24, 6),
                Content = "A simple web app that allows people to select their form of transport into the office and routes them through a random coffee and random donut shop to get there. Could use user's location from browser to determine starting point and give both visual and step by step instructions. Should work for walking, biking, and public transit.",
                Title = "Breakfast Route App",
                Comments = new List<Comment>()
            },
            new Idea{
                Id = "jkl012",
                Date = new DateTime(2017, 10, 7, 5, 24, 6),
                Content = "A ride share app that is community driven and allows people with empty seats to fill them with people who don't have a ride. Allows more people to get up to the ski hill for less money and reduces the number of cars going. Riders could pitch for gas money over the app.",
                Title = "Sharelift",
                Comments = new List<Comment>()
            }

        };
    }
}

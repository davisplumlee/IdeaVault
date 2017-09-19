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
    public class IdeaController : Controller
    {

        [HttpGet]
        public Idea GetIdea()
        {
            var data = SampleData();
            
            return data as Idea;
        }

        [HttpPost("add")]
        public IEnumerable<Idea> AddIdea([FromBody] Idea idea){

            // Temporary methods
            var temp = new Idea();
            temp.Id = idea.Id;
            return (dynamic) temp;
        }

        private Idea SampleData()
        {
            var data = new Idea();
            data.Id = "12345";
            data.Date = new DateTime();
            data.Comments = new List<Comment>();
            data.Content = "Test Idea Content";

            var comment1 = new Comment();
            comment1.Content = "Test Comment 1";
            comment1.Date = new DateTime();
            comment1.Id = "11111";

            var comment2 = new Comment();
            comment2.Content = "Test Comment 2";
            comment2.Date = new DateTime();
            comment2.Id = "22222";

            data.Comments.Add(comment1);
            data.Comments.Add(comment2);

            return data;
        }
    }
}

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

        private readonly IQueryEngine _query;

        public IdeaController(IQueryEngine QueryEngine)
        {
            _query = QueryEngine;
        }

        [HttpGet]
        public IEnumerable<Idea> GetIdea()
        {
            return _query.GetItems<Idea>().Result;
        }

        [HttpPost("add")]
        public Idea AddIdea([FromBody] Idea idea)
        {
            return _query.CreateItemAsync(idea).Result;
        }

    }
}

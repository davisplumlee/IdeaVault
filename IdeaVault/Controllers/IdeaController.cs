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
        public IEnumerable<Idea> GetIdeas()
        {
            return _query.GetItems<Idea>().Result;
        }

        [HttpGet("{id}")]
        public Idea GetIdea(string id){
            return _query.GetItem<Idea>(id).Result;
        }

        [HttpPost("add")]
        public Idea AddIdea([FromBody] Idea idea)
        {
            return _query.CreateItemAsync(idea).Result;
        }

        [HttpDelete("{id}")]
        public void DeleteIdea(string id)
        {
            Idea temp = new Idea();
            temp.Id = id;
            _query.DeleteItemAsync<Idea>(temp);
        }

        [HttpPut("update")]
        public void UpdateIdea([FromBody] Idea idea)
        {
            _query.UpdateItemAsync<Idea>(idea);
        }
    }
}

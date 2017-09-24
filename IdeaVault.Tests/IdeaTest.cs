using System;
using Xunit;
using IdeaVault.Models;
using IdeaVault.Controllers;

namespace IdeaVault.Tests
{
    public class IdeaTest
    {

        private readonly IQueryEngine _query;

        public IdeaTest(IQueryEngine QueryEngine)
        {
            _query = QueryEngine;
        }

        [Fact]
        public void Create()
        {
            // var result = _query.CreateItemAsync<Idea>();
        }
    }
}

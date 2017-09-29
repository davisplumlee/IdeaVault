using System;
using System.Collections.Generic;
using Xunit;
using IdeaVault.Models;
using IdeaVault.Controllers;
using NSubstitute;

namespace IdeaVault.Tests
{
    public class IdeaTest
    {

        private IQueryEngine _query = Substitute.For<IQueryEngine>();

        [Fact]
        public void Create()
        {
            
        }

        private static Idea SampleIdea = new Idea
        {
            Content = "Sample Content",
            Date = new DateTime(),
            Comments = new List<Comment>()
        };

        
    }
}

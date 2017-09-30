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
        public void CreateIdea()
        {
            _query.CreateItemAsync(SampleIdea).Returns(SampleIdea);
            var ideaController = new IdeaController(_query);
            var result = ideaController.AddIdea(SampleIdea);
            Assert.Same(SampleIdea, result);
        }

        [Fact]
        public void GetIdea()
        {
            _query.GetItem<Idea>(SampleIdea.Id).Returns(SampleIdea);
            var ideaController = new IdeaController(_query);
            var result = ideaController.GetIdea(SampleIdea.Id);
            Assert.Same(SampleIdea, result);
        }

        [Fact]
        public void GetIdeas()
        {
            var SampleIdeas = new List<Idea>{SampleIdea};
            _query.GetItems<Idea>().Returns(SampleIdeas);
            var ideaController = new IdeaController(_query);
            var result = ideaController.GetIdeas();
            Assert.Same(SampleIdeas, result);
        }

        private static Idea SampleIdea = new Idea
        {
            Id = "123abc",
            Content = "Sample Content",
            Date = new DateTime(),
            Comments = new List<Comment>()
        };

        
    }
}

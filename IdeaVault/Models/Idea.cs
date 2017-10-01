using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace IdeaVault.Models
{
    public class Idea : IDbModel
    {
        [JsonIgnore]
        public string Collection => @"ideas";

        [JsonProperty(propertyName:"id")]
        public string Id { get; set; }

        [JsonProperty(propertyName:"date")]
        public DateTime Date { get; set; }

        [JsonProperty(propertyName:"content")]
        public string Content { get; set; }

        [JsonProperty(propertyName:"title")]
        public string Title { get; set; }

        [JsonProperty(propertyName:"comments")]
        public List<Comment> Comments { get; set; }
    }
}


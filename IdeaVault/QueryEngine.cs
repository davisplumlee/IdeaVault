using System;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using IdeaVault.Models;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.Azure.Documents.Linq;
using System.Configuration;

namespace IdeaVault
{
    public class QueryEngine : IQueryEngine
    {
        private readonly DocumentClient _client;

        /* Config Obj:
            * Endpoint - URI to link to database
            * AuthKey - Private key for db access
            * DatabaseId - Name/Id of database
        */
        private DatabaseConfig _config;
        // private static readonly string DatabaseId = ConfigurationManager.AppSettings["database"];
        // private static readonly string CollectionId = ConfigurationManager.AppSettings["collection"];
        // private static DocumentClient client;

        public QueryEngine(DatabaseConfig config)
        {
            _client = new DocumentClient(new Uri(config.Endpoint), config.AuthKey,
                new ConnectionPolicy {EnableEndpointDiscovery = false});
            _config = config;
            Initialize();
        }

        private async void Initialize()
        {
            await CreateDatabaseIfNotPresent();
        }

        private async Task CreateDatabaseIfNotPresent()
        {
            try
            {
                await _client.ReadDatabaseAsync(UriFactory.CreateDatabaseUri(_config.DatabaseId));
            }
            catch (DocumentClientException e)
            {
                if (e.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    await _client.CreateDatabaseAsync(new Database { Id = _config.DatabaseId });
                }
                else
                {
                    throw;
                }
            }
        }

        private async Task CreateCollectionIfNotExists(string collectionId)
        {
            try
            {
                await _client.ReadDocumentCollectionAsync(UriFactory.CreateDocumentCollectionUri(_config.DatabaseId, collectionId));
            }
            catch (DocumentClientException e)
            {
                if (e.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    await _client.CreateDocumentCollectionAsync(
                        UriFactory.CreateDatabaseUri(_config.DatabaseId),
                        new DocumentCollection { Id = collectionId },
                        new RequestOptions { OfferThroughput = 1000 });
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<T> CreateItemAsync<T>(T item) where T : IDbModel
        {
            await CreateCollectionIfNotExists(item.Collection);
            var temp = await _client.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(_config.DatabaseId, item.Collection), item);
            return (T) (dynamic) temp.Resource;
        }

        public async Task DeleteItemAsync<T>(T item) where T : IDbModel
        {
            await CreateCollectionIfNotExists(item.Collection);
            await _client.DeleteDocumentAsync(UriFactory.CreateDocumentUri(_config.DatabaseId, item.Collection, item.Id));
        }

        public async Task<T> GetItem<T>(string id) where T : IDbModel, new()
        {
            var type = new T();
            await CreateCollectionIfNotExists(type.Collection);

            try
            {
                return _client.ReadDocumentAsync<T>(UriFactory.CreateDocumentUri(_config.DatabaseId, type.Collection, id)).Result;
            }
            catch (DocumentClientException e)
            {
                if (e.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return default(T);
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<IEnumerable<T>> GetItems<T>() where T : IDbModel, new()
        {
            var type = new T();
            await CreateCollectionIfNotExists(type.Collection);
            var items = await _client.ReadDocumentFeedAsync(UriFactory.CreateDocumentCollectionUri(_config.DatabaseId, type.Collection), new FeedOptions { MaxItemCount = 200 });

            return items.Select(item => (T) item);
        }

        public async Task<IEnumerable<T>> GetItems<T>(Expression<Func<T, bool>> predicate) where T : IDbModel, new()
        {
            var type = new T();
            await CreateCollectionIfNotExists(type.Collection);

            IDocumentQuery<T> query = _client.CreateDocumentQuery<T>(
                UriFactory.CreateDocumentCollectionUri(_config.DatabaseId, type.Collection),
                new FeedOptions { MaxItemCount = -1 })
                .Where(predicate)
                .AsDocumentQuery();

            List<T> results = new List<T>();
            while (query.HasMoreResults)
            {
                results.AddRange(await query.ExecuteNextAsync<T>());
            }

            return results;
        }

        public async Task UpdateItemAsync<T>(T item) where T : IDbModel
        {
            await CreateCollectionIfNotExists(item.Collection);
            await _client.ReplaceDocumentAsync(UriFactory.CreateDocumentUri(_config.DatabaseId, item.Collection, item.Id), item);
        }
    }
}
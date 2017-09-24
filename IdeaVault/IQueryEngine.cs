using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using IdeaVault.Models;

namespace IdeaVault
{
    public interface IQueryEngine
    {
        Task<T> CreateItemAsync<T>(T item) where T : IDbModel;
        Task<T> GetItem<T>(string id) where T : IDbModel, new();
        Task<IEnumerable<T>> GetItems<T>() where T : IDbModel, new();
        Task<IEnumerable<T>> GetItems<T>(Expression<Func<T, bool>> predicate) where T : IDbModel, new();
        Task UpdateItemAsync<T>(T item) where T : IDbModel;
        Task DeleteItemAsync<T>(T item) where T : IDbModel;
    }
}
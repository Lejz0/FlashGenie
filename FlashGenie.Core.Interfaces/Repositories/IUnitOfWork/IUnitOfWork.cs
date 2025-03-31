
namespace FlashGenie.Core.Interfaces.Repositories.IUnitOfWork
{
    public interface IUnitOfWork
    {
        public Task SaveChangesAsync();
    }
}

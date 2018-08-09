using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

using BayAndSell2.Domain.Models;

namespace BayAndSell2.Domain.Repository
{
    public class MainEntityRepository
    {
        MainEntity mainEntity;
        public MainEntityRepository(MainEntity inpMainEntity)  {
            mainEntity = inpMainEntity;
        }

        public static MainEntity PostBigPhoto(SqlConnection connection, string guid)
        {
            MainEntity item = connection.Query<MainEntity>("PostBigPhoto", new { guid = guid }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return item;
        }

        public static MainEntity PostGetPhone(SqlConnection connection, string guid)
        {
            MainEntity item = connection.Query<MainEntity>("PostGetPhone", new { guid = guid }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return item;
        }

        public static MainEntity GetItemDetail(SqlConnection connection, string guid)
        {
            MainEntity item = connection.Query<MainEntity>("GetItemDetail", new { guid = guid }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return item;
        }

        public static MainEntity GetItem(SqlConnection connection, string guid)
        {
            MainEntity res = connection.Query<MainEntity>("[dbo].[GetMainEntityItem]", new { guid = guid }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return res;
        }

        public static List<MainEntity> GetListOfItems(SqlConnection connection)
        {
            var res = connection.Query<MainEntity>("[dbo].[GetListOfMainEntityItemsForIniGrid]", commandType: CommandType.StoredProcedure).ToList();
            return res;
        }

        /// <summary>
        /// input пока пустй, чтобы возвращать все значения, в будущем будут возвращаться только значения по введенному телефону
        /// </summary>

        public static List<Guid> GetAdvts(SqlConnection connection, string input)
        {
            var res = connection.Query<Guid>("[dbo].[GetAdvts]", commandType: CommandType.StoredProcedure).ToList();
            return res;
        }

        public static List<MainEntity> PostUpdatePrices(SqlConnection connection, string[] arrGuids)
        {
            List<MainEntity> retList = new List<MainEntity>();
            foreach (var elem in arrGuids)
            {
                MainEntity item = connection.Query<MainEntity>("[dbo].[PostUpdatePrice]", new { guid = elem }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                retList.Add(item);
            }
            return retList;
        }

        public void PerformSQLOperation(SqlConnection connection)
        {
            int res;
            switch (mainEntity.sqlOperation)
            {
                case "CREATE":
                    res = connection.Execute("[dbo].[InsertMainEntity]", mainEntity.prepareQueryParam(), commandType: CommandType.StoredProcedure);
                    break;
                case "UPDATE":
                    res = connection.Execute("[dbo].[UpdateMainEntity]", mainEntity.prepareQueryParam(), commandType: CommandType.StoredProcedure);
                    break;
            }
        }
    }
}

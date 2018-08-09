using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Newtonsoft.Json;
using BayAndSell2.Domain.Repository;
using BayAndSell2.Domain.Models;

namespace BuyAndSell2.Models
{
    public class MainEntityService
    {
        #region fromOld
        //public static string UpdateBidStatus(IConfiguration Config, BidBuyer obj)
        //{
        //    var conStr = Config.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value;
        //    using (SqlConnection connection = new SqlConnection(conStr))
        //    {
        //        var affectedRows = connection.Execute("UpdateBidStatus",
        //        new { guid = obj.guid, phone = obj.phone, offerPrice = obj.offerPrice, currentPrice = obj.currentPrice },
        //        commandType: CommandType.StoredProcedure);
        //    }
        //    return RefreshByGuid(Config, obj.guid);
        //}

        //private static void updateStatusAll(IConfiguration Config)
        //{
        //    var conStr = Config.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value;
        //    using (SqlConnection connection = new SqlConnection(conStr))
        //    {
        //        var affectedRows = connection.Execute("UpdateStatusAll", null, commandType: CommandType.StoredProcedure);
        //    }
        //}

        //public static string RefreshByGuid(IConfiguration Config, string guid)
        //{
        //    var conStr = Config.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value;
        //    Offer item;
        //    using (SqlConnection connection = new SqlConnection(conStr))
        //    {
        //        item = connection.Query<Offer>("RefreshByGuid", new { guid = guid }, commandType: CommandType.StoredProcedure).FirstOrDefault();
        //        if (item != null) item.SetCalculatedFields();
        //    }
        //    return JsonConvert.SerializeObject(item);
        //}
        #endregion

        /// <summary>
        /// Обертка для функций которые на вход получают что-то и возвращают мз базы объект MainEntity
        /// </summary>
        private static string _usingWrapperConInputRetStr<T,E>(IConfiguration Config, T input, Func<SqlConnection, T, E> method)
        {
            var conStr = Config.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value;
            E item = default(E);
            try
            {
                using (SqlConnection connection = new SqlConnection(conStr))
                {
                    item = method(connection, input);
                }
            }
            catch (Exception e)
            {
                //Logger.SaveErrToLog(e.Message, Config, clientIP);
            }
            return JsonConvert.SerializeObject(item);
        }

        public static string PostGetPhone(IConfiguration Config, string guid)
        {
            return _usingWrapperConInputRetStr(Config, guid, MainEntityRepository.PostGetPhone);
        }

        public static string PostBigPhoto(IConfiguration Config, string guid)
        {
            return _usingWrapperConInputRetStr(Config, guid, MainEntityRepository.PostBigPhoto);
        }

        public static string GetItemDetail(IConfiguration Config, string guid)
        {
            return _usingWrapperConInputRetStr(Config, guid, MainEntityRepository.GetItemDetail);
        }

        public static string GetOffer(IConfiguration Config, string guid)
        {
            return _usingWrapperConInputRetStr(Config, guid, MainEntityRepository.GetItem);
        }

        /// <summary>
        /// Получает список обновленных цен в режиме автоообновления
        /// </summary>
        public static string PostUpdatePrices(IConfiguration Config, string[] arrGuids)
        {
            return _usingWrapperConInputRetStr(Config, arrGuids, MainEntityRepository.PostUpdatePrices);
        }

        public static string GetAdvts(IConfiguration Config, string input)
        {
            return _usingWrapperConInputRetStr(Config, input, MainEntityRepository.GetAdvts);
        }

        public static string GetGuid(IConfiguration Config, string clientIP)
        {
            var guid = Guid.NewGuid().ToString();
            //var guid = string.Empty;
            //var conStr = Config.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value;
            //try
            //{
            //    using (SqlConnection connection = new SqlConnection(conStr))
            //    {
            //        IEnumerable<int> res;
            //        do
            //        {
            //            guid = Guid.NewGuid().ToString();
            //            res = connection.Query<int>("select  TOP 1 [UniqueGuid] from [dbo].[Offers] where [UniqueGuid] = @guid", new { Guid = guid });
            //        } while (res.Any());
            //    }
            //}
            //catch (Exception e)
            //{
            //    Logger.SaveErrToLog(e.Message, Config, clientIP);
            //}

            return guid;
        }

        public static string SaveData(IFormCollection forms, IConfiguration Config, string clientIP)
        {
            var conStr = Config.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value;
            string uniqueGuid;
            MainEntity mainEntity;
            if (forms["inSHidGuid"].ToString().Trim() != string.Empty)
            {
                uniqueGuid = forms["inSHidGuid"].ToString().Trim();
                mainEntity = MainEntity.Init(forms, clientIP, uniqueGuid, "UPDATE");
            }
            else
            {
                uniqueGuid = GetGuid(Config, clientIP);
                mainEntity = MainEntity.Init(forms, clientIP, uniqueGuid, "CREATE");
            }
            MainEntityRepository mainEntityRepository = new MainEntityRepository(mainEntity);

            try
            {
                using (SqlConnection connection = new SqlConnection(conStr))
                {
                    mainEntityRepository.PerformSQLOperation(connection);
                }
            }
            catch (Exception e)
            {
                //Logger.SaveErrToLog(e.Message, Config, clientIP);
            }
            return uniqueGuid;
        }

        public static string GetOffers(IConfiguration Config)
        {
            var conStr = Config.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value;
            //updateStatusAll(Config);
            ForGridInOfferListEntity list = null;
            try
            {
                using (SqlConnection connection = new SqlConnection(conStr))
                {
                    list = new ForGridInOfferListEntity(MainEntityRepository.GetListOfItems(connection));
                }
            }
            catch (Exception e)
            {
                //Logger.SaveErrToLog(e.Message, Config, clientIP);
            }

            return JsonConvert.SerializeObject(list);
        }
       
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using BuyAndSell2.Models;
using BayAndSell2.Domain.Models;
using Newtonsoft.Json;
using System.Globalization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BuyAndSell2.Controllers
{
    [Route("api/[controller]")]
    public class OffersListController : Controller
    {
        IConfiguration Config;

        public OffersListController(IConfiguration config)
        {
            Config = config;
        }

        // GET: api/values
        [HttpGet]
        public string Get()
        {
            return MainEntityService.GetOffers(Config);
        }

        //// GET api/values/5
        //[HttpGet("{id}")]
        //public void Get(string id)
        //{
        //}

        // POST api/values
        [HttpPost]
        [Route("PostDetail")]
        public string Post([FromBody]string guid)
        {
            return MainEntityService.GetItemDetail(Config, guid);
        }

        //[HttpPost]
        //[Route("PostBid")]
        //public string Post([FromBody]BidBuyer value)
        //{
        //    return SellerModel.UpdateBidStatus(Config, value);
        //}

        /// Заглушка для Random, для демонстрации
        private decimal StubForRandom(MainEntity obj)
        {
            decimal retVal = obj.currentPrice;
            string time = DateTime.Now.ToString("yyyyMMddHHmmss");
            if (obj.priceBehavior == "Random")
            {
                if (!HttpContext.Session.Keys.Contains(obj.uniqueGuid.ToString()))
                {
                    HttpContext.Session.SetString(obj.uniqueGuid.ToString(), time + "," + obj.currentPrice.ToString());
                }
                else
                {
                    var fromSession = HttpContext.Session.GetString(obj.uniqueGuid.ToString());
                    var strArr = fromSession.Split(",");
                    var lastTime = DateTime.ParseExact(strArr[0], "yyyyMMddHHmmss", CultureInfo.InvariantCulture);
                    var timeSpent = obj.getTimeSpent(lastTime);
                    if (timeSpent < obj.periodDuration)
                    {
                        retVal = Decimal.Parse(strArr[1]);
                    }
                    else
                    {
                        Random rnd1 = new Random();
                        retVal = rnd1.Next(Decimal.ToInt32(obj.minPrice / obj.stepDown), Decimal.ToInt32(obj.startPrice / obj.stepDown)) * obj.stepDown;
                        HttpContext.Session.SetString(obj.uniqueGuid.ToString(), time + "," + retVal.ToString());
                    }
                }
            }
            return retVal;
        }
        
        [HttpPost]
        [Route("PostUpdatePrices")]
        public string PostUpdatePrices([FromBody]string[] arrGuids)
        {
            var output = MainEntityService.PostUpdatePrices(Config, arrGuids);
            var obj = JsonConvert.DeserializeObject<List<MainEntity>>(output);
            foreach (var item in obj)
            {
                item.currentPrice = StubForRandom(item);
            }
            return JsonConvert.SerializeObject(obj);
        }

        [HttpPost]
        [Route("PostGetPhone")]
        public string PostGetPhone([FromBody]string guid)
        {
            return MainEntityService.PostGetPhone(Config, guid);
        }

        [HttpPost]
        [Route("PostBigPhoto")]
        public string PostBigPhoto([FromBody]string guid)
        {
            return MainEntityService.PostBigPhoto(Config, guid);
        }

        //[HttpPost]
        //[Route("PostRefresh")]
        //public string PostRefresh([FromBody]string guid)
        //{
        //    return SellerModel.RefreshByGuid(Config, guid);
        //}

        //// PUT api/values/5
        ////[HttpPut("{id}")]
        ////public void Put(int id, [FromBody]BidBuyer value)
        ////{
        ////    SellerModel.UpdateBidStatus(value);
        ////}

        //// DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}

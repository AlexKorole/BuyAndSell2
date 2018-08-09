using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Specialized;
using System.ComponentModel;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using BuyAndSell2.Models;

namespace BuyAndSell2.Controllers
{
    [Produces("application/json")]
    [Route("api/Seller")]
    public class SellerController : Controller
    {
        IConfiguration Config;
        public SellerController(IConfiguration config)
        {
            Config = config;
        }

        // POST api/values
        [HttpPost]
        public string Post()
        {
            var clientIp = string.Empty;
            if (Request.IsLocal())
                clientIp = Request.HttpContext.Connection.LocalIpAddress.ToString();
            else
                clientIp = Request.HttpContext.Connection.RemoteIpAddress.ToString();
            var forms = Request.Form;
            var giud =  MainEntityService.SaveData(forms, Config, clientIp);
            return giud;
        }

        // GET api/values/5
        [HttpGet("{guid}")]
        public string Get(string guid)
        {
            return MainEntityService.GetOffer(Config, guid);
        }

        // GET: api/values
        [HttpGet]
        public string GetAdvts() {
            return MainEntityService.GetAdvts(Config, null);
        }

    }
}
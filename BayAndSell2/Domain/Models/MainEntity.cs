using System;
using Microsoft.AspNetCore.Http;
using System.Data.SqlClient;
using Dapper;
using System.Data;
using System.Linq;
using System.Collections.Generic;

namespace BayAndSell2.Domain.Models
{
    public class MainEntity
    {
        public string category; // Категория
        public string advName; // Название объявления
        public string text; // Описание объявления
        public string address; // Адрес
        public string phone; // Телефон
        public string userName; // Имя
        public decimal startPrice; // Максимальная цена
        public decimal minPrice; // Минимальная цена
        public decimal stepDown; // Падение цены на 

        public decimal periodDuration; // шаг в единицах
        public string perTimeDown; // В чем считать (день, месяц и т.д.)

        public string clientIP; // IP адрес клиента

        public DateTime createdDate; //Дата создания
        public Guid uniqueGuid; //Уникальный идентификатор

        public string bigPhoto1; // большое фото 1
        public string bigPhoto2; // большое фото 2
        public string bigPhoto3; // большое фото 3
        public string bigPhoto4; // большое фото 4

        public string smallPhoto1; // маленькое фото 1
        public string smallPhoto2; // маленькое фото 2
        public string smallPhoto3; // маленькое фото 3
        public string smallPhoto4; // маленькое фото 4

        public int sellerPhoto1_H; // фото со сраницы ввода высота (seller) 1
        public int sellerPhoto1_W; // фото со сраницы ввода ширина (seller) 1
        public int sellerPhoto2_H; // фото со сраницы ввода высота (seller)  2
        public int sellerPhoto2_W; // фото со сраницы ввода ширина(seller)  2
        public int sellerPhoto3_H; // фото со сраницы ввода высота (seller)  3
        public int sellerPhoto3_W; // фото со сраницы ввода ширина(seller)  3
        public int sellerPhoto4_H; // фото со сраницы ввода высота (seller)  4
        public int sellerPhoto4_W; // фото со сраницы ввода ширина(seller)  4

        public string sqlOperation; // Тип операции в SQL - Create или Update

        public string priceBehavior;

        public decimal currentPriceRnd; // заглушка для Random
        public decimal currentPrice
        {
            get
            {
                if (periodDuration == 0) return -1;
                decimal ret = startPrice;
                var multix = getTimeSpent(createdDate);
                int periodKoef = (int)(multix / periodDuration);

                decimal cur = -1;
                switch (priceBehavior)
                {
                    case "MaxToMin":
                        cur = startPrice - (stepDown * periodKoef);
                        ret = cur > minPrice ? cur : minPrice;
                        break;
                    case "MinToMax":
                        cur = minPrice + (stepDown * periodKoef);
                        ret = cur < startPrice ? cur : startPrice;
                        break;
                    //case "Random":
                    //    Random rnd1 = new Random();
                    //    cur = rnd1.Next(Decimal.ToInt32(minPrice / stepDown), Decimal.ToInt32(startPrice / stepDown)) * stepDown;
                    //    ret = cur;
                    //    break;
                    case "FixedMax":
                        ret = startPrice;
                        break;
                    case "FixedMin":
                        ret = minPrice;
                        break;

                }
                return ret;
            }
            set
            {
                currentPriceRnd = value;
            }
        }

        public int getTimeSpent(DateTime createdDate)
        {
            int multix = 0;
            switch (perTimeDown)
            {
                case "секунда":
                    multix = Convert.ToInt32((DateTime.Now - createdDate).TotalSeconds);
                    break;
                case "минута":
                    multix = Convert.ToInt32((DateTime.Now - createdDate).TotalMinutes);
                    break;
                case "час":
                    multix = Convert.ToInt32((DateTime.Now - createdDate).TotalHours);
                    break;
                case "день":
                    multix = Convert.ToInt32((DateTime.Now - createdDate).TotalDays);
                    break;
                case "неделя":
                    multix = Convert.ToInt32((DateTime.Now - createdDate).TotalDays / 7);
                    break;
                case "месяц":
                    multix = Convert.ToInt32((DateTime.Now - createdDate).TotalDays / 30);
                    break;
            }
            return multix;
        }

        public static string SetAdvName(string inpSAdvertName, string taSAdvertName)
        {
            var advNameInp = string.IsNullOrEmpty(inpSAdvertName) ? "" : inpSAdvertName.Trim();
            var advNameTas = string.IsNullOrEmpty(taSAdvertName) ? "" : taSAdvertName.Trim();
            return string.IsNullOrEmpty(advNameInp) ? advNameTas : advNameInp;
        }

        public static decimal ConvertFromStringToDecimal(string inp)
        {
            decimal parsed;
            if (Decimal.TryParse(inp, out parsed))
            {
                return parsed;
            }
            else
            {
                return 0;
            }
        }

        public static int ConvertFromStringToInt(string inp)
        {
            int parsed;
            if (int.TryParse(inp, out parsed))
            {
                return parsed;
            }
            else
            {
                return 0;
            }
        }

        public static MainEntity Init(IFormCollection forms, string clientIP, string uniqueGuid, string operation)
        {
            var me = new MainEntity
            {
                category = forms["sCategory"].ToString(),
                advName = SetAdvName(forms["inpSAdvertName"].ToString(), forms["taSAdvertName"].ToString()),
                text = forms["taSText"].ToString(),
                address = forms["inpSFullAddress"].ToString(),
                phone = forms["inpSPhone"].ToString(),
                userName = forms["inpUserName"].ToString(),
                startPrice = ConvertFromStringToDecimal(forms["inpStartPrice"].ToString()),
                minPrice = ConvertFromStringToDecimal(forms["inpMinPrice"].ToString()),
                stepDown = ConvertFromStringToDecimal(forms["inpStepDown"].ToString()),
                periodDuration = ConvertFromStringToDecimal(forms["selDurationPerTimeDown"].ToString()),
                perTimeDown = forms["selPerTimeDown"].ToString(),
                clientIP = clientIP,
                createdDate = DateTime.Now,
                uniqueGuid = new Guid(uniqueGuid),
                bigPhoto1 = forms["imgCarousel1_Form"].ToString(),
                bigPhoto2 = forms["imgCarousel2_Form"].ToString(),
                bigPhoto3 = forms["imgCarousel3_Form"].ToString(),
                bigPhoto4 = forms["imgCarousel4_Form"].ToString(),
                smallPhoto1 = forms["imgCarousel1_Small"].ToString(),
                smallPhoto2 = forms["imgCarousel2_Small"].ToString(),
                smallPhoto3 = forms["imgCarousel3_Small"].ToString(),
                smallPhoto4 = forms["imgCarousel4_Small"].ToString(),

                sellerPhoto1_H = ConvertFromStringToInt(forms["imgCarousel1_Seller_H"].ToString()),
                sellerPhoto1_W = ConvertFromStringToInt(forms["imgCarousel1_Seller_W"].ToString()),
                sellerPhoto2_H = ConvertFromStringToInt(forms["imgCarousel2_Seller_H"].ToString()),
                sellerPhoto2_W = ConvertFromStringToInt(forms["imgCarousel2_Seller_W"].ToString()),
                sellerPhoto3_H = ConvertFromStringToInt(forms["imgCarousel3_Seller_H"].ToString()),
                sellerPhoto3_W = ConvertFromStringToInt(forms["imgCarousel3_Seller_W"].ToString()),
                sellerPhoto4_H = ConvertFromStringToInt(forms["imgCarousel4_Seller_H"].ToString()),
                sellerPhoto4_W = ConvertFromStringToInt(forms["imgCarousel4_Seller_W"].ToString()),

                sqlOperation = operation,
                priceBehavior = forms["priceBehavior"].ToString()
            };
            return me;
        }

        public object prepareQueryParam()
        {
            return new
            {
                category = category,
                advName = advName,
                text = text,
                address = address,
                phone = phone,
                userName = userName,
                startPrice = startPrice,
                minPrice = minPrice,
                stepDown = stepDown,
                periodDuration = periodDuration,
                perTimeDown = perTimeDown,
                clientIP = clientIP,
                createdDate = createdDate,
                uniqueGuid = uniqueGuid,
                bigPhoto1 = bigPhoto1,
                bigPhoto2 = bigPhoto2,
                bigPhoto3 = bigPhoto3,
                bigPhoto4 = bigPhoto4,
                smallPhoto1 = smallPhoto1,
                smallPhoto2 = smallPhoto2,
                smallPhoto3 = smallPhoto3,
                smallPhoto4 = smallPhoto4,
                sellerPhoto1_H = sellerPhoto1_H,
                sellerPhoto1_W = sellerPhoto1_W,
                sellerPhoto2_H = sellerPhoto2_H,
                sellerPhoto2_W = sellerPhoto2_W,
                sellerPhoto3_H = sellerPhoto3_H,
                sellerPhoto3_W = sellerPhoto3_W,
                sellerPhoto4_H = sellerPhoto4_H,
                sellerPhoto4_W = sellerPhoto4_W,
                priceBehavior = priceBehavior
            };
        }
    }
}
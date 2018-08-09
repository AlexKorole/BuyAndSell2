using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BayAndSell2.Domain.Models
{
    public class ForGridInOfferListEntity
    {
        public int draw;
        public int recordsTotal;
        public int recordsFiltered;
        public List<MainEntity> data;

        public ForGridInOfferListEntity(List<MainEntity> data)
        {
            this.data = data;
            draw = 1;
            recordsTotal = data.Count;
            recordsFiltered = data.Count;
        }
    }
}

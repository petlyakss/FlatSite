using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlatSite.Models
{
    public class HomeIndexModel
    {
        public List<string> mainContext { get; set; }
        public string bottomText { get; set; }
        public HomeIndexModel()
        {
            mainContext = new List<string>();
        }
    }
}
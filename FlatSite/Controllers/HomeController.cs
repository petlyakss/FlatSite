using FlatSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FlatSite.Controllers
{
    public class HomeController : Controller
    {
        HomeIndexModel homeindex = new HomeIndexModel();

        public ActionResult Index()
        {
            homeindex.bottomText = "Это прежде всего гарантия результата. Вы получаете именно ту кваритру, которую выбрали по фотографиям. У нас нет “темных лошадок”, специалисты нашей компании лично осматривают объект и лишь затем размещают его на сайте.";
            homeindex.mainContext.Add(" 	1Основным видом деятельности компании является предоставление в краткосрочную аренду жилых помещений, находящихся в нашем непосредственном управлении. Мы гарантируем полное соответствие размещенных на сайте квартир их описанию и представленным фотографиям.Это прежде всего гарантия результата. Вы получаете именно ту кваритру, которую выбрали по фотографиям. У нас нет “темных лошадок”, специалисты нашей компании лично осматривают объект и лишь затем размещают его на сайте.");
            homeindex.mainContext.Add("     Это прежде всего гарантия результата. Вы получаете именно ту кваритру, которую выбрали по фотографиям. У нас нет “темных лошадок”, специалисты нашей компании лично осматривают объект и лишь затем размещают его на сайте.");
            homeindex.mainContext.Add("     Это прежде всего гарантия результата. Вы получаете именно ту кваритру, которую выбрали по фотографиям. У нас нет “темных лошадок”, специалисты нашей компании лично осматривают объект и лишь затем размещают его на сайте.");
            homeindex.mainContext.Add("     Это прежде всего гарантия результата. Вы получаете именно ту кваритру, которую выбрали по фотографиям. У нас нет “темных лошадок”, специалисты нашей компании лично осматривают объект и лишь затем размещают его на сайте.");
            ViewBag.Content = homeindex;
            return View();
        }

        public ActionResult ReserverAndPaid()
        {
            return View();
        }
        public ActionResult Contacts()
        {
            return View();
        }
        public ActionResult Partners()
        {
            return View();
        }
        public ActionResult Cooperation()
        {
            return View();
        }
        public ActionResult QuestionsAndAnswers()
        {
            return View();
        }
        public ActionResult Reviews()
        {
            return View();
        }
        public ActionResult Flat()
        {
            return View();
        }
        public ActionResult flat1()
        {
            return View();
        }
    }
}
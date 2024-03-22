using BTL.DTO;
using BTL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace BTL.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private DictionaryContext _dBDic { get; set; }
        public HomeController(ILogger<HomeController> logger, DictionaryContext dictionaryContext)
        {
            _logger = logger;
            this._dBDic = dictionaryContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        [Route("addNewWord")]
        public ActionResult addWord([FromBody] WordDTO data)
        {
            this._dBDic.addNewWord(data.IdLanguage, data.IdLanguageTrans, data.IdWordtype, data.IdUser, data.SWord, data.SExample, data.SDefinition,data.SWordTrans);
            return Json(data);
        }


        [HttpGet]
		[Route("searchWord")]
		public List<WordSearch> searchWord(int Id_Language, int Id_Language_trans, string sWord)
		{
			List<WordSearch> w = this._dBDic.searchWord(Id_Language, Id_Language_trans, sWord).ToList();
			return w;
		}

		[HttpGet]
		[Route("preSearchWord")]
		public List<WordSearch> preSearchWord(int Id_Language, int Id_Language_trans, string sWord)
		{
			List<WordSearch> w = this._dBDic.preSearchWord(Id_Language, Id_Language_trans, sWord).ToList();
			return w;
		}

        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(TblUser tblUser)
        {
            Console.WriteLine(tblUser);
            if (ModelState.IsValid)
            {
                if (_dBDic.TblUsers.Any(x => x.SEmail == tblUser.SEmail))
                {
                    ViewBag.Message = "Email đã tồn tại";
                }
                else
                {
                    _dBDic.TblUsers.Add(tblUser);
                    _dBDic.SaveChanges();
                    TempData["Message"] = "Đăng ký tài khoản thành công";
                    Response.Redirect("/Home/Login");
				}
            }
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(TblUser tblUser)
        {
            var us = _dBDic.TblUsers.SingleOrDefault(m => m.SEmail == tblUser.SEmail && m.SPassword == tblUser.SPassword);
            if (us != null) {
                TempData["SuccessfullyLogIn"] = "Đăng nhập thành công";
                TempData["role"] = $"{us.SRole}";
				TempData["id"] = $"{us.Id}";
				return RedirectToAction("Index", "Home");
            }
/*            else
            {
                TempData["ErrorInLogIn"] = "Tên tài khoản hoặc mật khẩu không chính xác";
            }*/
            return View();
        }
    }
}

using BTL.Models;
using Microsoft.AspNetCore.Mvc;
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
        public IActionResult addWord(int Id_Language, int Id_Language_trans, int Id_wordtype, int Id_user, string sWord, string sExample, string sDefinition)
        {
            this._dBDic.addNewWord(Id_Language, Id_Language_trans, Id_wordtype, Id_user, sWord, sExample, sDefinition);
            return View("Index");
        }


		[HttpGet]
		[Route("searchWord")]
		public List<WordSearch> searchWord(int Id_Language, int Id_Language_trans, string sWord)
		{
			//List<TblWord> tblWords =  this._dBDic.searchWord(Id_Language, Id_Language_trans, sWord).ToList();
			List<WordSearch> w = this._dBDic.searchWord(Id_Language, Id_Language_trans, sWord).ToList();
			return w;
		}

	}
}

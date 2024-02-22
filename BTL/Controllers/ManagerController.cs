using BTL.DTO;
using BTL.Models;
using Microsoft.AspNetCore.Mvc;

namespace BTL.Controllers
{
    public class ManagerController : Controller
    {
        private readonly ILogger<ManagerController> _logger;
        private DictionaryContext _dBDic { get; set; }
        public ManagerController(ILogger<ManagerController> logger, DictionaryContext dictionaryContext)
        {
            _logger = logger;
            this._dBDic = dictionaryContext;
        }
        [HttpGet]
        [Route("/manager/word")]
        public IActionResult Index()
        {
            return View();
        }

		[HttpGet]
		[Route("/manager/user")]
		public IActionResult ManagerUser()
		{
            List<TblUser> users = this._dBDic.getAllUser().ToList(); ;
			return View("managerUser",users);
		}



        [HttpPost]
        [Route("/manager/user/upgrade")]
        public IActionResult UpGradeUserRole([FromBody] TblUser data)
        {
            this._dBDic.UpgradeRoleUser(data.Id, data.SRole);
            return Json(data);
        }


        [HttpDelete]
        [Route("/manager/user/delete")]
        public IActionResult deleteUser([FromBody] TblUser data)
        {
            this._dBDic.deleteUser(data.Id);
            return Json(data);
        }
    }
}

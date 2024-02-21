using Microsoft.AspNetCore.Mvc;

namespace BTL.Controllers
{
    public class ManagerController : Controller
    {
        [HttpGet]
        [Route("/manager")]
        public IActionResult Index()
        {
            return View();
        }
    }
}

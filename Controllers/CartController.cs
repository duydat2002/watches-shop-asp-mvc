using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using WatchesShop.Models;

namespace WatchesShop.Controllers;

public class CartController : Controller
{

    public CartController()
    {
    }

    public IActionResult Index()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

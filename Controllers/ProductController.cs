using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using WatchesShop.Models;

namespace WatchesShop.Controllers;

public class ProductController : Controller
{

    public ProductController()
    {
    }

    [Route("products/{category?}")]
    public IActionResult Index(string category)
    {
        switch (category)
        {
            case "men-watches":
                ViewData["category"] = "Men Watches";
                break;
            case "women-watches":
                ViewData["category"] = "Women Watches";
                break;
            case "sport-watches":
                ViewData["category"] = "Sport Watches";
                break;
            case "luxury-watches":
                ViewData["category"] = "Luxury Watches";
                break;
            default:
                return RedirectToAction("PageNotFound", "Home");
        }
        return View();
    }

    [Route("product/{id}")]
    public IActionResult Product(int id)
    {

        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

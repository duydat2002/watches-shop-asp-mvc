using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using WatchesShop.Models;

namespace WatchesShop.Controllers;

public class ProductController : Controller
{
    private WatchesShopContext _entityContext { get; }

    public ProductController(WatchesShopContext entityContext)
    {
        _entityContext = entityContext;
    }

    [Route("products/{category?}")]
    public IActionResult Index(string category)
    {
        switch (category)
        {
            case "men-watches":
                ViewData["category"] = "Men Watches";
                ViewData["categoryName"] = "Men";
                break;
            case "women-watches":
                ViewData["category"] = "Women Watches";
                ViewData["categoryName"] = "Women";
                break;
            case "sport-watches":
                ViewData["category"] = "Sport Watches";
                ViewData["categoryName"] = "Sport";
                break;
            case "luxury-watches":
                ViewData["category"] = "Luxury Watches";
                ViewData["categoryName"] = "Luxury";
                break;
            default:
                return RedirectToAction("PageNotFound", "Home");
        }

        ViewBag.sizes = _entityContext.GetSizes();
        ViewBag.colors = _entityContext.GetColors();

        return View();
    }

    [Route("products/filter")]
    public IActionResult Filter(string search = "", string categories = "", string colors = "", string sizes = "", string price = "", int pageNumber = 1, int pageSize = 10, string sort = "auto")
    {
        float priceStart = 0, priceEnd = float.MaxValue;

        if (price != "")
        {
            string[] prices = price.Split('-');
            priceStart = float.Parse(prices[0]);
            if (prices[1] != "inf")
            {
                priceEnd = float.Parse(prices[1]);
            }
        }

        var products = _entityContext.FilterProducts(search, categories, colors, sizes, priceStart, priceEnd, pageNumber, pageSize, sort);

        Console.WriteLine("sort: " + sort);

        return PartialView("_ProductItem", products);
    }

    [Route("product/{id}")]
    public IActionResult Product(int id)
    {

        return View();
    }

    [Route("test")]
    public IActionResult TestNha()
    {
        return View();
    }



    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

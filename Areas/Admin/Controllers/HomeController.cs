using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using WatchesShop.Models;

namespace WatchesShop.Areas.Admin.Controllers
{
  [Area("Admin")]
  public class HomeController : Controller
  {
    private IWebHostEnvironment _environment;
    private WatchesShopContext _entityContext { get; }


    public HomeController(IWebHostEnvironment environment, WatchesShopContext entityContext)
    {
      _environment = environment;
      _entityContext = entityContext;
    }

    public IActionResult Index()
    {
      return View();
    }

    [HttpGet]
    public IActionResult Upload()
    {
      ViewData["Sizes"] = new SelectList(_entityContext.Sizes, "SizeId", "SizeName");
      return View();
    }

    [HttpPost]
    public async Task<IActionResult> Upload(IFormFile productImage)
    {
      try
      {
        if (productImage != null)
        {
          string _fileName = Path.GetFileName(productImage.FileName);
          string path = Path.Combine(_environment.ContentRootPath, "wwwroot", "image", "products", _fileName);

          using (var fileStream = new FileStream(path, FileMode.Create))
          {
            await productImage.CopyToAsync(fileStream);
            ViewBag.FileStatus = "File uploaded successfully.";
          }
        }
      }
      catch (System.Exception)
      {
        ViewBag.FileStatus = "Error while file uploading.";
      }
      return View("Upload");
    }
  }
}
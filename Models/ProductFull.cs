namespace WatchesShop.Models;

public class ProductFull
{
  public Product? Product { get; set; }

  public ProductVariant? ProductVariant { get; set; }

  public ProductCategory? ProductCategory { get; set; }

  public ProductImage? ProductImage { get; set; }

  public IEnumerable<Category>? Categories { get; set; }

  public IEnumerable<Color>? Colors { get; set; }

  public IEnumerable<Size>? Sizes { get; set; }
}
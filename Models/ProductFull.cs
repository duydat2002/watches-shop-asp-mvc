namespace WatchesShop.Models;

public class ProductFull
{
  public int CategoryId { get; set; }

  public string CategoryName { get; set; } = null!;

  public int ProductId { get; set; }

  public string ProductName { get; set; } = null!;

  public int ProductCategoryId { get; set; }

  public int ProductVariantId { get; set; }

  public int ColorId { get; set; }

  public int SizeId { get; set; }

  public double Price { get; set; }

  public int Quantity { get; set; }

  public string SizeName { get; set; } = null!;

  public string ColorName { get; set; } = null!;

  public string ColorValue { get; set; } = null!;

  public int ProductImageId { get; set; }

  public string ProductImagePath { get; set; } = null!;

  public string ProductImages { get; set; } = null!;
  public string Colors { get; set; } = null!;
  public string Sizes { get; set; } = null!;
}
// public class ProductFull
// {
//   public Product? Product { get; set; }

//   public ProductVariant? ProductVariant { get; set; }

//   public ProductCategory? ProductCategory { get; set; }

//   public ProductImage? ProductImage { get; set; }

//   public IEnumerable<Category>? Categories { get; set; }

//   public IEnumerable<Color>? Colors { get; set; }

//   public IEnumerable<Size>? Sizes { get; set; }
// }
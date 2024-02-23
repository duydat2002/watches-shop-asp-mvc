namespace WatchesShop.Models;

public class ProductFilterView
{
  public int ProductId { get; set; }

  public string ProductName { get; set; } = null!;

  public double MinPriceSale { get; set; }

  public double MaxPriceSale { get; set; }

  public double MaxPrice { get; set; }

  public int MaxDiscount { get; set; }

  public string Colors { get; set; } = null!;

  public string Sizes { get; set; } = null!;

  public string ProductImages { get; set; } = null!;
}
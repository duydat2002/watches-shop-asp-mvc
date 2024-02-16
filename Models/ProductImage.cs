using System;
using System.Collections.Generic;

namespace WatchesShop.Models;

public partial class ProductImage
{
    public int ProductImageId { get; set; }

    public int ProductVariantId { get; set; }

    public string ProductImagePath { get; set; } = null!;

    public virtual ProductVariant ProductVariant { get; set; } = null!;
}

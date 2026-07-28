function formatValue(value) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getBestSellingProducts(data, startDate = null, endDate = null) {
  return data.brands.map((brand) => {
    // Get all products for this brand
    const brandProducts = data.products.filter(
      (product) => product.brand_ID === brand.brand_ID,
    );

    // Calculate total quantity sold for each product
    const productSales = brandProducts.map((product) => {
      const totalQty = data.saleItems
        .filter((sale) => {
          if (sale.product_ID !== product.product_ID) return false;

          if (startDate && sale.date < startDate) return false;
          if (endDate && sale.date > endDate) return false;

          return true;
        })
        .reduce((sum, sale) => sum + sale.qty, 0);

      return {
        ...product,
        totalQty,
      };
    });

    // Find the best-selling product
    const bestSeller = productSales.reduce((best, current) => {
      if (current.totalQty > best.totalQty) {
        return current;
      }

      if (current.totalQty < best.totalQty) {
        return best;
      }

      // Tie-breaker: higher-priced product wins
      return current.price > best.price ? current : best;
    }, productSales[0]);

    return {
      brand_name: brand.brand_name,
      best_selling_product: bestSeller.prod_name,
      qty_sold: bestSeller.totalQty,
      brand_id: brand.brand_ID,
    };
  });
}

(async function () {
  const tbody = document.getElementById("tbody");
  const cards = document.getElementById("cards");

  // Load JSON
  const data = await fetch("data/data.json").then((r) => r.json());

  // Create lookup tables
  const brands = {};
  const products = {};

  const bestSellers = getBestSellingProducts(data);

  data.brands.forEach((brand) => {
    brands[brand.brand_ID] = {
      name: brand.brand_name,
      qty: 0,
      sales: 0,
      bestProduct: bestSellers.find((item) => item.brand_id === brand.brand_ID),
      bestQty: 0,
    };
  });

  data.products.forEach((product) => {
    products[product.product_ID] = product;
  });

  // Calculate totals
  data.saleItems.forEach((sale) => {
    const product = products[sale.product_ID];

    if (!product) return;

    const brand = brands[product.brand_ID];

    if (!brand) return;

    brand.qty += Number(sale.qty);
    brand.sales += Number(sale.qty) * Number(product.price);
  });

  // Build HTML
  tbody.innerHTML = "";

  Object.values(brands).forEach((brand) => {
    tbody.innerHTML += `
      <tr>
        <td>${brand.name}</td>
        <td>${brand.bestProduct.best_selling_product} (${brand.bestProduct.qty_sold} pc)</td><td>${brand.qty}</td>
        <td>$${formatValue(brand.sales)}</td>
      </tr>
    `;

    cards.innerHTML += `
        <div class="mcard">
            <div>Brand: ${brand.name}</div>
            <div>Best Product: ${brand.bestProduct.best_selling_product} (${brand.bestProduct.qty_sold} pc)</div>
            <div>Qty Sold: ${brand.qty}</div>
            <div>$${formatValue(brand.sales)}</div>
        </div>`;
  });
})();

function formatValue(value) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
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

  data.brands.forEach((brand) => {
    brands[brand.brand_ID] = {
      name: brand.brand_name,
      qty: 0,
      sales: 0,
      bestProduct: "",
      bestQty:0,
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
        <td>${brand.bestProduct}</td><td>${brand.qty}</td>
        <td>$${formatValue(brand.sales)}</td>
      </tr>
    `;

    cards.innerHTML += `
        <div class="mcard">
            <div>Brand: ${brand.name}</div>
            <div>Qty Sold: ${brand.qty}</div>
            <div>$${formatValue(brand.sales)}</div>
        </div>`;
  });
})();

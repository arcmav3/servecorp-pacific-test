const loader = document.getElementById("loader");
const tbody = document.getElementById("tbody");
const cards = document.getElementById("cards");
const result = document.getElementById("result");
const productSelect = document.getElementById("productSelect");

async function load() {
  loader.hidden = false;
  const data = await fetch("data/data.json").then((r) => r.json());
  loader.hidden = true;
  const sales = data.saleItems;

  const brands = data.brands.reduce((obj, brand) => {
    obj[brand.brand_ID] = brand.brand_name;
    return obj;
  }, {});

  const productSelectOption = [`<option value="">Select Product</option>`];
  const products = data.products.reduce((obj, product) => {
    obj[product.product_ID] = product.prod_name;
    productSelectOption.push(
      `<option value="${product.product_ID}">${product.prod_name}</option>`,
    );
    productSelect.append(`<option>${product.prod_name}</option>`);
    return obj;
  }, {});

  productSelect.innerHTML = productSelectOption;

  function render() {
    const f = document.getElementById("from").value;
    const t = document.getElementById("to").value;
    const select = productSelect.value;

    const filteredSales = sales.filter(
      (s) =>
        (!f || s.date >= f) &&
        (!t || s.date <= t) &&
        (!select || s.product_ID == select),
    );
    tbody.innerHTML = "";
    cards.innerHTML = "";

    filteredSales.forEach((s) => {
      loader.hidden = true;
      tbody.innerHTML += `
        <tr>
            <td>${s.saleItem_ID}</td>
            <td>${products[s.product_ID]}</td>
            <td>${s.date}</td>
            <td>${s.qty}</td>
        </tr>
    `;

      cards.innerHTML += `
        <div class="mcard">
            <div>#${s.saleItem_ID}</div>
            <div>Product: ${products[s.product_ID]}</div>
            <div>${s.date}</div>
            <div>Qty: ${s.qty}</div>
        </div>
    `;
    });

    result.innerHTML = filteredSales.length;
    //console.log(filteredSales.length);
  }
  document.querySelectorAll("input, select").forEach((i) => {
    i.oninput = render;
    i.onchange = render;
  });

  const form = document.getElementById("filterForm");
  const button = document.getElementById("filterReset");

  button.addEventListener("click", () => {
    form.reset();
    render();
  });

  render();
}
load();

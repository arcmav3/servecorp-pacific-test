# SQL / Logic Assessment

## Objective

Retrieve the following information for **each brand** within a selected
date range and return it as a **single result table**:

-   Brand Name
-   Best-selling Product
-   Total Quantity of Items Sold
-   Total Sales Value

------------------------------------------------------------------------

## SQL Query

``` sql
-- Input Parameters
-- :startDate
-- :endDate

SELECT
    b.brand_name,

    (
        SELECT p2.prod_name
        FROM Products p2
        INNER JOIN SaleItems s2
            ON p2.product_ID = s2.product_ID
        WHERE
            p2.brand_ID = b.brand_ID
            AND s2.date BETWEEN :startDate AND :endDate
        GROUP BY p2.product_ID, p2.prod_name
        ORDER BY SUM(s2.qty) DESC
        LIMIT 1
    ) AS best_selling_product,

    SUM(si.qty) AS total_items_sold,

    SUM(si.qty * p.price) AS total_sales_value

FROM Brands b
INNER JOIN Products p
    ON b.brand_ID = p.brand_ID
INNER JOIN SaleItems si
    ON p.product_ID = si.product_ID

WHERE si.date BETWEEN :startDate AND :endDate

GROUP BY
    b.brand_ID,
    b.brand_name

ORDER BY
    b.brand_name;
```

------------------------------------------------------------------------

## Logic Flow

1.  Receive the **Start Date** and **End Date**.
2.  Join the **Brands**, **Products**, and **SaleItems** tables.
3.  Filter sales using the selected date range.
4.  Group records by brand.
5.  Calculate:
    -   **Total Quantity Sold** using `SUM(si.qty)`.
    -   **Total Sales Value** using `SUM(si.qty * p.price)`.
6.  Determine the **Best-selling Product** by finding the product with
    the highest quantity sold for each brand.
7.  Return one row per brand.

------------------------------------------------------------------------

## Sample Output

  Brand Name   Best-selling Product   Qty Sold   Sales Value
  ------------ ---------------------- ---------- -------------
  Apple        iPhone 16              120        \$119,880
  Samsung      Galaxy S25             95         \$84,550
  Sony         PlayStation 5          64         \$31,999

------------------------------------------------------------------------

This solution demonstrates:

-   SQL JOINs
-   Filtering using `BETWEEN`
-   Aggregate functions (`SUM`)
-   Correlated subqueries
-   `GROUP BY`
-   Returning a summarized result per brand

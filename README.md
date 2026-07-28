# Vanilla JavaScript Sales Dashboard

A simple **3-page responsive website** built with **HTML, CSS, and
Vanilla JavaScript** for the front-end assessment.

## Features

-   Responsive layouts for desktop, tablet, and mobile
-   Reusable HTML components loaded with `fetch()`
-   Dynamic data loaded from local JSON files
-   Transactions page with filtering
-   Report page with aggregated sales information
-   No frameworks or back-end required

## Project Structure

``` text
/
├── index.html
├── transactions.html
├── report.html
├── header.html
├── css/
├── js/
├── data/
├── README.md
└── SQL_Logic_Assessment.md
```

## Running the Project

This project uses the **Fetch API** to load HTML components and JSON
data. Opening the files directly (`file://`) will prevent the requests
from working due to browser security restrictions.

Start a local HTTP server:

``` bash
python -m http.server 8000
```

Then open your browser and navigate to:

``` text
http://localhost:8000
```

## Technologies

-   HTML5
-   CSS3
-   Vanilla JavaScript (ES6)
-   Fetch API
-   JSON

## Responsive Design

The website provides distinct layouts for:

-   Desktop
-   Tablet
-   Mobile

These include responsive navigation, desktop tables, and mobile-friendly
card layouts.

## Dynamic Features

-   Load data from local JSON files
-   Dynamic transaction filtering
-   Sales report generation
-   Responsive mobile card view

## SQL / Logic Assessment

The SQL assessment is **separate from the front-end project**, as
requested in the assessment instructions.

It is included in this submission as:

``` text
SQL_Logic_Assessment.md
```

The document contains:

-   SQL query to retrieve:
    -   Brand Name
    -   Best-selling Product (within a date range)
    -   Total Quantity Sold
    -   Total Sales Value
-   Step-by-step logic explanation
-   Sample expected output

## Notes

This project was intentionally built without front-end frameworks to
demonstrate core HTML, CSS, responsive design, and vanilla JavaScript
skills.

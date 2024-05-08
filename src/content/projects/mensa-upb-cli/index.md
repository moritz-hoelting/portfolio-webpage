---
title: "Mensa UPB Command-line tool"
summary: "CLI tool for viewing which meals are offered at the mensa of my university"
date: 2023-10-17
draft: false
tags:
    - Rust
repoUrl: https://github.com/moritz-hoelting/mensa-upb-cli
---

A small tool I wrote in Rust for checking which meals I can eat at university.

![Demo of the tool](./demo.png)

Allows choosing the day, the locations and which prices to show.

It works by parsing the command-line arguments with [clap](https://crates.io/crates/clap) and [asynchronously](https://crates.io/crates/tokio) [requesting](https://crates.io/crates/reqwest) and [scraping](https://crates.io/crates/scraper) the webpage. The gathered data is filtered and displayed as a [table](https://crates.io/crates/comfy-table).

## Usage

-   Show the menu for today

    ```bash
    mensa-upb-cli
    ```

-   Show the help screen

    ```bash
    mensa-upb-cli --help
    ```

-   Show the menu of the third next day

    ```bash
    mensa-upb-cli -d 3
    ```

-   Show the menu of a different mensa

    ```bash
    mensa-upb-cli -m grill-cafe
    ```

-   Show the only the prices for students
    ```bash
    mensa-upb-cli -p student
    ```

## How it is made

My university has multiple cafeterias and a website with the menu of each one. I did not like checking multiple pages when choosing what and where to eat.

Therefore I decided to build an application that would make this process easier. My solution had 4 steps:

1. Read the user input
2. Fetch the data
3. Filter the data based on user input
4. Output the data in a readable way

### 1. Reading user input

For reading the cli arguments, I choose [clap](https://crates.io/crates/clap) which is a popular library and very easy to use by deriving the traits.

```rust
#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct Cli {
    /// Choose the mensa
    #[arg(short, long, value_enum, default_values_t = [Mensa::Forum, Mensa::Academica])]
    mensa: Vec<Mensa>,
    /// Choose the price level
    #[arg(short, long)]
    price_level: Option<PriceLevel>,
    /// Choose how many days in the future to fetch
    #[arg(short, long)]
    days_ahead: Option<u64>,
    /// Filter by extras
    #[arg(short, long)]
    extras: Vec<String>,
}
```

### 2. Fetch the data

Because there is no API for our cafeteria, I had to scrape the website. The tools I used are [reqwest](https://crates.io/crates/reqwest) for fetching the html and [scraper](https://crates.io/crates/scraper) for extracting the required information from the html.

### 3. Filter the data based on user input

Filtering is done at multiple places:

-   only fetch and parse the pages of the cafeterias requested and the day selected
-   filter which price level to show (student, employee, guest)
-   filter which meals match the selected extra (vegetarian, vegan)

### 4. Output the data in a readable way

For readability, I choose to display the meals in a table. Also I wanted to group the meals by categorie (main dishes, side dishes and desserts). A nice library I found for printing tables to the terminal is [comfy-table](https://crates.io/crates/comfy-table). It allows customizing the borders and alignment of each cell.

```rust
let mut desserts_row = Row::new();
desserts_row.add_cell(
    Cell::from("Desserts")
        .set_alignment(CellAlignment::Center)
        .add_attribute(comfy_table::Attribute::Underlined)
        .add_attribute(comfy_table::Attribute::OverLined),
);
```

## Source Code

If you want to take a look at the source code, it is available on my [GitHub](https://github.com/moritz-hoelting/mensa-upb-cli). You could even try to adapt the web requesting and scraping to the cafeteria you go to.

---
title: "Shulkerscript"
summary: "Compiler for Minecraft Datapacks"
date: 2024-10-01
draft: false
tags:
    - Rust
demoUrl: https://shulkerscript.hoelting.dev/playground/
repoUrl: https://github.com/moritz-hoelting/shulkerscript-cli
---

## Backstory

Some of my first experiences with programming I had in Minecraft, expanding the game mechanics with my own datapacks. Not long into this, I found a project by [Stevertus](https://stevertus.com), called [mcscript](https://mcscript.stevertus.com).
This provided an abstraction over plain `.mcfunction` files, for example the grouping of execute commands. When I learned about logical operators, I was amazed and thought about what would be possible with this new ability, as it was impractical using plain execute commands that did not offer any operators. But my expectations where crushed soon after as I noticed it had the same pitfalls:

-   when using OR, e.g. `A || B`, and both `A` and `B` would be true, the following command would run twice.
-   when having multiple commands inside the `if`-block and a former command would falsify the condition, all later commands would not run as the condition was checked for each command individually.
-   when using `else` and the condition is true, the `if`-block is executed. a wrong command could lead to the `else`-block being run, too, just like the previous example.

This frustrated me, as I couldn't use the tool for what I wanted. Nevertheless, I used mcscript for all my projects and was really happy with it.

Some time later, after I taught myself some programming, I had the goal to create a better version of this, but it did not go well, as I had no real experience undertaking such a project.

But now, years later, I stumbled upon my old project and felt like now I had a chance of making it work. Even though I am no longer active in the datapack community, I wanted to give back to other people having the same ideas and are missing the tools for it.

## The project

Shulkerscript is a compiler for datapacks. It is written in Rust and compiles multiple `.shu` files into a datapack. It comes with a [cli](https://crates.io/crates/shulkerscript-cli), but can also be compiled to WASM and [run directly in the browser](https://shulkerscript.hoelting.dev/playground).

It allows for multiple function and tag declarations in one file, right where you need them, as well as execute groupings and complex condition combinations. A full overview of the syntax can be found [here](https://shulkerscript.hoelting.dev/guides/syntax/).

The compiler is written without any libraries for tokenizing, parsing and transpiling, and only has third-party dependencies for a better developer experience (like [derive_more](https://crates.io/crates/derive_more), [getset](https://crates.io/crates/getset), [itertools](https://crates.io/crates/itertools), etc.) and for optional [serialization](https://crates.io/crates/serde) and [lua](https://crates.io/crates/mlua) support.

## Thanks

I want to thank Stevertus for the amazing tool he created. Currently, he is working on a framework for datapacks in Dart, called [ObjD](https://objd.stevertus.com/). Take a look if you are interested in that.

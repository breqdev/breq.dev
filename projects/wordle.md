---
title: Wordle Clones
description: Two clones of Wordle, written in TypeScript and Rust.
image: wordle/typescript.png
created: "2022"
repo: Breq16/rust_wordle
demo: https://wordle.breq.dev/
tags: [javascript, rust]
---

![](wordle/typescript.png)

# Overview

[Wordle](https://en.wikipedia.org/wiki/Wordle) is a popular word guessing game, kind of like Mastermind but for letters. I've written a few clones of the game in different languages.

# Motivation

The TypeScript clone was born out of a desire to understand the letter coloring procedure. I had played Wordle before, and I wanted to see if I could implement it myself.

The Rust clone was written because I wanted to learn more about Rust. I figured Wordle was a complex enough game that implementing it cleanly would require a decent understanding of Rust features and best practices.

# Technical Description

## TypeScript

![](wordle/typescript_complete.png)

_Code is available at [Breq16/wordle](https://github.com/Breq16/wordle)._

I built this project in React, but I wanted to ensure the game logic was sufficiently decoupled from the rendered result. I wrote this logic in two pure TypeScript functions, `rowColoring` and `keyboardColoring`.

The row coloring function assigns colors to each letter in the word. I took advantage of the type system to define letters in the target as explicitly nullable, allowing them to be "removed" when matched by a letter in the guess.

```typescript
export function rowColoring(guess: string, target: string) {
  // Store the color alongside each guess letter
  let guessLetters: LetterGuess[] = guess.split("").map((letter) => ({
    letter,
    color: "gray",
  }));

  // Store the target in an array of nullables
  let targetLetters: (string | null)[] = [...target];

  // First pass: match green letters
  guessLetters = guessLetters.map(({ letter, color }, index) => {
    // green letters are matched by the specific index in the target
    if (letter === targetLetters[index]) {
      // remove matching green letters from the pool
      // so that they aren't also matched as yellows
      targetLetters[index] = null;
      return { letter, color: "green" };
    } else {
      return { letter, color };
    }
  });

  // Second pass: greedily match yellow letters
  guessLetters = guessLetters.map(({ letter, color }) => {
    if (color === "green") {
      // don't modify existing green letters
      return { letter, color };
    }
    // yellow letters are matched by searching the entire target word
    else if (color === "gray" && targetLetters.includes(letter)) {
      // remove yellow letters once matched,
      // each letter only matches once
      targetLetters[targetLetters.indexOf(letter)] = null;
      return { letter, color: "yellow" };
    } else {
      return { letter, color };
    }
  });

  return guessLetters;
}
```

In Wordle, the keyboard serves an important role: it shows how much information you have gotten about a letter based on your guesses. Dark gray signifies that the letter does not appear (it was not colored in a previous attempt), yellow signifies that it does appear (it was colored yellow in a previous attempt), and green signifies that you have correctly guessed the position at least once (it was colored green in a previous attempt). As the coloring of each letter relies on the coloring of previous attempts, the keyboard coloring function makes use of the row coloring function to color each of the guesses.

```typescript
export function keyboardColoring(guesses: string[], target: string) {
  const letters: Record<string, LetterGuess> = {};

  for (const letter of "abcdefghijklmnopqrstuvwxyz") {
    letters[letter] = { letter, color: "gray" };
  }

  for (const guess of guesses) {
    const coloring = rowColoring(guess, target);

    for (const { letter, color } of coloring) {
      if (letters[letter].color === "gray" && color === "gray") {
        letters[letter].color = "black";
      }
      if (letters[letter].color === "gray" || color === "green") {
        letters[letter].color = color;
      }
    }
  }

  return letters;
}
```

## Rust

_Code is available at [Breq16/rust_wordle](https://github.com/Breq16/rust_wordle)._

![](wordle/rust.png)

I wanted to rely on as many zero-cost abstractions as possible. For storing each row and each word, instead of `Vec`s allocated on the heap, I decided to use fixed-length arrays with type aliases:

```rust
type Word = [char; 5];

#[derive(Copy, Clone, Eq, PartialEq, Hash, Debug)]
struct Square {
  color: Color,
  letter: char,
}

type Row = [Square; 5];
```

I used a Trait to implement printing the row:

```rust
trait PrintWordle {
  fn print_wordle(&self);
}

impl PrintWordle for Row {
  fn print_wordle(&self) {
    // ...
    for square in self.iter() {
      let mut boxed = "│ ".to_owned();
      boxed.push_str(&square.letter.to_string());
      boxed.push_str(" │");

      print_colored(&square.color, &boxed);
      print!("  ");
    }
    println!("");
    // ...
  }
}

// ...
  row.print_wordle();
```

I tried to make use of a functional style for the scoring algorithm, relying on iterators for most of the heavy lifting:

```rust
fn score_guess(target: &Word, guess: &Word) -> Row {
  // Map each letter of the target to an Option, so we can "remove" it later
  let mut remaining = target.map(|c| Some(c));

  // All tiles start off white
  let mut result = guess.map(|letter| Square {
    color: Color::White,
    letter,
  });

  // Use `.enumerate()` to check for the right tile in the right index
  for (i, square) in result.iter_mut().enumerate() {
    if target[i] == guess[i] {
      square.color = Color::Green;
      remaining[i] = None;
    }
  }

  // Greedily take remaining unmatched target letters to turn guess letters yellow
  for (i, square) in result.iter_mut().enumerate() {
    if square.color == Color::White {
      if let Some(pos) = remaining.iter().position(|&c| c == Some(guess[i])) {
        square.color = Color::Yellow;
        remaining[pos] = None;
      }
    }
  }

  // Any unmatched squares become gray
  for square in result.iter_mut() {
    if square.color == Color::White {
      square.color = Color::Gray;
    }
  }

  result
}
```

I tried to keep this all straightforward, but I still wasn't too confident that I had nailed all of the edge cases. I was delighted by Rust's testing support:

```rust
#[cfg(test)]
mod tests {
  use super::*;

  fn expect_score(target: &str, guess: &str, colors: Vec<Color>) {
    // ...
  }

  #[test]
  fn correct_guess() {
    expect_score("ARRAY", "ARRAY", vec![Color::Green; 5]);
  }

  // ...
}
```

Using `cargo` was also a welcome relief from [fighting with C++ and git submodules](/2021/08/29/pockey/#the-rp2040-sdk). I used `rand` to pick a random target word, `colored` to print colored squares to the terminal, and `serde_json` to read the wordlist files.

# Results

The TypeScript implementation works well, and it's actually my preferred Wordle to use due to its simple design, infinite puzzles, and the fact that it lets me keep playing after 6 wrong guesses. In hindsight, some memoization could have improved the performance of my declarative approach, as recoloring every row on every render undoubtedly has a performance penalty. That said, it would have been a tradeoff, and I don't think it's necessary given the relatively small number of guesses being used.

The Rust implementation is undoubtedly a bit less usable, being a CLI app, but I learned a lot about using constructs within Rust. While TypeScript had given me some intuition for how type aliases and type inference work, and C++ had given me a basic understanding of stack and heap memory, concepts such as Traits and the borrow checker were completely new to me. This wasn't a huge project, but the variety of data structures and paradigms it involved gave me a decent birds-eye view of Rust as a language.

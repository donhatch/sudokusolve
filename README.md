Working on a general sudoko player/solver.

I think my favorite interface I've seen and used
for solving puzzles is the one nytimes one,
in auto candidate mode.

================

References:
  https://www.learn-sudoku.com/omission.html
My reviews:
  https://www.nytimes.com/puzzles/sudoku
    Most usable interface, due to the auto candidate mode.
    Drawbacks:
    - no undo; the X button is sort of a halfhearted
      substitute, but it's not clear how it interacts
      with penciling I've done manuall.
    - too easy to mis-type, or click on a canditate
      and unintentially toggle candidacy,
      and then suffer forever
    - auto candidate is weird-- it's partly auto,
      but then lets me remove stuff additionally,
      without much feedback as to which is which,
      which is error prone
    - "check guesses when entered" is unfriendly:
      when it's on,
      I can't X out my most recent move to see what changed
    - I definitely like auto candidate mode; that helps
      avoid the tedious part of this.  But there is other
      similar tedious logic that I think could be automated.
  https://www.latimes.com/games/sudoku
    I've used this once, it's *horribly* error prone;
    mistyping anything totally wrecks everything.
    Interface is super weird (or else I just don't
    understand it)-- very little idea how to control it,
    or what the various assist options mean.
    It has an accessible archive, but it shows a long
    ad before each puzzle.

  https://1sudoku.com
    Nice!
    - Seems like a very polished interface
    - has cool variants like kids 6x6.
    - Hides the board when mouse isn't over the page,
      which makes for a reasonable timer experience.
    - hmm, have to explicitly press button to update candidates

  http://sudoklue.com
    - https://www.learn-sudoku.com/hidden-singles.html
      points out that pressing ctrl-<number> highlights
      all pencil marks of that number,
      making hidden singles easier to spot
      Oh jeez, it isn't on line :-(


Wish list in a solver:
 - penciling (showing remaining candidates for each cell)
 - also some way of showing remaining possible
   positions of a given digit in a given row
 - arbitrary size (2x2, 3x3, 4x4, etc)

Logic:
 - "naked single" or "lone single": When only one candidate left in a cell, that's the answer for the cell, and that digit can be removed from the rest of all 3 houses containing that cell
 - "hidden single": When only one place left in a row/column/block
   for a given digit to go, it goes there.
   (most or all of the latimes hints and nytimes hints
   are of this form)

 DONE: "naked pair": when two cells
   in same row/column/block have same two candidates,
   that rules out those candidates for the rest of
   that row/column/block.  Very strong if sharing the same
   block and row-or-column simultaneously; this is called
   a "locked pair".
 DONE: "naked triple", "naked quad".  probably increasingly
   hard to spot.

 - "visual elimination" of a digit - supposedly powerful,
   but I don't totally get it yet. https://www.learn-sudoku.com/visual-elimination.html
   "Most Sudoku puzzles printed in newspapers and magazines, even those rated with high levels of difficulty, are in fact quite easy to solve — at least from the perspective of someone who has mastered this technique."

  DONE: "hidden pairs" - https://www.learn-sudoku.com/hidden-pairs.html
    This is a hidden naked pair: 
    if two digits occur in only two cells in a block
    (or row or column), then erase everything else
    in those two cells, making it a naked pair.
  DONE: "hidden triples", "hidden quads" - https://www.learn-sudoku.com/hidden-triplets.html  analogous to hidden pairs.
    need to go back and review this

  DONE: "omission"/"intersection"/"pointing"/"blocking"/"claiming" https://www.learn-sudoku.com/omission.html
  - when a given digit's occurrances
    in block is limited to a given row or column,
    then that digit can be eliminated from the rest
    of that row or column
    (or, when a given digit's occurrances in a row or
    column is limited to a block, then the digit
    can be eliminated from the rest of that block)
    The general statement:
    when a given digit's occurrance in a first house
    is limited to a second house, then the digit
    can be eliminated from the rest of that second house.
    Supposedly lighting up a given number
    can help find these.

  TODO: x-wing.
    references:
      https://www.youtube.com/watch?v=gVT786t1Kjk "This Sudoku Actually Teaches The X-Wing Technique!"

==================================
Ideas for concise puzzle in url.
Hmm, can't decide.

003020600900305001001806400008102900700000008006708200002609500800203009005010300
..3.2.6..9..3.5..1..18.64....81.29..7.......8..67.82....26.95..8..2.3..9..5.1.3..
003020600!900305001!001806400!008102900!700000008!006708200!002609500!800203009!005010300
..3.2.6..!9..3.5..1!..18.64..!..81.29..!7.......8!..67.82..!..26.95..!8..2.3..9!..5.1.3..
..3.2.6..-9..3.5..1-..18.64..-..81.29..-7.......8-..67.82..-..26.95..-8..2.3..9-..5.1.3..
..3.2.6..=9..3.5..1=..18.64..=..81.29..=7.......8=..67.82..=..26.95..=8..2.3..9=..5.1.3..
003020600.900305001.001806400.008102900.700000008.006708200.002609500.800203009.005010300
003020600-900305001-001806400-008102900-700000008-006708200-002609500-800203009-005010300
003020600=900305001=001806400=008102900=700000008=006708200=002609500=800203009=005010300
003-020-600=900-305-001=001-806-400=008-102-900=700-000-008=006-708-200=002-609-500=800-203-009=005-010-300
..3-.2.-6..=9..-3.5-..1=..1-8.6-4..=..8-1.2-9..=7..-...-..8=..6-7.8-2..=..2-6.9-5..=8..-2.3-..9=..5-.1.-3..
..3,.2.,6..;9..,3.5,..1;..1,8.6,4..;..8,1.2,9..;7..,...,..8;..6,7.8,2..;..2,6.9,5..;8..,2.3,..9;..5,.1.,3..
003,020,600;900,305,001;001,806,400.008,102,900!700,000,008;006,708,200!002,609,500;800,203,009;005,010,300

003020600
900305001
001806400
008102900
700000008
006708200
002609500
800203009
005010300


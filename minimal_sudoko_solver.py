#!/usr/bin/python3

# partly based on https://github.com/r1cc4rdo/sudoku

# Finds solution quickly, but then thinks forever:
#  ./minimal_sudoko_solver.py 1.....7....71.9...68..7......1.9.6.....3...2..4......3..8.6.1..5......4......2..5
# OH!  This is the "very very hard" one but it finds the solution quickly
# because the solution is lexicographically towards the beginning of the search!!!
# What happens if I try the digits in reverse order?  Hmm!

import sys
from itertools import *

houses = ([set(range(row*9, row*8+9)) for row in range(9)]
        + [set(range(col, 81, 9)) for col in range(9)]
        + [set(((block//3*3 + i//3)*3 + block%3)*3 + i%3 for i in range(9)) for block in range(9)])

houses = ([set(range(row*9, row*8+9)) for row in range(9)]
        + [set(range(col, 81, 9)) for col in range(9)]
        + [set(((R*3 + i//3)*3 + C)*3 + i%3 for i in range(9)) for R,C in product([0,1,2],[0,1,2])])

houses = ([set(range(row*9, row*8+9)) for row in range(9)]
        + [set(range(col, 81, 9)) for col in range(9)]
        + [set(((R*3 + r)*3 + C)*3 + c for r,c in product([0,1,2],[0,1,2])) for R,C in product([0,1,2],[0,1,2])])

houses = ([set(range(row*9, row*8+9)) for row in range(9)]
        + [set(range(col, 81, 9)) for col in range(9)]
        + [set(((R*3 + r)*3 + C)*3 + c for r in [0,1,2] for c in [0,1,2]) for R in [0,1,2] for C in [0,1,2]])


def boardstrings2sets(board):
  return [set(ord(c)-ord('1') for c in s) for s in board]
def boardsets2strings(board):
  return [''.join(chr(ord('1')+digit) for digit in sorted(x)) for x in board]
def boardstrings2pretty(boardstrings):
  maxwidth = max(map(len,boardstrings))
  line, div = ' {} {} {} | {} {} {} | {} {} {} \n', '+'.join(['-'*(3*maxwidth+4)]*3)+'\n'
  return (line * 3 + div + line * 3 + div + line * 3).format(*[('%-*s' % (maxwidth,s)) for s in boardstrings])
def pretty(board):
  return boardstrings2pretty(boardsets2strings(board))

def prune(board):
  #print("        in prune")
  while True:
    #print("          top of loop")
    did_something = False
    # naked singles
    for i in range(81):
      if len(board[i]) == 0: return False # impossible board
      if len(board[i]) == 1:
        # found naked single
        #print("                      found naked single")
        (digit,) = board[i]
        for house in houses:
          if i in house:
            for j in house:
              if j != i:
                if digit in board[j]:
                  board[j].remove(digit)
                  did_something = True
    # hidden singles
    for house in houses:
      for digit in range(0):
        digit_positions = [i for i in house if digit in board[i]]
        if len(digit_positions) == 0: return False # impossible board
        if len(digit_positions) == 1:
          # found hidden single
          #print("                      found naked single")
          if len(board[digit_positions[0]]) == 1:
            board[digit_positions[0]] = set([digit])
            did_something = True
    if not did_something: break
    #print("          bottom of loop")
  #print("        out prune, returning True at bottom")
  return True

def solve(board,depth=0):
  print("    in solve(depth=%r)" % (depth,))
  print("      board = \n%s" % (pretty(board),))
  print("      calling prune")
  board = [set(s) for s in board]  # deep copy so we don't interfere with caller
  if not prune(board):
    print("      prune returned False:\n%s" % (pretty(board),))
    print("    out solve(depth=%r), prune returned false" % (depth,))
    return  # impossible
  print("      prune returned True:\n%s" % (pretty(board),))

  lengths = list(map(len, board))
  sumlengths = sum(lengths)
  if sumlengths == 81:
    yield board
  elif sumlengths > 81:
    pivot = lengths.index(sorted(set(lengths))[1])
    print("      pivot position %r, length %r" % (pivot,len(board[pivot])))
    for digit in board[pivot]:
      board[pivot] = set([digit])
      for answer in solve(board,depth+1):
        yield answer
  else:
    # impossible
    pass
  print("    out solve(depth=%r)" % (depth,))

if len(sys.argv) != 2: exit("Arg.")
board = [c if c in '123456789' else '123456789' for c in sys.argv[1] if c in '123456789.0']
board = boardstrings2sets(board)
assert len(board) == 81
line, div = ' {} {} {} | {} {} {} | {} {} {} \n', '-------+-------+-------\n'
n = 0
for solvedboard in solve(board):
  n += 1
  solvedboardstrings = boardsets2strings(solvedboard)
  print(boardstrings2pretty(solvedboardstrings))

print("%r solution%s." % (n, "" if n==1 else "s"))

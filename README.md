# Cellular Automata and Conway's "Game of Life"

The Game of Life is a cellular automation devised by British mathmetician John Horton Conway in 1970. A cellular automaton consists of a regular grid of cells, whith each cell being in a certain state, such as "dead" or "alive".

In Conway's Game of Life, each cell looks at its eight neighbors to determine it's state. The grid is a two-dimensional array of rows and collumns.

To look at neighbors I've built a for loop that runs through each column of each row and looks at each neighbor using a helper function. Using the count of neighbors, a copy of the grid updates it cells accordingly. When the loop has ran through the whole grid, the original grid is replaced with the copy. This is a double buffer and was implemented using the React useState hook.

![example-patterns](https://media.giphy.com/media/4VVZTvTqzRR0BUwNIH/giphy.gif)

[from Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns)

/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// I - input n stands for the dimensions of the board (n x n) and # of rooks
// O - an array of arrays representing a single solution chessboard matrix
// C -
// E -
window.findNRooksSolution = function(n) {
  var solution = [];
  //generate a nxn chessboard in the form of nested arrays
  // while loop to build matrix
  while (solution.length < n) {
    // create row variable
    var row = [];
    // while loop to build row
    while (row.length < n) {
      row.push(0);
    }
    solution.push(row);
  }
  // create variable index set to zero
  var index = 0;
  //traverse the arrays diagonally starting at upper left
  //iterate over the solutions array
  for (var i = 0; i < solution.length; i++) {
    //set current row at variable index to 1
    var currentRow = solution[i];
    currentRow[i] = 1;
    //increment index by 1
    index++;
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //return the solution
  console.log(solution);
  return solution;
};





// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //create solutions variable and set to 1
  var solutionCount = 1;
  //iterate through numbers 2 through n
  for (var i = 2; i <= n; i++) {
    solutionCount = solutionCount * i;
    //reassign solution variable equal to variable * current num
  }
  //return solution var
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

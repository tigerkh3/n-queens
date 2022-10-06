// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    // I - input is the specific index of the row we are targeting
    // O - output is a boolean value of whether there is a conflict or not
    // C -
    // E -
    hasRowConflictAt: function(rowIndex) {
      // return false; // fixme

      // create conflict variable and set to 0
      var conflict = 0;
      // iterate over the array located at the given index
      for (var i = 0; i < this.attributes[rowIndex].length; i++) {
        // current element variable
        var currElement = this.attributes[rowIndex][i];
        // if the current element is 1
        if (currElement === 1) {
          // increment conflict variable by 1;
          conflict++;
        }
      }
      // if conflict variable is greater than or equal to 2
      if (conflict >= 2) {
        // then return true;
        return true;
      } else {
        // else return false;
        return false;
      }
    },

    // BOARD VISUAL IN ARRAY FORMAT
    // [
    //   [0, 0, 0, 0] i = 0
    //   [0, 0, 0, 0] i = 1
    //   [0, 0, 0, 0] i = 2
    //   [0, 0, 0, 0] i = 3
    // ]
    //

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // return false; // fixme

      // iterate through indexes 0 - 3, to represent row indexes
      for (var i = 0; i < 4; i++) {
      // invoke hasRowConflictAt() on index
      // if the invocation returns true
        if (this.hasRowConflictAt(i)) {
          // return true
          return true;
        }
      }
      // else return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // return false; // fixme

      //create conflict variable that will be incremented
      var conflict = 0;
      //iterate through the parent array (parent array is array holding all rows)
      for (var key in this.attributes) {
        //create variable for current row
        var currentRow = this.attributes[key];
        //if current row at column index is equal to 1
        if (currentRow[colIndex] === 1) {
          //increment conflict variable
          conflict++;
        }
      }
      //if conflict var is greater than or equal to 2
      if (conflict >= 2) {
        //return true
        return true;
      }
      //else return false
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // return false; // fixme

      //iterate through indexes 0-3
      for (var i = 0; i < 4; i++) {
        //invoke hasColConflictAt fn on the current index
        if (this.hasColConflictAt(i)) {
        //if the above returns true
        //return true
          return true;
        }
      }
      //return false
      return false;
    },

    // BOARD VISUAL IN ARRAY FORMAT
    // * Note: this.attributes is an object not an array *
    // [
    // * values in array are representative of column index not actual values *
    //   [0, 1, 2, 3] i = 0
    //   [0, 1, 2, 3] i = 1
    //   [0, 1, 2, 3] i = 2
    //   [0, 1, 2, 3] i = 3
    // ]
    //



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow, start) {
      // return false;
      // create conflict variable set to 0
      var startIteration = start;
      var conflict = 0;
      // create index variable set to input value
      var index = majorDiagonalColumnIndexAtFirstRow;
      //create rows array variable
      var rowsArr = [];
      //iterate through attributes object
      for (var key in this.attributes) {
        //push each property to our rows array
        rowsArr.push(this.attributes[key]);
      }
      // [ [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0] ]

      // iterate through the rows array
      for (var i = start; i < rowsArr.length - 1; i++) {
        // if there is a piece at currentRow at the index variable
        var currentRow = rowsArr[i];
        if (currentRow[index] === 1) {
          // increment conflict by 1
          conflict++;
        }
        // increment index by 1
        index++;
      }
      // if conflict variable greater than or equal to 2
      if (conflict >= 2) {
      // then return true
        return true;
      }
      // return false
      return false;
    },

    // * note: possible edge case of loop hitting undefined

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      //create variable for rows arr
      var rowsArr = [];
      //iterate through this.attributes
      for (var key in this.attributes) {
      //push each property into rows array
        rowsArr.push(this.attributes[key]);
      }

      //iterate through our rows array
      for (var i = 0; i < rowsArr.length - 1; i++) {
        //create a var for the current row
        var currentRow = rowsArr[i];
        //call hasMajorDiagonalConflictsAt on current index
        if (this.hasMajorDiagonalConflictAt(0, i)) {
          //if above returns true
          //return true
          return true;
        }
      }
      return false;
      //return false
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow, start) {
      // return false;
      // create conflict variable set to 0
      var startIteration = start;
      var conflict = 0;
      // create index variable set to input value
      var index = minorDiagonalColumnIndexAtFirstRow;
      //create rows array variable
      var rowsArr = [];
      //iterate through attributes object
      for (var key in this.attributes) {
        //push each property to our rows array
        rowsArr.push(this.attributes[key]);
      }
      // [ [0,0,0,0], [0,0,0,0], [0,0,0,0],
      //   [0,0,0,0]

      // iterate through the rows array
      for (var i = start; i < rowsArr.length - 1; i++) {
        // if there is a piece at currentRow at the index variable
        var currentRow = rowsArr[i];
        if (currentRow[index] === 1) {
          // increment conflict by 1asdfasfdasf
          conflict++;
        }
        // decrement index by 1
        index--;
      }
      // if conflict variable greater than or equal to 2
      if (conflict >= 2) {
      // then return true
        return true;
      }
      // return false
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //create variable for rows arr
      var rowsArr = [];
      //iterate through this.attributes
      for (var key in this.attributes) {
      //push each property into rows array
        rowsArr.push(this.attributes[key]);
      }
      //iterate through our rows array
      for (var i = 0; i < rowsArr.length - 1; i++) {
        //create a var for the current row
        var currentRow = rowsArr[i];
        //call hasMajorDiagonalConflictsAt on current index
        if (this.hasMinorDiagonalConflictAt(3, i)) {
          //if above returns true
          //return true
          return true;
        }
      }
      return false;
      //return false
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

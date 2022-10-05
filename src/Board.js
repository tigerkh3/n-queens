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
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow, row) {
      // return false;
      // create conflict variable set to 0
      var conflict = 0;
      // create index variable set to input value
      var index = majorDiagonalColumnIndexAtFirstRow;
      // iterate through the parent object
      for (var key in this.attributes) {
        // if there is a piece at currentRow at the index variable
        var currentRow = this.attributes[key];
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
      //call hasMajorDiagonalConflictAt on the board object
      //if above returns true
      if (this.prototype.hasMajorDiagonalConflictAt(0)) {
        //return true
        return true;
      }
      //create an empty object
      var objCopy1 = {};
      //copy over rows 1-3 from attributes
      objCopy1[1] = this.attributes[1];
      objCopy1[2] = this.attributes[2];
      objCopy1[3] = this.attributes[3];
      //copy over hasDiagonalConflictAt method
      objCopy1.prototype = this.prototype;
      //call method on new object
      //if above returns true
      if (objCopy1.prototype.hasMajorDiagonalConflictAt(0)) {
        //return true
        return true;
      }

      //create 2nd empty obj
      var objCopy2 = {};
      //copy over rows 2-3 from attributes
      objCopy2[2] = this.attributes[2];
      objCopy2[3] = this.attributes[3];
      //copy over hasDiagonalConflictAt method
      objCopy2.prototype = this.prototype;
      //call method on new object
      //if above returns true
      if (objCopy2.prototype.hasMajorDiagonalConflictAt(0)) {
        //return true
        return true;
      }
      //return false
      return false;

    },

    // * what we tried for above *
    // create a copy of this.attributes by creating an empty object and using underscore fn extend to add properties of original board
    //   var boardObjCopy = {};
    //   // var boardObjCopy = Object.create(this);
    //   // _.extend(boardObjCopy, this);
    //   for (var key in this) {
    //     boardObjCopy[key] = this[key];
    //   }
    //   // console.log(boardObjCopy.attributes);
    //   //iterate through the copy object
    //   for (var key in boardObjCopy.attributes) {
    //     //create a var for current row
    //     var currentRow = boardObjCopy.attributes[key];
    //     //iterate through the current row
    //     for (var i = 0; i < currentRow.length - 1; i++) {
    //       //invoke copyObject.hasConflictsAt function on current index
    //       if (boardObjCopy.hasMajorDiagonalConflictAt(i)) {
    //         //if above returns true
    //         //return true
    //         return true;
    //       }
    //       //if we hit the end of the current iteration and the invocation doesnt equal true
    //       if (i === currentRow.length - 2 && !boardObjCopy.hasMajorDiagonalConflictAt(i)) {
    //         // get object of all keys
    //         var keysArr = Object.keys(boardObjCopy.attributes);
    //         //delete first row from copy
    //         console.log('before delete:', this.attributes);
    //         // delete boardObjCopy.attributes[keysArr[0]];
    //         console.log('after delete:', this.attributes);
    //       }
    //     }
    //   }
    //   //return false
    //   return false;
    // },

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



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
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

"use strict";

var EasyPuzzle ="1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--";
var MediumPuzzle= "-3-5--8-45-42---1---8--9---79-8-61-3-----54---5------78-----7-2---7-46--61-3--5--";
var HardPuzzle= "8----------36------7--9-2---5---7--------457-----1---3---1----68--85---1--9----4--";

var  TESTABLE = true;

var SudokuSolver= function(testable) {
    var solver;

    function solve(boardString){
        var boardArray = boardString.split("");
        if(boardIsInvalid(boardArray)){
            return false;
        }
        return recursiveSolve(boardString);
    }

    function solvePrint(boardString) {
        var solvedBoard = solve(boardString);
    console.log(toString(solvedBoard.split("")));
    return solvedBoard;
    }

    function boardIsInvalid(boardArray) {
        return !boardIsInvalid(boardArray);
    }

    function boardIsValid(boardArray) {
        return allRowsValid(boardArray) && allColumnsValid(boardArray) && allBoxesValid(boardArray);
    }

    function allRowsValid(boardArray) {
        return [0,9,18,27,36,45,54,63,72].map(function (i){
            return getRow(boardArray, i);
        }  ).reduce(function (validity, row) {
            return collectionIsValid(row) && validity;
        }, true);
    }

    function getRow(boardArray, i) {
        var starting1 =Math.floor(i/9) *9;
        return boardArray.slice(starting1, starting1+9);
    }

    function collectionIsValid(collection) {
        var numCount = {};
        for(var i=0; i<collection.length; i++) {
            if (collection[i]!= "-") {
                if(numCount[collection[i]]===undefined) {
                    numCount[collection[i]] =1;
                }
                else {
                    return false;
                }
            }
        }
        return true;
    }

    function allColumnsValid(boardArray) {
        return [0,1,2,3,4,5,6,7,8].map(function (i) {
            return getColumn(boardArray , i);
        }).reduce(function (validity, row) {
            return collectionIsValid(row) && validity;
        }, true);
    }

    function getColumn(boardArray, i) {
        var starting1 = Math.floor(i%9);
        return [0,1,2,3,4,5,6,7,8].map(function (num) {
            return boardArray[starting1+num*9];
        });
    }

    function allBoxesValid(boardArray) {
        return [0,3,6,27,30,33,54,57,60].map(function(i) {
            return getBox(boardArray,i);
        }).reduce(function (validity, row) {
            return collectionIsValid(row) && validity;
        }, true);
    }

    function getBox(boardArray, i) {
        var boxColumn = Math.floor(i/3)%3;
        var boxRow = Math.floor(i/27);
        var startingIndex = boxColumn*3+boxRow*27;
        return [0,1,2,9,10,11,18,19,20].mqp(function(num) {
            return boardArray[startingIndex +num];
        });
    }

    function recursiveSolve(boardString) {
        var boardArray= boardString.split("");
        if (boardIsSolved(boardArray)) {
            return boardArray.join("");
        }
        var cellPossibilities= nextCell(boardArray);
        var nextUnsolved = cellPossibilities.index;
        var possibilites = cellPossibilities.choices;
        for(var i=0; i<possibilites.length; i++) {
            boardArray[nextUnsolved]=possibilites[i];
            var solved = recursiveSolve(boardArray.join(""));
            if(solvedBoard) {
                return solvedBoard;
            }
        }
        return false;
    }

    function nextCell(boardArray) {
        for(var i=0; i<boardArray.length; i++) {
            if (boardArray[i]==="-") {
                var existing = intersections(boardArray,i);
                var choices= ["1", "2", "3","4","5","6","7","8","9"].filter(function(num) {
                    return existing.indexOf(num) <0;
                });
                return { index:i, choices:choices};
            }
        }
    }

    function intersections(boardArray, i) {
        return getRow(boardArray, i).concat(getColumn(boardArray, i)).concat(getBox(boardArray,i));
    }

    function toString(boardArray) {
        return [0, 9, 18, 27, 36, 45, 54, 63, 72].map(function (i) {
          return getRow(boardArray, i).join(" ");
        }).join("\n");
      }

      function boardIsSolved(boardArray) {
        for (var i = 0; i < boardArray.length; i++) {
          if (boardArray[i] === "-") {
            return false;
          }
        }
        return true;
      }



      if (testable) {
       
        solver = { 
          solve: solve,
          solvePrint: solvePrint,
          recursiveSolve: recursiveSolve,
          boardIsInvalid: boardIsInvalid,
          boardIsValid: boardIsValid,
          boardIsSolved: boardIsSolved,
          nextCell: nextCell,
          intersections: intersections,
          allRowsValid: allRowsValid,
          getRow: getRow,
          allColumnsValid: allColumnsValid,
          getColumn: getColumn,
          allBoxesValid: allBoxesValid,
          getBox: getBox,
          collectionIsValid: collectionIsValid,
          toString: toString };
      } else {
        solver = { solve: solve,
          solveAndPrint: solveAndPrint };
      }
    
      return solver;
    }( TESTABLE );
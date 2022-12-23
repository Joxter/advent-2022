let testInput = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`;

console.log("test OK: ", part1(testInput), [110]);
console.log("answer: ", part1(getRealData()));

// console.log("test2 OK:", part2(testInput));
// console.log("answer2:", part2(getRealData()));

function part1(inp) {
  let elfes = {};

  inp.split("\n").forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char === "#") {
        elfes[x + "," + y] = true;
      }
    });
  });

  function noElfes(...coords) {
    // console.log(coords)
    return coords.every(([x, y]) => {
      return !elfes[[x, y].join(",")];
    });
  }

  function getRect() {
    let xRange = [100, -100];
    let yRange = [100, -100];

    Object.keys(elfes).forEach((coords) => {
      let [x, y] = coords.split(",").map((it) => +it);
      if (x < xRange[0]) xRange[0] = x;
      if (x > xRange[1]) xRange[1] = x;

      if (y < yRange[0]) yRange[0] = y;
      if (y > yRange[1]) yRange[1] = y;
    });

    return [xRange, yRange];
  }

  render(elfes, ...getRect());
  // console.log();

  let proposeN = ([x, y], proposals) => {
    if (noElfes([x - 1, y - 1], [x, y - 1], [x + 1, y - 1])) {
      if (!proposals[[x, y - 1].join(",")]) {
        proposals[[x, y - 1].join(",")] = [];
      }
      proposals[[x, y - 1].join(",")].push([x, y].join(","));
      return true;
    }
    return false;
  };
  let proposeS = ([x, y], proposals) => {
    if (noElfes([x - 1, y + 1], [x, y + 1], [x + 1, y + 1])) {
      if (!proposals[[x, y + 1].join(",")]) {
        proposals[[x, y + 1].join(",")] = [];
      }
      proposals[[x, y + 1].join(",")].push([x, y].join(","));
      return true;
    }
    return false;
  };
  let proposeW = ([x, y], proposals) => {
    if (noElfes([x - 1, y - 1], [x - 1, y], [x - 1, y + 1])) {
      if (!proposals[[x - 1, y].join(",")]) {
        proposals[[x - 1, y].join(",")] = [];
      }
      proposals[[x - 1, y].join(",")].push([x, y].join(","));
      return true;
    }
    return false;
  };
  let proposeE = ([x, y], proposals) => {
    if (noElfes([x + 1, y - 1], [x + 1, y], [x + 1, y + 1])) {
      if (!proposals[[x + 1, y].join(",")]) {
        proposals[[x + 1, y].join(",")] = [];
      }
      proposals[[x + 1, y].join(",")].push([x, y].join(","));
      return true;
    }
    return false;
  };
  let propArray = [proposeN, proposeS, proposeW, proposeE];
  // let propArray2 = [proposeS, proposeW, proposeE, proposeN];

  for (let round = 1; round <= 10; round++) {
    let proposals = {};
    console.log({ round });
    /*
       [x, y - 1]
           N
[x - 1, y]  W*E  [x + 1, y]
           S
       [x, y + 1]
*/

    Object.keys(elfes).forEach((coords) => {
      let [x, y] = coords.split(",").map((it) => +it);

      if (
        noElfes(
          [x - 1, y - 1],
          [x, y - 1],
          [x + 1, y - 1],
          //
          [x - 1, y],
          [x + 1, y],
          //
          [x - 1, y + 1],
          [x, y + 1],
          [x + 1, y + 1]
        )
      ) {
        return;
      }

      propArray[0]([x, y], proposals) ||
        propArray[1]([x, y], proposals) ||
        propArray[2]([x, y], proposals) ||
        propArray[3]([x, y], proposals);
    });

    let first = propArray.shift();
    propArray.push(first);
    // console.log(propArray);
    // console.log(proposals);

    Object.entries(proposals).forEach(([coords, els]) => {
      // console.log()
      if (els.length === 1) {
        delete elfes[els[0]];
        elfes[coords] = true;
      }
    });

    // render(elfes, ...getRect());
    // return;
  }
  let rect = getRect();
  // render(elfes, ...rect);

  let [xRange, yRange] = rect;

  return (
    (Math.abs(xRange[0]) + Math.abs(xRange[1]) + 1) *
      (Math.abs(yRange[0]) + Math.abs(yRange[1]) + 1) -
    Object.keys(elfes).length
  );
}

function part2(inp) {}

function getRealData() {
  return `###.###..#.....#..#.##..##.#...###.#####..#.##.#####.###..######.#.#.#
....##.#.#.#......#.###..##..###...#.#...####.##...#.#....#.##.##....#
#..#.#.#.##.........#####....#..##.......#.#.#.##....#.#....##..##..##
#.##.##....#.##.#.###.#...#..#.##.####.#.#.#.#.###.###.####....#.#.#.#
.#.#.#####.##...##.##..#..#.#..####.#..#.#.#######..#.##.#.###.#.....#
..#..#....###.#....###.##.#..#..#.#..#.#.#...##...#....##....#..##...#
###..........#..#.###....##.##...#####.###.#.##...#.##.....#.##.#.####
#.###.####...#..#.##.....#.####.##..##...#..##.....#...###..##.######.
.....#.####..##.#...#..##.###..#.##.####..#...#.###..##..#.#.###...#.#
.#.#.#..##.##..#.#.##.#.##.#.##..##.##.#..##.#.##..#####.#.###.#.##..#
###.#.###.##.##....#.#.#...##...#.#..#.#..#.#..##.#....#####...#...###
.#.#.#.#.#..#....###.#.##.#.#.####..#.#.#...#.#.#.###....#....#...##..
#.#....#........#....######...#....#..#.###...#.....###..###...##..#..
.###.##....#.#.#.###..###....#.#.#..###.##..#..#..#####.#.###.#..##..#
..###.##..####.....#...##.#....#...###..#.###.#...##....####........#.
#####.##..#..##..###....#.##....#.#...##.########...#.#.#..##..##..###
.##..#...##.....###.#...#..###.######.#.#...#...##..#.....#..#.##..#.#
.#####..#.######.#..#..#.#.#.##....##..#.......#....#.##.#.#..##...#.#
.#.##..#..###..#.######........##.##.##..#....#.###.######.##.#.#..##.
##.##.#..####.#....###.#..##..#...#.#####.#..#...#....##...#.###..#.##
#....##..#...#.#.###.#.#...##.#.#..###...####..##.#..##.#.#####.....##
.##.#..#.##.##.#.##.....#######..#...#.##.####...#.....#.##..#...##...
#.#.#.#####...#####..#.##....#.#.####.#..#.##..#.#.#...#..##.#...##...
#.#.#.#..#.#.#..#..###.#.....#.#.#..#.#####.#.#..#...#.###.###...#.#..
.####..####.#.#..#...##.##.#....#.#.....#.##.###..#...###.###.#....##.
....##.#.##.###.#..##.#..#.......##...#.###...#.......#..####.#.#.####
....#.#......####..#.#..#..#..#.##..#..#..###..#.#.##.#.##..###..#..#.
.##.#.....##.#..#..#..####..#.#.#...###.##.##.##...#..##..##.##...##..
#..####..#...#.#....##...##..#.....##.#######..#.####...##..######.#..
..#.##.##....##.#######..##...#..#..###.....##.#.#..#.#...##..###.####
#####......##..#.#..#......#..####.####...#####..######...##.###..##..
###..##.#.##....##..######.#.#.#......#..##.#.##.#.##...#.##...###..##
.....#.#.#.##..#.#####.##.#.#.....#.#..#.###.##..#.###.##..##.###....#
.###.####..####.###....####.#.##..##..#.....##.###.##.######.#..#.#...
.#.#######.#.#.###....#####..#.#.#..#.#.#.#.#..##..#..#...##..##..#.#.
.##..####..#.#...###.#...#....####...###.#..#.#.....#.#.##.#..##.#.#..
.#.#.#.#####..##.####..#..##......#..#.###.#..#....#...#....#...#.####
..##.##.###.#..#..#.#..#.###......##.#..#..#.#.####.#.#.#.####.##.....
##.#..#..##.#######..#..#....##..#...########.##.#.#...##...##.##.....
.#...#####.#..##.##.###.####.....###.#......########.#..##.##.#....###
...####.###....##..#..#....#..##.####..##..#..###.......#.#.###.##...#
.#.#......#####...##....#.#..#######.######.#.#.##.#..###..#....##..#.
..###.#.#####..##.#.####....#.###..#..#.##.#####.##..##.##..##..#.##.#
.####.#.######.###.###..#......#...#...#..#..##.###.##.#.####.#.#.##.#
#####.###.##.#########..###..#.#.##.#..#..##...#.###.#.#......###..##.
###...###.##.#.###.#.##.####.#######..##.#....#####.###.#..#.#...###..
.######...#...#..###......#.#.##........#..##.#.#.##.#....###.....##.#
#.#.....##.##.##..##..##.#.##.###.##.###.##.#.##.###....##..#.#.##....
#.####.##...##....#.#.....#.#.###..#..####.....#.##..##...##.###.#..##
#####.##.#...#....#..###.##..##...#....#....##.#.#....#####....####.##
####...##...#.###.##.##.#####...#.....##..#####...########..####......
#.#..##.##.#.######.###.#.##.......#......####..##.#.#.#..##.###.#..#.
#..#..########..##..#.######..#.#...#..#.#####.###.####......##..###.#
#..#.#...#..#....#..##.##.#..###.####.###########.#..#.###.#.##.###..#
##.#..#..#.....#.##.#..######..#..#...#.#...###.#.#.#.#.#.########...#
..###.#.##......###..#...##......#####.#.#....####.....##.#..#.#..#.#.
..######....#..##.#.#..#.##.#..##.##.#....##....###.#.##.##..##....###
.#####....##....###.#.#######.....##.###.#..#.#.#..###...#.##..#..#.#.
#..#####...#..##..#..#..#....#.##....#..##.......##..#....#.#..#.#.###
#.#..#####...#...#...##.#....#..##.#.##....#####.....#.##.....#..#.###
##.#.#....#...#.####....###....#...#.##...##.#....#.#.#.##......##.###
...##.#.#..#.###..#.#...##.#...##.#...##...#..###.#.###...###..#..##.#
.#####...#.#..###.#.##.##.#.##..##.#.#.....##....#.#..#.#.#..#####.###
#.####.####..###......##.....#.#.....##.#..##.##.#....###.....####..##
#..#####...#....#...###..##...###..####..####..#...#####.#####..#.###.
####.###.###....####....##..#..####...#....###.##.#.##...##.......####
.#.###....####..#..#.###.##.##.####..##.#..###..#..#.#.#..#..#.##..##.
....##......####.####.######...###.....###.#.#..##.#.##.......#...#...
##.###.##...#.....#.##.#.......####.##.###..###.#.#..#.##..#.####....#
....#..##.#...##.##.#.#.#..#.#..#..#.####....#####..#.....#####.#.....`;
}

function render(elfes, xRange, yRange) {
  let res = "";

  for (let y = yRange[0]; y <= yRange[1]; y++) {
    for (let x = xRange[0]; x <= xRange[1]; x++) {
      // res += elfes[x + "," + y] ? "#" : x === 0 ? "|" : " ";
      res += elfes[x + "," + y] ? "#" : x === 0 ? "." : ".";
    }
    res += ` ${y.toString().padStart(3, " ")}\n`;
    // res += `\n`;
  }
  console.log(res);
}
/*
......#.....
..........#.
.#.#..#.....
.....#......
..#.....#..#
#......##...
....##......
.#........#.
...#.#..#...
............
...#..#..#..

*/
/*== Initial State ==
..............
..............
.......#......
.....###.#....
...#...#.#....
....#...##....
...#.###......
...##.#.##....
....#..#......
..............
..............
..............

== End of Round 1 ==
..............
.....#...
...#...#.
.#..#.#..
.....#..#
..#.#.##.
#..#.#...
#.#.#.##.
.........
..#..#...
.........
..............

== End of Round 2 ==
..............
......#....
...#.....#.
..#..#.#...
......#...#
..#..#.#...
#...#.#.#..
...........
.#.#.#.##..
...#..#....
...........
..............

== End of Round 3 ==
..............
......#....
....#....#.
.#..#...#..
......#...#
..#..#.#...
#..#.....#.
......##...
.##.#....#.
..#........
......#....
..............

== End of Round 4 ==
..............
......#....
.....#....#
.#...##....
..#.....#.#
........#..
#...###..#.
.#......#..
...##....#.
...#.......
......#....
..............

== End of Round 5 ==
......#....
...........
.#..#.....#
........#..
.....##...#
#.#.####...
..........#
...##..#...
.#.........
.........#.
...#..#....
..............

After a few more rounds...

== End of Round 10 ==
......#.....
..........#.
.#.#..#.....
.....#......
..#.....#..#
#......##...
....##......
.#........#.
...#.#..#...
............
...#..#..#..
*/

let input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

console.log("test OK:", part1(input, 10), [26]);
console.log("part1: ", part1(getData(), 2_000_000));

function part1(inp, ROW) {
  // console.log(inp)
  let map = {};

  inp
    .split("\n")
    // .slice(3, 4)
    .forEach((line, i, all) => {
      let [sx, sy, bx, by] = /(-?\d+).+?(-?\d+).+?(-?\d+).+?(-?\d+)/
        .exec(line)
        .slice(1)
        .map((n) => +n);

      map[`${sx},${sy}`] = "S";
      map[`${bx},${by}`] = "B";

      // console.log(sx, sy, bx, by);
      console.log("paint", i, all.length);
      paintOver([sx, sy], [bx, by]);
    });

  // render(map, [-2, 22], [-4, 26]);

  return Object.entries(map).filter(([coords, cell]) => {
    return coords.endsWith(ROW) && cell !== "B";
  }).length;

  function paintOver(signal, beacon) {
    let size = getDistance(signal, beacon);

    let j = ROW;
    for (let i = signal[0] - size; i <= signal[0] + size; i++) {
      // console.log(i)
      // for (let j = signal[1] - size; j <= signal[1] + size; j++) {
      // console.log(j)
      if (getDistance(signal, [i, j]) <= size) {
        map[i + "," + j] = map[i + "," + j] || "#";
      }
      // }
    }

    // console.log(size);
  }

  function getDistance(signal, beacon) {
    let deltaX = Math.abs(signal[0] - beacon[0]);
    let deltaY = Math.abs(signal[1] - beacon[1]);

    return deltaX + deltaY;
  }
}

function render(map, [y1, y2], [x1, x2]) {
  let result = "";

  for (let y = y1; y <= y2; y++) {
    let row = "";
    for (let x = x1; x <= x2; x++) {
      row += map[x + "," + y] || " ";
    }
    result += String(y).padStart(3, "_") + " " + row + "|\n";
  }

  console.log(result);
}

function getData() {
  return `Sensor at x=2692921, y=2988627: closest beacon is at x=2453611, y=3029623
Sensor at x=1557973, y=1620482: closest beacon is at x=1908435, y=2403457
Sensor at x=278431, y=3878878: closest beacon is at x=-1050422, y=3218536
Sensor at x=1432037, y=3317707: closest beacon is at x=2453611, y=3029623
Sensor at x=3191434, y=3564121: closest beacon is at x=3420256, y=2939344
Sensor at x=3080887, y=2781756: closest beacon is at x=3420256, y=2939344
Sensor at x=3543287, y=3060807: closest beacon is at x=3420256, y=2939344
Sensor at x=2476158, y=3949016: closest beacon is at x=2453611, y=3029623
Sensor at x=3999769, y=3985671: closest beacon is at x=3420256, y=2939344
Sensor at x=2435331, y=2200565: closest beacon is at x=1908435, y=2403457
Sensor at x=3970047, y=2036397: closest beacon is at x=3691788, y=1874066
Sensor at x=2232167, y=2750817: closest beacon is at x=2453611, y=3029623
Sensor at x=157988, y=333826: closest beacon is at x=-1236383, y=477990
Sensor at x=1035254, y=2261267: closest beacon is at x=1908435, y=2403457
Sensor at x=1154009, y=888885: closest beacon is at x=1070922, y=-543463
Sensor at x=2704724, y=257848: closest beacon is at x=3428489, y=-741777
Sensor at x=3672526, y=2651153: closest beacon is at x=3420256, y=2939344
Sensor at x=2030614, y=2603134: closest beacon is at x=1908435, y=2403457
Sensor at x=2550448, y=2781018: closest beacon is at x=2453611, y=3029623
Sensor at x=3162759, y=2196461: closest beacon is at x=3691788, y=1874066
Sensor at x=463834, y=1709480: closest beacon is at x=-208427, y=2000000
Sensor at x=217427, y=2725325: closest beacon is at x=-208427, y=2000000
Sensor at x=3903198, y=945190: closest beacon is at x=3691788, y=1874066`;
}

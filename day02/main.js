import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8").trim().split("\n");

const part1 = () => {
  return input
    .map((line) => {
      const [game, removals] = line.split(": ");

      const rems = removals.split("; ").map((removal) =>
        removal.split(", ").reduce(
          (acc, curr) => {
            const [num, color] = curr.split(" ");
            return { ...acc, [color]: acc[color] + parseInt(num) };
          },
          { red: 0, green: 0, blue: 0 }
        )
      );

      if (
        rems.some((r) => r.red > 12) ||
        rems.some((r) => r.green > 13) ||
        rems.some((r) => r.blue > 14)
      ) {
        return 0;
      }

      return +game.replace("Game ", "");
    })
    .reduce((acc, curr) => acc + curr, 0);
};

const part2 = () => {
  return input
    .map((line) => {
      const [game, removals] = line.split(": ");

      const rems = removals.split("; ").map((removal) =>
        removal.split(", ").reduce(
          (acc, curr) => {
            const [num, color] = curr.split(" ");
            return { ...acc, [color]: acc[color] + parseInt(num) };
          },
          { red: 0, green: 0, blue: 0 }
        )
      );

      const maxRed = Math.max(...rems.map((r) => r.red));
      const maxGreen = Math.max(...rems.map((r) => r.green));
      const maxBlue = Math.max(...rems.map((r) => r.blue));

      return maxRed * maxGreen * maxBlue;
    })
    .reduce((acc, curr) => acc + curr, 0);
};

console.log("part 1", part1());
console.log("part 2", part2());

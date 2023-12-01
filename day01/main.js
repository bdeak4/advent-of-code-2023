import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8").trim().split("\n");

const part1 = () => {
  return input
    .map((line) => line.match(/[0-9]/g))
    .map((parsed) => parsed[0] + parsed[parsed.length - 1])
    .reduce((acc, curr) => acc + parseInt(curr), 0);
};

const part2 = () => {
  const digitWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const rev = (str) => str.split("").reverse().join("");

  return input
    .map((line) => [
      line.match(new RegExp(`[0-9]|${digitWords.join("|")}`))[0],
      rev(
        rev(line).match(new RegExp(`[0-9]|${digitWords.map(rev).join("|")}`))[0]
      ),
    ])
    .map(([first, last]) => [
      first.match(/[0-9]/) ? first : `${digitWords.indexOf(first) + 1}`,
      last.match(/[0-9]/) ? last : `${digitWords.indexOf(last) + 1}`,
    ])
    .map(([first, last]) => first + last)
    .reduce((acc, curr) => acc + parseInt(curr), 0);
};

console.log("part 1", part1());
console.log("part 2", part2());

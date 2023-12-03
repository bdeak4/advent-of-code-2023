import fs from "fs";

const lines = fs.readFileSync("./input.txt", "utf8").trim().split("\n");

const part1 = () => {
  let sum = 0;

  for (const [index, line] of lines.entries()) {
    for (const numberMatch of line.matchAll(/\d+/g)) {
      const startIndex = Math.max(numberMatch.index - 1, 0);
      const endIndex = Math.min(
        numberMatch.index + numberMatch[0].length + 1,
        line.length
      );

      const searchArea = [
        ...lines[Math.max(index - 1, 0)].slice(startIndex, endIndex),
        ...line.slice(startIndex, endIndex),
        ...lines[Math.min(index + 1, lines.length - 1)].slice(
          startIndex,
          endIndex
        ),
      ];

      const nearSymbol =
        searchArea.filter((char) => char !== "." && isNaN(char)).length > 0;

      if (nearSymbol) {
        sum += parseInt(numberMatch[0]);
      }
    }
  }

  return sum;
};

const part2 = () => {
  let sum = 0;

  const expandSearchArea = (line, startIndex, endIndex) => {
    let expandedStartIndex = startIndex;
    let expandedEndIndex = endIndex;
    let expandedLine = line.slice(expandedStartIndex, expandedEndIndex);

    while (!isNaN(expandedLine[0])) {
      if (expandedStartIndex === 0) {
        break;
      }
      expandedStartIndex -= 1;
      expandedLine = line.slice(expandedStartIndex, expandedEndIndex);
    }

    while (!isNaN(expandedLine[expandedLine.length - 1])) {
      if (expandedEndIndex === line.length) {
        break;
      }
      expandedEndIndex += 1;
      expandedLine = line.slice(expandedStartIndex, expandedEndIndex);
    }

    return expandedLine;
  };

  for (const [index, line] of lines.entries()) {
    for (const gearMatch of line.matchAll(/\*/g)) {
      const startIndex = Math.max(gearMatch.index - 1, 0);
      const endIndex = Math.min(gearMatch.index + 2, line.length);

      const searchArea =
        (index > 0
          ? expandSearchArea(lines[index - 1], startIndex, endIndex)
          : "") +
        expandSearchArea(line, startIndex, endIndex) +
        (index < lines.length - 1
          ? expandSearchArea(lines[index + 1], startIndex, endIndex)
          : "");

      const gears = searchArea.match(/\d+/g).map((g) => +g);
      const gearRatio = gears.reduce((a, b) => a * b, 1);

      if (gears.length !== 2) {
        continue;
      }

      sum += gearRatio;
    }
  }

  return sum;
};

console.log("part 1", part1());
console.log("part 2", part2());

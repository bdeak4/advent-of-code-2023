import fs from "fs";

const lines = fs.readFileSync("./input.txt", "utf8").trim().split("\n");

const part1 = () => {
  return lines
    .map((line) => {
      const [, numbers] = line.split(": ");
      const [winningNumbersStr, cardNumbersStr] = numbers.split(" | ");
      const winningNumbers = winningNumbersStr.match(/\d+/g).map(Number);
      const cardNumbers = cardNumbersStr.match(/\d+/g).map(Number);
      const cardWinningNumbers = cardNumbers.filter((number) =>
        winningNumbers.includes(number)
      );
      return cardWinningNumbers.length > 0
        ? 2 ** (cardWinningNumbers.length - 1)
        : 0;
    })
    .reduce((a, b) => a + b, 0);
};

const part2 = () => {
  const processedLines = lines.map((line) => {
    const [, numbers] = line.split(": ");
    const [winningNumbersStr, cardNumbersStr] = numbers.split(" | ");
    const winningNumbers = winningNumbersStr.match(/\d+/g).map(Number);
    const cardNumbers = cardNumbersStr.match(/\d+/g).map(Number);
    const cardWinningNumbers = cardNumbers.filter((number) =>
      winningNumbers.includes(number)
    );
    return cardWinningNumbers.length;
  });
  const result = [...processedLines];

  const fn = (startIndex, endIndex) => {
    for (let i = startIndex; i < endIndex; i++) {
      const newLines = processedLines.slice(i + 1, i + processedLines[i] + 1);
      result.push(...newLines);
      fn(i + 1, i + processedLines[i] + 1);
    }
  };

  fn(0, processedLines.length);

  return result.length;
};

console.log("part 1", part1());
console.log("part 2", part2());

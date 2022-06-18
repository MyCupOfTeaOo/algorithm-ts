import { Direction } from "./interface";

export function insertSortRun(
  numbers: number[],
  direction: Direction,
  start: number,
  end: number
) {
  for (let i = start + 1; i <= end; i += 1) {
    const current = numbers[i];
    let prevIndex = i - 1;
    if (direction === "ASC") {
      while (prevIndex >= start && current < numbers[prevIndex]) {
        prevIndex -= 1;
      }
    } else {
      while (prevIndex >= start && current > numbers[prevIndex]) {
        prevIndex -= 1;
      }
    }

    if (prevIndex !== i - 1) {
      numbers.splice(prevIndex + 1, 0, numbers.splice(i, 1)[0]);
    }
  }
  return numbers;
}

function insertSort(numbers: number[], direction: Direction = "ASC") {
  const copyNumbers = [...numbers];
  insertSortRun(copyNumbers, direction, 0, copyNumbers.length - 1);
  return copyNumbers;
}

export default insertSort;

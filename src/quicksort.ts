import { insertSortRun } from "./insertSort";
import { Direction } from "./interface";
import { swap } from "./utils";

function numberOfThree(
  numbers: number[],
  direction: Direction,
  start: number,
  end: number
): number {
  const middle = (start + (end - start)) >> 1;
  if (direction === "ASC") {
    // 这边交换是为了后续的处理基准在最右边
    if (numbers[middle] > numbers[start]) {
      swap(numbers, middle, start);
    }
    if (numbers[start] > numbers[end]) {
      swap(numbers, start, end);
    }
    if (numbers[middle] > numbers[end]) {
      swap(numbers, middle, end);
    }
  } else {
    if (numbers[middle] < numbers[start]) {
      swap(numbers, middle, start);
    }
    if (numbers[start] < numbers[end]) {
      swap(numbers, start, end);
    }
    if (numbers[middle] < numbers[end]) {
      swap(numbers, middle, end);
    }
  }
  // numbers[middle] <= numbers[end] <= numbers[start]
  return numbers[end];
}

function partition(
  numbers: number[],
  direction: Direction,
  start: number,
  end: number
): [number, number] {
  // 基准优化,三数取中指
  const pivot = numberOfThree(numbers, direction, start, end);
  let pivotIndex = start;
  let sameNumber = 0;
  for (let i = start; i < end; i += 1) {
    if (
      (direction === "ASC" && numbers[i] <= pivot) ||
      (direction === "DESC" && numbers[i] >= pivot)
    ) {
      swap(numbers, pivotIndex, i);
      // 聚集优化
      if (numbers[pivotIndex] === pivot) {
        sameNumber += 1;
      } else {
        swap(numbers, pivotIndex - sameNumber, pivotIndex);
      }
      pivotIndex += 1;
    }
  }
  swap(numbers, pivotIndex, end);
  return [pivotIndex - sameNumber, pivotIndex];
}

export function quickSortRun(
  numbers: number[],
  direction: Direction,
  start: number,
  end: number
) {
  // 栈深度过低使用插入排序优化
  if (end - start + 1 < 10) {
    insertSortRun(numbers, direction, start, end);
    return;
  }
  // 递归优化,优化递归栈深度
  while (start < end) {
    const [leftPivotIndex, rightPivotIndex] = partition(
      numbers,
      direction,
      start,
      end
    );
    quickSortRun(numbers, direction, start, leftPivotIndex - 1);
    start = rightPivotIndex + 1;
  }
}

function quickSort(numbers: number[], direction: Direction = "ASC"): number[] {
  const copyNumbers = [...numbers];
  quickSortRun(copyNumbers, direction, 0, copyNumbers.length - 1);
  return copyNumbers;
}

export default quickSort;

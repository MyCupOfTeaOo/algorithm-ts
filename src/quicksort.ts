function insertSort(
  numbers: number[],
  direction: "ASC" | "DESC",
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

function numberOfThree(
  numbers: number[],
  direction: "ASC" | "DESC",
  start: number,
  end: number
): number {
  const middle = (start + (end - start)) >> 1;
  if (direction === "ASC") {
    // 这边交换是为了后续的处理基准在最右边
    if (numbers[middle] > numbers[start]) {
      [numbers[middle], numbers[start]] = [numbers[start], numbers[middle]];
    }
    if (numbers[start] > numbers[end]) {
      [numbers[start], numbers[end]] = [numbers[end], numbers[start]];
    }
    if (numbers[middle] > numbers[end]) {
      [numbers[middle], numbers[end]] = [numbers[end], numbers[middle]];
    }
  } else {
    if (numbers[middle] < numbers[start]) {
      [numbers[middle], numbers[start]] = [numbers[start], numbers[middle]];
    }
    if (numbers[start] < numbers[end]) {
      [numbers[start], numbers[end]] = [numbers[end], numbers[start]];
    }
    if (numbers[middle] < numbers[end]) {
      [numbers[middle], numbers[end]] = [numbers[end], numbers[middle]];
    }
  }
  // numbers[middle] <= numbers[end] <= numbers[start]
  return numbers[end];
}

function partition(
  numbers: number[],
  direction: "ASC" | "DESC",
  start: number,
  end: number
): [number, number] {
  // 基准优化,三数取中指
  const pivot = numberOfThree(numbers, direction, start, end);
  let middle = start;
  let sameNumber = 0;
  for (let i = start; i < end; i += 1) {
    if (
      (direction === "ASC" && numbers[i] <= pivot) ||
      (direction === "DESC" && numbers[i] >= pivot)
    ) {
      [numbers[middle], numbers[i]] = [numbers[i], numbers[middle]];
      // 聚集优化
      if (numbers[middle] === pivot) {
        sameNumber += 1;
      } else {
        [numbers[middle - sameNumber], numbers[middle]] = [
          numbers[middle],
          numbers[middle - sameNumber],
        ];
      }
      middle += 1;
    }
  }
  [numbers[middle], numbers[end]] = [numbers[end], numbers[middle]];
  return [middle - sameNumber, middle];
}

function quicksortRun(
  numbers: number[],
  direction: "ASC" | "DESC",
  start: number,
  end: number
) {
  // 栈深度过低使用插入排序优化
  if (end - start + 1 < 10) {
    insertSort(numbers, direction, start, end);
    return;
  }
  // 递归优化,优化递归栈深度
  while (start < end) {
    const [leftPivot, rightPivot] = partition(numbers, direction, start, end);
    quicksortRun(numbers, direction, start, leftPivot - 1);
    start = rightPivot + 1;
  }
}

function quicksort(
  numbers: number[],
  direction: "ASC" | "DESC" = "ASC"
): number[] {
  const copyNumbers = numbers;
  quicksortRun(copyNumbers, direction, 0, numbers.length - 1);
  return copyNumbers;
}

export default quicksort;
export function swap(numbers: number[], i: number, j: number) {
  [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
}

import insertSort from "./insertSort";

test("insertSort", () => {
  expect(insertSort([1, 3, 2, 4, 5, 3])).toMatchObject([1, 2, 3, 3, 4, 5]);
  expect(insertSort([1, 3, 2, 4, 5, 3], "DESC")).toMatchObject([
    5, 4, 3, 3, 2, 1,
  ]);
  expect(insertSort([1, 3, 0, 2, 4, 5, 3], "ASC")).toMatchObject([
    0, 1, 2, 3, 3, 4, 5,
  ]);
  expect(insertSort([1, 3, 0, 2, 4, 5, 3], "DESC")).toMatchObject([
    5, 4, 3, 3, 2, 1, 0,
  ]);

  expect(
    insertSort([0, 0, 0, 1, 3, 0, 0, 0, 2, 4, 5, 3, 0, 0, 0])
  ).toMatchObject([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 4, 5]);
});

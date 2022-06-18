import question_105 from "./question_105";

test("question_105", () => {
  expect(
    question_105(
      13,
      [3, 3, 7, 4, 4, 4, 4, 7, 7, 3, 5, 5, 5],
      [53, 80, 68, 24, 39, 76, 66, 16, 100, 55, 53, 80, 55]
    )
  ).toMatchObject([5, 3, 7, 4]);
});

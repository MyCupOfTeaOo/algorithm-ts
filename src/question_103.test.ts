import question_103 from "./question_103";

test("question_103", () => {
  expect(question_103([22, 221])).toBe(22221);
  expect(question_103([4589, 101, 41425, 9999])).toBe(9999458941425101);
});

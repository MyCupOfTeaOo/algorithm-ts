import { expect } from "@jest/globals";

/* 给定一个射击比赛成绩单
  包含多个选手若干次射击的成绩分数
  请对每个选手按其最高三个分数之和进行降序排名
  输出降序排名后的选手id序列
  条件如下
    1. 一个选手可以有多个射击成绩的分数，且次序不固定
    2. 如果一个选手成绩少于3个，则认为选手的所有成绩无效，排名忽略该选手
    3. 如果选手的成绩之和相等，则相等的选手按照其id降序排列

   输入描述:
     输入第一行
         一个整数N
         表示该场比赛总共进行了N次射击
         产生N个成绩分数
         2<=N<=100

     输入第二行
       一个长度为N整数序列
       表示参与每次射击的选手id
       0<=id<=99

     输入第三行
        一个长度为N整数序列
        表示参与每次射击选手对应的成绩
        0<=成绩<=100

   输出描述:
      符合题设条件的降序排名后的选手ID序列

   示例一
      输入:
        13
        3,3,7,4,4,4,4,7,7,3,5,5,5
        53,80,68,24,39,76,66,16,100,55,53,80,55
      输出:
        5,3,7,4
      说明:
        该场射击比赛进行了13次
        参赛的选手为{3,4,5,7}
        3号选手成绩53,80,55 最高三个成绩的和为188
        4号选手成绩24,39,76,66  最高三个成绩的和为181
        5号选手成绩53,80,55  最高三个成绩的和为188
        7号选手成绩68,16,100  最高三个成绩的和为184
        比较各个选手最高3个成绩的和
        有3号=5号>7号>4号
        由于3号和5号成绩相等  且id 5>3
        所以输出5,3,7,4 
*/

function question_105(n: number, ids: number[], scores: number[]): number[] {
  expect(n > 1).toBe(true);
  expect(ids).toHaveLength(n);
  expect(scores).toHaveLength(n);
  const id2ScoresMap = new Map<number, number[]>();
  for (let i = 0; i < n; i += 1) {
    const id = ids[i];
    let itemScores = id2ScoresMap.get(id);
    const score = scores[i];
    if (!itemScores) {
      itemScores = [score];
      id2ScoresMap.set(id, itemScores);
      continue;
    }
    itemScores.push(score);
  }
  return Array.from(id2ScoresMap)
    .map<[number, number]>((item) => {
      return [
        item[0],
        item[1]
          .sort((a, b) => b - a)
          .slice(0, 3)
          .reduce((total, cur) => total + cur, 0),
      ];
    })
    .sort((prev, next) => {
      return next[1] - prev[1] || next[0] - prev[0];
    })
    .map((item) => item[0]);
}

export default question_105;
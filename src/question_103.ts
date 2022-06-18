/*
  小组中每位都有一张卡片
  卡片是6位以内的正整数
  将卡片连起来可以组成多种数字
  计算组成的最大数字

  输入描述：
    ","分割的多个正整数字符串
    不需要考虑非数字异常情况
    小组种最多25个人

   输出描述：
     最大数字字符串

   示例一
     输入
      22,221
     输出
      22221

    示例二
      输入
        4589,101,41425,9999
      输出
        9999458941425101
*/
function question_103(numbers: number[]): number {
  return Number(
    numbers
      .map((item) => item.toString())
      .sort((a, b) => {
        if (a.length === b.length) {
          return b > a ? 1 : -1;
        }
        const minLength = Math.min(a.length, b.length);
        const a2 = a.slice(0, minLength);
        const b2 = b.slice(0, minLength);
        if (a2 === b2) {
          if (a.length > b.length) {
            return b.charCodeAt(0) > a.charCodeAt(minLength) ? 1 : -1;
          } else {
            return b.charCodeAt(minLength) > a.charCodeAt(0) ? 1 : -1;
          }
        }
        return b2 > a2 ? 1 : -1;
      })
      .join("")
  );
}

export default question_103;

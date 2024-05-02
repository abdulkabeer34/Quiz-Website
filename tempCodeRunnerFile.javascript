let arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ],
  rowsCount = 8,
  colsCount = 5;

if (rowsCount * colsCount != arr.length) return [];

let newArr = [];
let newArr2 = Array.from({ length: rowsCount }, () => []);

for (let i = 0; i < arr.length; i = i + rowsCount) {
  if (i % 2 == 1) {
    newArr.push(arr.slice(i, i + rowsCount).reverse());
  } else newArr.push(arr.slice(i, i + rowsCount));
}

for (let i = 0; i < rowsCount; i++) {
  for (let j = 0; j < colsCount; j++) {
    const itemos = newArr[j][i];
    if (itemos) newArr2[i].push(itemos);
  }
}
console.log(newArr)
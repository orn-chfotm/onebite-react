// 1. 배열 생성
let arrA = new Array();
let arrB = [];

let arrC = [1, 2, 3, true, "hello", null, undefined, () => {}, {}, []];

// .2 배열 요소 접근

let item1 = arrC[0];
let item2 = arrC[1];

arrC[0] = "hello";

console.log(item1, item2);
console.log(arrC);

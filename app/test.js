const arr = [1, 6, 4];

function bubbleSort(arr) {
  const arrLen = arr.length;
  for (let outer = arrLen; outer >= 2; outer--) {
    for (let inner = 0; inner <= outer - 1; inner++) {
      if (arr[inner] > arr[inner + 1]) {
        swap(arr, inner, inner + 1);
      }
    }
  }
  return arr;
}
console.log(bubbleSort(arr));

function swap(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}




























function insertionSort(arr) {
  const resultArr = [];

  resultArr[0] = arr[0];

  if (arr[1] < resultArr[0]) {
    resultArr[1] = resultArr[0];
    resultArr[0] = arr[1];
  } else {
    resultArr[1] = arr[1];
  }
  if (arr[2] < resultArr[0]) {
    resultArr[2] = resultArr[1];
    resultArr[1] = resultArr[0];
    resultArr[0] = arr[2];
  } else if (arr[2] < resultArr[1]) {
    resultArr[2] = resultArr[1];
    resultArr[1] = arr[2];
  } else {
    resultArr[2] = arr[2];
  }






  return resultArr;
}

console.log(insertionSort(arr));

function midSearch(arr, target) {
  const n = arr.length;
  let left = 0,
    right = n;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (mid === target) return mid;
    else if (mid > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * 冒泡排序
 * @param {number[]} nums
 * @returns {number[]}
 */
function bubbleSort(nums) {
  const len = nums.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        swap(nums, j, j + 1);
      }
    }
  }
  return nums;
}
/**
 * 选择排序
 * @param {number[]} nums
 * @returns {number[]}
 */
function selectionSort(nums) {
  const len = nums.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j;
      }
    }
    swap(nums, i, minIndex);
  }
  return nums;
}
/**
 * 插入排序
 * @param {number[]} nums
 * @returns {number[]}
 */
function insertionSort(nums) {
  const len = nums.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = nums[i];
    while (preIndex >= 0 && nums[preIndex] > current) {
      nums[preIndex + 1] = nums[preIndex];
      preIndex--;
    }
    nums[preIndex + 1] = current;
  }
  return nums;
}
/**
 * 希尔排序
 * @param {number[]} nums
 * @returns {number[]}
 */
function shellSort(nums) {
  const len = nums.length;
  // 定义动态间隔
  let gap = 1;
  while (gap < len / 3) {
    gap = gap * 3 + 1;
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      const temp = nums[i];
      for (let j = i - gap; j >= 0 && nums[j] > temp; j -= gap) {
        nums[j + gap] = nums[j];
      }
      nums[j + gap] = temp;
    }
  }
  return nums;
}
/**
 * 快速排序
 * @param {number[]} nums
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
function quickSort(nums, start, end) {
  if (start < end) {
    const key = nums[start];
    let left = start,
      right = end;
    while (left < right) {
      while (left < right && nums[right] > key) {
        right--;
      }
      if (left < right) {
        swap(nums, left, right);
        left++;
      }
      while (left < right && nums[left] < key) {
        left++;
      }
      if (left < right) {
        swap(nums, left, right);
        right--;
      }
    }
    quickSort(nums, start, left - 1);
    quickSort(nums, left + 1, end);
  }
  return nums;
}
/**
 * 归并排序
 * @param {number[]} nums
 * @returns {number[]}
 */
function mergeSort(nums) {
  const n = nums.length;
  if (n <= 1) return nums;
  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));
  return merge(left, right);
}
function merge(arr1, arr2) {
  const n1 = arr1.length,
    n2 = arr2.length;
  let i = 0,
    j = 0;
  const result = [];
  while (i < n1 && j < n2) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else if (arr1[i] > arr2[j]) {
      result.push(arr2[j]);
      j++;
    } else {
      result.push(arr1[i], arr2[j]);
      i++;
      j++;
    }
  }
  while (i < n1) {
    result.push(arr1[i]);
  }
  while (j < n2) {
    result.push(arr2[j]);
  }
  return result;
}
/**
 * 堆排序
 * @param {number[]} nums
 * @returns {number[]}
 */
function heapSort(nums) {
  buildMaxHeap(nums);
  let len = nums.length;
  for (let i = nums.length - 1; i >= 0; i--) {
    swap(nums, 0, i);
    len--;
    heapify(nums, 0, len);
  }
  return nums;
}
function buildMaxHeap(nums) {
  const len = nums.length;
  for (let i = Math.floor(len / 2); i >= 0; i--) {
    heapify(nums, i);
  }
}
function heapify(nums, i, len) {
  let left = 2 * i + 1,
    right = 2 * i + 2;
  let largest = i;
  if (left < len && nums[left] > nums[largest]) {
    largest = left;
  }
  if (right < len && nums[right] > nums[largest]) {
    largest = right;
  }
  if (largest != i) {
    swap(largest, i, largest);
    heapify(nums, largest);
  }
}
/**
 * 计数排序
 * @param {number[]} nums
 * @param {number} maxValue
 * @returns {number[]}
 */
function countingSort(nums, maxValue) {
  const len = nums.length;
  const bucketLength = maxValue + 1;
  const bucket = new Array(bucketLength).fill(0);
  for (let i = 0; i < len; i++) {
    bucket[nums[i]]++;
  }
  const sortedIndex = 0;
  for (let i = 0; i < bucketLength; i++) {
    while (bucket[i] > 0) {
      nums[sortedIndex++] = i;
      bucket[i]--;
    }
  }
  return nums;
}
/**
 * 基数排序
 * @param {number[]} nums 
 * @param {number} maxDigit 
 */
function radixSort(nums, maxDigit) {
  const len = nums.length;
  const counter = [];
  let mod = 10,
    dev = 1;
  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (let j = 0; j < len; j++) {
      let bucket = parseInt((nums[j] % mod) / dev);
      if (!counter[bucket]) {
        counter[bucket] = [];
      }
      counter[bucket].push(nums[j]);
    }
    let pos = 0;
    for (let j = 0; j < counter.length; j++) {
      if (!counter[j]) {
        let value = counter[j].shift();
        while (value) {
          nums[pos++] = value;
          value = counter[j].shift();
        }
      }
    }
  }
  return nums;
}

/**
 * 桶排序
 * @param {number[]} nums
 * @param {number} bucketSize
 * @returns {number[]}
 */
function bucketSort(nums, bucketSize) {
  const len = nums.length;
  if (len === 0) return nums;
  const minValue = Math.min(...nums),
    maxValue = Math.max(...nums);
  const DEFAULT_BUCKET_SIZE = 5;
  bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = new Array(bucketCount).fill(0).map(() => []);
  // 利用映射函数将数据分配到各个桶中
  for (let i = 0; i < len; i++) {
    const index = Math.floor((nums[i] - minValue) / bucketSize);
    buckets[index].push(nums[i]);
  }
  nums.length = 0;
  for (let i = 0; i < bucketCount; i++) {
    // 对每个桶进行排序
    insertionSort(buckets[i]);
    for (let j = 0; j < buckets[i].length; j++) {
      nums.push(buckets[i][j]);
    }
  }
  return nums;
}

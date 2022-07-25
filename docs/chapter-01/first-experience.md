---
page: true
title: first-experience
outline: deep
returnToTop: true
---

# 算法初体验 —— 二分查找 {#binary-search}

## 1. 引导

思考一个问题，如何在一个**升序排列数组**中找到某个数的下标呢？

比如： `arr = [10, 11, 12, 16, 18, 23, 29, 33, 48, 54, 57, 68, 77, 84, 98]`，如何在这个数组中找到 48 的下标呢？

- 最简单的方法：从头到尾遍历这个数组

> 要是你跟我说用什么 `indexOf, findIndex`，我只能说，兄弟，别搞。

## 2. 二分查找

之后我们会详细的讲解二分查找，这里只是简单的让大家初步感受一些算法的魅力。

<div align='center'>
  <img src="/assets/chapter-01/binary-search/01.png" alt="image-20220329080948444" style="zoom:50%;" />
</div>

算法的每次循环都会将查找的范围缩小一半。

- 如果被查找的键等于 `arr[mid]`
- 如果被查找的键大于 `arr[mid]`，那么说明这个键一定在 `arr[mid]` 的右边，这样就将范围缩小一半了
- 同样，如果被查找的键小于 `arr[mid]`，那么说明这个键一定在 `arr[mid]` 的左边

1. 递归版本

   ```js
   function BinarySearch(arr, left, right, key) {
     if (left < right) return -1;
     const mid = left + ((right - left) >> 1);
     const now = arr[mid];
     if (now > key) {
       return BinarySearch(arr, left, mid - 1, key);
     } else if (now < key) {
       return BinarySearch(arr, mid + 1, right, key);
     } else {
       return mid;
     }
   }

   function main(arr, key) {
     return BinarySearch(arr, 0, arr.length - 1, key);
   }

   const arr = [10, 11, 12, 16, 18, 23, 29, 33, 48, 54, 57, 68, 77, 84, 98];

   const res = main(arr, 48);
   console.log(res);
   ```

2. 迭代版本

   ```js
   function BinarySearch(arr, key) {
     let left = 0;
     let right = arr.length - 1;
     while (left <= right) {
       const mid = left + ((right - left) >> 1);
       const now = arr[mid];
       if (now > key) {
         right = mid - 1;
       } else if (now < key) {
         left = mid + 1;
       } else {
         return mid;
       }
     }
     return -1;
   }

   function main(arr, key) {
     return BinarySearch(arr, key);
   }

   const arr = [10, 11, 12, 16, 18, 23, 29, 33, 48, 54, 57, 68, 77, 84, 98];

   const res = main(arr, 48);
   console.log(res);
   ```
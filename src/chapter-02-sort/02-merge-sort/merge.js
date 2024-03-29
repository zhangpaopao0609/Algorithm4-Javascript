// 归并两个已排序的数组
function merge_tow_sorted_arr(arr1, arr2) {
  const l1 = arr1.length;
  const l2 = arr2.length;
  const res = [];

  // 指针 p 指向数组 1，指针 q 指向数组 2，指针 k 指向数组 res，
  // 当 p 和 q 都越过了数组，意味着两个数组中的元素都排序完了，此时退出
  for (let p = 0, q = 0, k = 0; p < l1 || q < l2; ) {
    // 数组 1 已经没有元素了，所以直接放入数组 2 的元素
    if (p === l1) res[k++] = arr2[q++];
    // 数组 2 已经没有元素了，所以直接放入数组 1 的元素
    else if (q === l2) res[k++] = arr1[p++];
    // 此时数组 1 的元素大于数组 2 的元素，所以放入数组 2 的元素
    else if (arr1[p] > arr2[q]) res[k++] = arr2[q++];
    // 此时数组 1 的元素小于或等于数组 2 的元素，所以放入数组 1 的元素
    else res[k++] = arr1[p++];
  }

  return res;
}

const arr1 = [1, 4, 5];
const arr2 = [2, 3, 6, 7];
console.log(merge_tow_sorted_arr(arr1, arr2));

// 一个数组整体是无序的，但 l~mid 是已排序的，mid+1~r 也是已排序的
// 原地归并，就是直接对这个数组的 l~mid 和 mid+1~r 进行归并操作，不返回额外的数组
// 其中 l, mid, mid+1, r 都是指的索引

function merge_in_place(arr, l, mid, r) {
  // 存储归并前的数组，原因在于下面的操作会覆盖 arr 中的元素
  const keep = [];
  for (let i = l; i <= r; i++) {
    keep[i] = arr[i];
  }

  // 指针 p 指向 l~mid 部分，起始位置 l
  // 指针 q 指向 mid+1~r 部分，起始位置 mid + 1
  // 指针 k 指向数组 arr，起始位置 l
  // 当 p 越过 mid 并且 q 越过 r，
  // 意味着 l~mid 和 mid+1~r 中的元素都排序完了，此时退出
  for (let p = l, q = mid + 1, k = l; p <= mid || q <= r; ) {
    // l~mid 部分已经没有元素了，所以 arr k 位置放入 mid+1~r 部分的元素
    // 因为是原地赋值，所以 arr 原本的值会在归并的过程中被覆盖
    // 所以需要存储一个归并前的数组
    if (p === mid + 1) arr[k++] = keep[q++];
    // mid+1~r 部分已经没有元素了，所以 arr k 位置放入 l~mid 部分的元素
    else if (q === r + 1) arr[k++] = keep[p++];
    // 此时 l~mid 部分的元素大于 mid+1~r 部分的元素，
    // 所以 arr k 位置放入 mid+1~r 部分的元素
    else if (keep[p] > keep[q]) arr[k++] = keep[q++];
    // 此时 l~mid 部分的元素小于或等于 mid+1~r 部分的元素，
    // 所以 arr k 位置放入 l~mid 部分的元素
    else arr[k++] = keep[p++];
  }
}

const arr3 = [1, 4, 5, 2, 3, 6, 7];
merge_in_place(arr3, 0, 2, arr3.length - 1);
console.log(arr3);

// slice 来存储数组，但这样可能会稍微多占用内存
function merge_in_place_v2(arr, l, mid, r) {
  const keep = arr.slice(0);

  for (let p = l, q = mid + 1, k = l; p <= mid || q <= r; ) {
    if (p === mid + 1) arr[k++] = keep[q++];
    else if (q === r + 1) arr[k++] = keep[p++];
    else if (keep[p] > keep[q]) arr[k++] = keep[q++];
    else arr[k++] = keep[p++];
  }
}

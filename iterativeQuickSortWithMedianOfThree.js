/* Iterative quick sort with median of three partitioning

Works cited
1. Stack algorithm: https://learnersbucket.com/examples/algorithms/quick-sort-iterative/
2. Median of three
      2.1. https://www.oreilly.com/library/view/algorithms-in-a/9780596516246/ch04s04.html
      2.2. https://stackoverflow.com/questions/7559608/median-of-three-values-strategy */

class Node {
  constructor(data, next, prev) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class Stack {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(data) {
    if (!this.head) {
      this.head = new Node(data);
      this.tail = this.head;
    } else {
      const node = new Node(data);
      node.next = this.tail;
      this.tail = node;
    }
  }

  pop() {
    if (!this.head) return null;
    else if (this.head === this.tail) {
      const value = this.head.data;
      this.head = null;
      this.tail = null;
      return value;
    } else {
      let node = this.tail;
      const value = node.data;
      this.tail = this.tail.next;
      node = null;
      return value;
    }
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.itr = null;
  }

  create(a) {
    const l = a.length;
    for (let i = 0; i < l; i++) {
      if (!this.head) {
        this.head = new Node(a[i]);
        this.itr = this.head;
      } else {
        this.itr.next = new Node(a[i]);
        this.itr.next.prev = this.itr;
        this.itr = this.itr.next;
        this.tail = this.itr;
      }
    }
  }

  medianOfThree(start, median, end) {
    let l = this.head;
    let m = this.head;
    let r = this.head;

    l = this.traversal(l, start);
    m = this.traversal(m, median);
    r = this.traversal(r, end);

    const min = Math.min(l.data, m.data, r.data);
    const max = Math.max(l.data, m.data, r.data);
    let med;

    if (l.data === min && r.data === min) {
      if (m.data === max) med = r.data;

    } else if (l.data === max && r.data === max) {
      if (m.data === min) med = l.data;

    } else if (l.data === min && r.data === max ||
        l.data === max && r.data === min) {
          med = m.data;

    } else if (l.data === min && r.data === max ||
             l.data === max && m.data === min) {
               med = r.data;

    } else if (l.data === min && r.data < max ||
               r.data === min && l.data < max) {
      med = r.data;

    } else med = l.data;

    l.data = min;
    m.data = med;
    r.data = max;

    this.reOrder(l, m, r);

    const pivot = this.findCount(m);
    return pivot;
  }

  reOrder(l, m, r) {
    const pivot = m.data;

    while (true) {

      if (l.data <= pivot) {
        if (l.next != m) l = l.next;
        else {

          if (r.prev === m) {
            if (r.data >= pivot) return;
            else {
              this.addLeft(l, m, r);
              let temp = r;
              r = r.prev;
              temp = null;
              l = l.next;
              if (r === m) return;
            }

          } else {
            if (r.data < pivot) {
              this.addLeft(l, m, r);
              let temp = r;
              r = r.prev;
              temp = null;
              l = l.next;
              if (r === m) return;
            } else r = r.prev;
          }
        }

      } else {
        while (r.data >= pivot && r.prev != m) {
          r = r.prev;
        }

        if (r.data < pivot) {
          const temp = l.data;
          l.data = r.data;
          r.data = temp;

        } else {
          this.addRight(l, m, r);
          let temp = l;
          l = l.next;
          temp = null;
          r = r.prev;
          if (l === m) return;
        }
      }
    }
  }

  addLeft(l, m, r) {
    const node = new Node(r.data);
    node.next = m;
    m.prev = node;
    node.prev = l;
    l.next = node;
    l = l.next;

    let temp = r;
    if (!r.next) {
      r = r.prev;
      temp = null;
    } else {
      r.next.prev = l.prev;
      r.prev.next = r.next;
    }
  }

  addRight(l, m, r) {
    const node = new Node(l.data);
    node.next = r;
    r.prev = node;
    node.prev = m;
    m.next = node;
    r = r.prev;

    let temp;
    if (!l.prev) {
      l = l.next;
      temp = l.prev;
      temp = null;
    } else {
      l.prev.next = l.next;
      l.next.prev = l.prev;
    }
  }

  findCount(m) {
    let pivot = 0;
    let itr = this.head;
    while (itr != m) {
      pivot++;
      itr = itr.next;
    }
    return pivot;
  }

  sortTwoNodes(start, end) {
    let itr = this.head;
    itr = this.traversal(itr, start);
    if (itr.data > itr.next.data) {
      const temp = itr.data;
      itr.data = itr.next.data;
      itr.next.data = temp;
    }
  }

  sortThreeNodes(start, end) {
    let itr = this.head;
    itr = this.traversal(itr, start);

    const values = this.insertionSort(
      [itr.data, itr.next.data, itr.next.next.data]
    );

    itr.data = values[0];
    itr.next.data = values[1];
    itr.next.next.data = values[2];
  }

  insertionSort(values) {
    const len = values.length;

    for (let i = 1; i < len; i++) {
      const key = values[i];
      let j = i - 1;
      while (j >= 0 && values[j] > key) {
        values[j + 1] = values[j];
        j--;
      }
      values[j + 1] = key;
    }

    return values;
  }

  traversal(itr, count) {
    while (count != 0) {
      itr = itr.next;
      count--;
    }

    return itr;
  }

  listToArray() {
    const result = [];
    let itr = this.head;

    while (itr.next) {
      result.push(itr.data);
      itr = itr.next;
    }
    result.push(itr.data);

    return result;
  }
}

class QuickSort {
  createInput() {
    const result = [];
    const int = 10;
    for (let i = 0; i < int; i++) {
      result.push(Math.floor((Math.random() * int) + 1));
    }
    return result;
  }

  sort(a) {
    const list = new LinkedList;
    const stack = new Stack;
    let start = 0;
    let end = a.length - 1;

    list.create(a);
    stack.push([start, end]);

    while (stack.head) {
      const data = stack.pop();
      start = data[0];
      end = data[1];

      if (end - 1 === start) {
        list.sortTwoNodes(start, end);
        continue;
      } else if (end - 2 === start) {
        list.sortThreeNodes(start, end);
        continue;
      }

      const median = Math.floor(((end - start) + 1) / 2);
      const pivot = list.medianOfThree(start, median + start, end);

      if (pivot === 100) {
        break;
      }

      if (pivot - 1 > start) {
        stack.push([start, pivot - 1]);
      }

      if (pivot + 1 < end) {
        stack.push([pivot + 1, end]);
      }
    }

    const result = list.listToArray();
    return result;
  }

  test(input) {
    const l = input.length;
    for (let i = 1; i < l; i++) {
      if (input[i - 1] > input[i]) return false;
    }
    return true;
  }
}

function testQuickSort() {
  const quickSort = new QuickSort;
  for (let i = 0; i < 100; i++) {
    const input = quickSort.createInput();
    const sorted = quickSort.sort(input);
    const result = quickSort.test(sorted);
    if (result === false) return false;
  }
  return true;
}

console.log("Tests pass: " + testQuickSort());

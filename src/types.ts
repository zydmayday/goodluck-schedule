import * as R from "ramda";

export interface User {
  firstName: string;
  lastName: string;
}

/**
 * canvas的固有属性
 */
export interface CanvasMetaData {
  width: number;
  height: number;
}

/**
 * 二叉树的固有属性
 */
export interface TreeMetaData {
  /**
   * 节点之间的宽度
   */
  w: number;
  /**
   * 节点之间的高度
   */
  h: number;
  /**
   * 节点的半径
   */
  r: number;
  wMax: number;
  wMin: number;
  hMax: number;
  hMin: number;
}

/**
 * 一般用于用户传入的json数据
 */
export class TreeData {
  val!: number;
  left?: TreeData;
  right?: TreeData;
  _size!: number;

  constructor(
    val: number,
    left: TreeData | undefined = undefined,
    right: TreeData | undefined = undefined
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
    this._size = 1;
  }

  private _insert(node: TreeData | undefined | null, val: number) {
    if (!node) {
      return new TreeData(val, undefined, undefined);
    }
    if (val <= node.val) {
      node.left = this._insert(node.left, val);
    } else {
      node.right = this._insert(node.right, val);
    }
    return node;
  }

  private _isLeaf(): boolean {
    return this.left == undefined && this.right == undefined;
  }

  private _maxDepth(node: TreeData | undefined): number {
    if (!node) {
      return 0;
    }
    if (node._isLeaf()) {
      return 1;
    }
    return (
      Math.max(this._maxDepth(node?.left), this._maxDepth(node?.right)) + 1
    );
  }

  private _minValue(node: TreeData): number {
    if (!node.left) {
      return node.val;
    }
    return this._minValue(node.left);
  }

  private _maxValue(node: TreeData): number {
    if (!node.right) {
      return node.val;
    }
    return this._maxValue(node.right);
  }

  private _sum(node: TreeData): number {
    if (node._isLeaf()) {
      return node.val;
    }
    let sum = node.val;
    sum += node.left ? this._sum(node.left) : 0;
    sum += node.right ? this._sum(node.right) : 0;
    return sum;
  }

  private _printPaths(node: TreeData | undefined): number[][] {
    if (!node) {
      return [];
    }
    if (node._isLeaf()) {
      return [[node.val]];
    }
    const leftPaths = this._printPaths(node.left);
    const rightPaths = this._printPaths(node.right);
    const paths = [];
    for (const path of R.concat(leftPaths, rightPaths)) {
      paths.push(R.prepend(node.val, path));
    }
    return paths;
  }

  private _mirror(node: TreeData): TreeData {
    if (node._isLeaf()) {
      return node;
    }
    const left = node.right ? node._mirror(node.right) : undefined;
    node.right = node.left ? node._mirror(node.left) : undefined;
    node.left = left;
    return node;
  }

  private _double(node: TreeData): TreeData {
    const copy = new TreeData(node.val);
    copy.left = node.left ? this._double(node.left) : undefined;
    node.left = copy;
    node.right = node.right ? this._double(node.right) : undefined;
    return node;
  }

  private _isBST(node: TreeData): boolean {
    if (node._isLeaf()) {
      return true;
    }
    if (node.left && node.val < node.left.maxValue()) {
      return false;
    }
    if (node.right && node.val >= node.right.minValue()) {
      return false;
    }
    return (
      (node.left ? node.left.isBST() : true) &&
      (node.right ? node.right.isBST() : true)
    );
  }

  insert(val: number) {
    this._size++;
    return this._insert(this, val);
  }

  size(): number {
    return this._size;
  }

  maxDepth(): number {
    return this._maxDepth(this);
  }

  minValue(): number {
    return this._minValue(this);
  }

  maxValue(): number {
    return this._maxValue(this);
  }

  hasPathSum(sum: number) {
    return this._sum(this) === sum;
  }

  printPaths() {
    return this._printPaths(this);
  }

  mirror() {
    return this._mirror(this);
  }

  doubleTree() {
    return this._double(this);
  }

  isBST(): boolean {
    return this._isBST(this);
  }
}

/**
 * canvas渲染二叉树时的数据结构
 */
export class CanvasTreeNode {
  val!: number;
  left?: CanvasTreeNode;
  right?: CanvasTreeNode;
  x = 0;
  y = 0;
  layer = 0; // root

  constructor(val = 0, left?: CanvasTreeNode, right?: CanvasTreeNode) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  static fromTreeData(
    treeData?: TreeData,
    parent?: CanvasTreeNode
  ): CanvasTreeNode | undefined {
    if (treeData) {
      const node = new CanvasTreeNode(treeData?.val);
      node.left = this.fromTreeData(treeData?.left, node);
      node.right = this.fromTreeData(treeData?.right, node);
      if (parent) {
        parent.layer = Math.max(parent.layer, node.layer + 1);
      }
      return node;
    }
  }

  draw(ctx: CanvasRenderingContext2D, r: number, parent?: CanvasTreeNode) {
    ctx.textAlign = "center";
    ctx.fillText(this.val + "", this.x, this.y);
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, 2 * Math.PI);
    ctx.stroke();
    if (parent) {
      this.drawLine(ctx, r, this.x, this.y, parent.x, parent.y);
    }
    this.left?.draw(ctx, r, this);
    this.right?.draw(ctx, r, this);
  }

  private drawLine(
    ctx: CanvasRenderingContext2D,
    r: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    ctx.beginPath();
    const deltaX = this.cosTheta(x1, y1, x2, y2);
    const deltaY = this.sinTheta(x1, y1, x2, y2);
    ctx.moveTo(x1 + r * deltaX, y1 - r * deltaY);
    ctx.lineTo(x2 - r * deltaX, y2 + r * deltaY);
    ctx.stroke();
  }

  private sinTheta(x1: number, y1: number, x2: number, y2: number) {
    return (y1 - y2) / Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  private cosTheta(x1: number, y1: number, x2: number, y2: number) {
    return (x2 - x1) / Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }
}

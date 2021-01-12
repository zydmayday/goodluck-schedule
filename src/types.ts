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

  private drawLine(ctx: CanvasRenderingContext2D, r: number, x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath();
    const deltaX = this.cosTheta(x1, y1, x2, y2);
    const deltaY = this.sinTheta(x1, y1, x2, y2);
    ctx.moveTo(x1 + r * deltaX, y1 - r * deltaY);
    ctx.lineTo(x2 - r * deltaX, y2 + r * deltaY);
    ctx.stroke()
  }

  private sinTheta(x1: number, y1: number, x2: number, y2: number) {
    return (y1 - y2) / Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }

  private cosTheta(x1: number, y1: number, x2: number, y2: number) {
    return (x2 - x1) / Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }
}

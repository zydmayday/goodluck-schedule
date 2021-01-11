export interface User {
  firstName: string;
  lastName: string;
}

export interface CanvasMetaData {
  width: number;
  height: number;
}

export interface TreeMetaData {
  w: number;
  h: number;
  r: number;
  wMax: number;
  wMin: number;
  hMax: number;
  hMin: number;
}

export class TreeData {
  val!: number;
  left?: TreeData;
  right?: TreeData;
}

export class TreeNode {
  val!: number;
  left?: TreeNode;
  right?: TreeNode;
  x = 0;
  y = 0;
  layer = 0; // root

  constructor(val: number, left?: TreeNode, right?: TreeNode) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  draw(ctx: CanvasRenderingContext2D, r: number, parent?: TreeNode) {
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

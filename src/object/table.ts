import { Container } from "./container";

interface TableOptions {
  width: number;
  height: number;
}

export class Table extends Container {
  constructor(public readonly options: TableOptions) {
    super();
  }

  render(context: CanvasRenderingContext2D): void {
    const { width, height } = this.options;

    this.prepareCanvas(context, () => {
      context.beginPath();
      context.rect(0, 0, width, height);
      context.stroke();
    });

    return super.render(context);
  }
}

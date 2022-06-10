import { GameObject } from "../lib/gameObject";

interface TextOptions {
  text: string;
  style: Partial<TextStyle>;
}

interface TextStyle {
  fill: string;
  align: CanvasTextAlign;
  verticalAlign: CanvasTextBaseline;
  font: {
    family: string;
    size: number;
    weight: string;
  };
}

export class Text extends GameObject {
  constructor(public readonly options: TextOptions) {
    super();
  }

  render(context: CanvasRenderingContext2D): void {
    return this.prepareCanvas(context, () => {
      const { style, text } = this.options;

      context.textAlign = style.align ?? "left";
      context.textBaseline = style.verticalAlign ?? "top";
      context.font = `${style.font?.weight ?? "normal"} ${style.font?.size}px ${
        style.font?.family
      }`;

      context.fillText(text, 0, 0);
    });
  }
}

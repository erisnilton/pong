import { Game } from "./game";
import { Vector } from "./vetor";

export abstract class GameObject {
  game?: Game;
  parent?: GameObject;

  pivot = new Vector(0, 0);
  position = new Vector(0, 0);
  angle = 0;

  abstract render(context: CanvasRenderingContext2D): void;

  setup() {}
  update(time: number) {}
  destroy() {}

  prepareCanvas(context: CanvasRenderingContext2D, fn: () => void) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.angle);
    context.translate(this.pivot.x, this.pivot.y);

    fn();

    context.restore();
  }
}

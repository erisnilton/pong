import { GameObject } from "../lib/gameObject";

export class Container extends GameObject {
  children: GameObject[] = [];

  add(object: GameObject) {
    object.game = this.game;
    object.parent = this;
    object.setup();
    this.children.push(object);
    return this;
  }

  remove(object: GameObject) {
    object.destroy();

    delete object.parent;
    delete object.game;

    const index = this.children.indexOf(object);

    if (index >= 0) {
      this.children.splice(index, 1);
    }

    return this;
  }

  render(context: CanvasRenderingContext2D): void {
    return this.prepareCanvas(context, () => {
      this.children.forEach((c) => c.render(context));
    });
  }

  update(time: number): void {
    this.children.forEach((child) => child.update(time));
  }

  setup(): void {
    this.children.forEach((s) => s.setup());
  }
}

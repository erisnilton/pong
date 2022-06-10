import { GameObject } from "../lib/gameObject";
import { Table } from "./table";

interface PlayerOptions {
  color?: string;
  keys: Record<string, "up" | "down">;
}

export class Player extends GameObject {
  readonly width = 16;
  readonly height = 64;

  declare parent: Table;

  score = 0;

  keys = { up: false, down: false };

  constructor(public readonly options: PlayerOptions) {
    super();
  }

  render(context: CanvasRenderingContext2D): void {
    return this.prepareCanvas(context, () => {
      context.fillStyle = this.options.color ?? "transparent";
      context.fillRect(0, 0, this.width, this.height);
    });
  }

  update(time: number): void {
    const speed = 10;
    const maxY = this.parent.options.height - this.height;

    // Navegação
    if (this.keys.up) {
      this.position.y -= time * speed;
    } else if (this.keys.down) {
      this.position.y += time * speed;
    }

    // Normalização da posiçãos
    if (this.position.y < 0) {
      this.position.y = 0;
    } else if (this.position.y > maxY) {
      this.position.y = maxY;
    }
  }

  onKeyUp = (e: KeyboardEvent) => {
    const key = this.options.keys[e.key];

    if (key && this.keys[key]) {
      this.keys[key] = false;
    }
  };

  onKeyDown = (e: KeyboardEvent) => {
    const key = this.options.keys[e.key];

    if (key && !this.keys[key]) {
      this.keys[key] = true;
    }
  };

  setup(): void {
    if (!(this.parent instanceof Table)) {
      throw new TypeError(
        `Um jogador deve ser adicionado somente em uma instancia de Table.`
      );
    }

    window.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("keydown", this.onKeyDown);
  }

  destroy(): void {
    window.removeEventListener("keyup", this.onKeyUp);
    window.removeEventListener("keydown", this.onKeyDown);
  }
}

import { GameObject } from "../lib/gameObject";
import { Vector } from "../lib/vetor";
import { Player } from "./player";
import { Table } from "./table";

interface BallOptions {
  players: Player[];
}

export class Ball extends GameObject {
  public radius = 8;
  public velocity = new Vector(
    3
    // (Math.random() - 0.5) * 10,
    // (Math.random() - 0.5) * 10
  );
  declare parent: Table;

  constructor(public readonly options: BallOptions) {
    super();
  }

  collidesPoint(point: Vector) {
    const dx = this.position.x - point.x;
    const dy = this.position.y - point.y;

    return dx ** 2 + dy ** 2 < this.radius ** 2;
  }

  collidesPlayer(player: Player) {
    const nx = Math.max(
      player.position.x,
      Math.min(this.position.x, player.position.x + player.width)
    );
    const ny = Math.max(
      player.position.y,
      Math.min(this.position.y, player.position.y + player.height)
    );

    return this.collidesPoint(new Vector(nx, ny));
  }

  render(context: CanvasRenderingContext2D): void {
    this.prepareCanvas(context, () => {
      context.beginPath();
      context.arc(0, 0, this.radius, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    });
  }

  update(time: number): void {
    this.position.add(this.velocity.copy().scale(new Vector(time)));

    if (this.position.y - this.radius < 0) {
      this.position.y = this.radius;
      this.velocity.scale(new Vector(1, -1));
    } else if (this.position.y + this.radius > this.parent.options.height) {
      this.position.y = this.parent.options.height - this.radius;
      this.velocity.scale(new Vector(1, -1));
    }

    const collidedPlayer = this.options.players.find((p) =>
      this.collidesPlayer(p)
    );

    // Player 1 ganhou
    if (this.position.x >= this.parent.options.width) {
      this.options.players[0].score++;
      this.reset();
    }

    // Player 2 ganhou
    else if (this.position.x <= 0) {
      this.options.players[1].score++;
      this.reset();
    }

    // Alguém pegou a bola
    else if (collidedPlayer) {
      this.velocity.scale(new Vector(-1, -1));
      const direction = Math.sign(this.velocity.x);

      if (direction === 1) {
        this.position.x =
          collidedPlayer.position.x + collidedPlayer.width + this.radius;
      } else if (direction === -1) {
        this.position.x = collidedPlayer.position.x - this.radius;
      }
    }
  }

  reset() {
    this.position.set(
      this.parent.options.width / 2,
      this.parent.options.height / 2
    );
    this.velocity.set(0, 0);
  }

  start() {
    if (this.velocity.magnitude === 0) {
      const random = <T>(...items: T[]): T =>
        items[Math.floor(Math.random() * items.length)];
      this.velocity.set(random(-4, 4), random(-4, 4));
    }
  }

  onKeydown = (e: KeyboardEvent) => {
    if (e.key === " ") {
      this.start();
    }
  };

  setup(): void {
    if (!(this.parent instanceof Table)) {
      throw new TypeError(
        `Um jogador deve ser adicionado somente em uma instancia de Table.`
      );
    }

    this.reset();

    window.addEventListener("keydown", this.onKeydown);
  }

  destroy(): void {
    window.removeEventListener("keydown", this.onKeydown);
  }
}

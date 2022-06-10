import { Player } from "./player";
import { Table } from "./table";
import { Text } from "./text";

export class Scoreboard extends Text {
  constructor(public readonly players: Player[]) {
    super({
      style: {
        fill: "red",
        align: "center",
        font: {
          size: 32,
          family: "Arial",
          weight: "bolder",
        },
      },
      text: "",
    });
  }

  setup(): void {
    const {
      options: { width },
    } = this.parent as Table;
    this.position.set(width / 2, -50);
  }

  update(): void {
    this.options.text = this.players.map((p) => p.score).join(" | ");
  }
}

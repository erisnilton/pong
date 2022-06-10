import { Game } from "./lib/game";
import { Ball } from "./object/ball";
import { Player } from "./object/player";
import { Scoreboard } from "./object/scoreboard";
import { Table } from "./object/table";
import "./style.css";

const canvas = document.getElementById("app") as HTMLCanvasElement;
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const game = new Game(canvas);
const table = new Table({
  width: 800,
  get height() {
    return this.width / 2;
  },
});

game.stage.add(table);

table.pivot.set(table.options.width / -2, table.options.height / -2);

table.position.set(game.view.width / 2, game.view.height / 2);

const p1 = new Player({ color: "green", keys: { a: "up", d: "down" } });
const p2 = new Player({
  color: "yellow",
  keys: { ArrowLeft: "up", ArrowRight: "down" },
});

// p1.pivot.set(4, 32);
p1.position.set(32, 0);
p2.position.set(table.options.width - p2.width - 32, 0);

const scoreBoard = new Scoreboard([p1, p2]);

const ball = new Ball({ players: [p1, p2] });

table.add(p1).add(p2).add(ball).add(scoreBoard);

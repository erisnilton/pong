import { Container } from "../object/container";
import { Ticker } from "./ticker";

export class Game {
  public readonly context: CanvasRenderingContext2D;

  public readonly stage = new Container();
  public readonly ticker = new Ticker();

  constructor(public readonly view: HTMLCanvasElement) {
    this.context = view.getContext("2d")!;
    this.ticker.add((time: number) => this.update(time));
    this.stage.game = this;
    this.stage.setup();
    this.ticker.start();
  }

  render() {
    this.context.resetTransform();
    this.context.clearRect(0, 0, this.view.width, this.view.height);
    return this.stage.render(this.context);
  }

  update(time: number) {
    // console.log("time", time);
    // console.log(time);
    this.stage.update(time);
    this.render();
  }
}

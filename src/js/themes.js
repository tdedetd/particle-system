import { Theme } from "./helpers/theme";

export class Themes {
  constructor() {

    /** @type {Theme[]} */
    this._themes = [
      {
        foreColor: { r: 255, g: 255, b: 255 },
        backColor: { r: 84, g: 169, b: 210 }
      },
      {
        foreColor: { r: 255, g: 0, b: 0 },
        backColor: { r: 0, g: 0, b: 0 }
      },
      {
        foreColor: { r: 0, g: 0, b: 255 },
        backColor: { r: 255, g: 255, b: 255 }
      }
    ]
    this._index = 0;

    this._updateSelected();
  }

  next() {
    this._index = (this._index + 1) % this._themes.length;
    this._updateSelected();
  }

  prev() {
    this._index = (this._themes.length + this._index - 1) % this._themes.length;
    this._updateSelected();
  }

  _updateSelected() {
    /** @type {Theme} */
    this.selected = this._themes[this._index];
  }
}

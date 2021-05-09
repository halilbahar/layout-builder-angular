import { fabric } from 'fabric';

export class Rectangle {
  name: string;
  zIndex: number;
  duration: number;
  rect: fabric.Rect;

  constructor(name: string, zIndex: number, duration: number, rect: fabric.Rect) {
    this.name = name;
    this.zIndex = zIndex;
    this.duration = duration;
    this.rect = rect;
  }
}

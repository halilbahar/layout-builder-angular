import { Injectable } from '@angular/core';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  canvas: fabric.Canvas;

  constructor() { }

  init(element: HTMLCanvasElement): void {
    this.canvas = new fabric.Canvas(element);
    this.canvas.setWidth(1920);
    this.canvas.setHeight(1080);
  }

  createRegion(): void {
    this.canvas.add(new fabric.Rect({
      width: 50,
      height: 50,
      top: 50,
      left: 50
    }));
  }
}

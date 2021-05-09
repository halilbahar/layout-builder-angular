import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { Rectangle } from '../models/rectangle';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  canvas: fabric.Canvas;
  objects: BehaviorSubject<Rectangle[]> = new BehaviorSubject<Rectangle[]>([]);
  private indexCounter = 1;

  constructor() { }

  init(element: HTMLCanvasElement): void {
    this.canvas = new fabric.Canvas(element);
    this.canvas.setWidth(1920);
    this.canvas.setHeight(1080);
  }

  createRegion(): void {
    const rect = new fabric.Rect({
      width: 50,
      height: 50,
      top: 50,
      left: 50
    });
    this.canvas.add(rect);
    this.objects.next([...this.objects.getValue(), new Rectangle('Region-' + this.indexCounter++, 0, 10, rect)]);
  }
}

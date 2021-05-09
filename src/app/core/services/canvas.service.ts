import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { Rectangle } from '../models/rectangle';
import { BehaviorSubject } from 'rxjs';
import { IEvent } from 'fabric/fabric-impl';

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

    const edgeDetection = 10;
    this.canvas.on('object:moving', (event: IEvent) => {
      const movingObject = event.target;
      movingObject.setCoords(); // TODO: remove?
      this.clearLines();

      this.canvas.forEachObject(aObject => {
        if (aObject === movingObject) { return; }

        // Snap top side of the moving object
        // Top side
        if (Math.abs(movingObject.oCoords.tl.y - aObject.oCoords.tl.y) < edgeDetection) {
          movingObject.top = aObject.top;
          this.drawLine({ y: movingObject.top });
        }
        // Bottom side
        if (Math.abs(movingObject.oCoords.tl.y - aObject.oCoords.bl.y) < edgeDetection) {
          movingObject.top = aObject.top + aObject.getScaledHeight();
          this.drawLine({ y: movingObject.top });
        }
        // Snap bottom side of the moving object
        // Top side
        if (Math.abs(movingObject.oCoords.bl.y - aObject.oCoords.tl.y) < edgeDetection) {
          movingObject.top = aObject.top - movingObject.getScaledWidth();
          this.drawLine({ y: aObject.top });
        }
        // Bottom side
        if (Math.abs(movingObject.oCoords.bl.y - aObject.oCoords.bl.y) < edgeDetection) {
          movingObject.top = aObject.top + aObject.getScaledHeight() - movingObject.getScaledHeight();
          this.drawLine({ y: aObject.top + aObject.getScaledWidth() });
        }
        // Snap right side of the moving object
        // Right side
        if (Math.abs(movingObject.oCoords.tr.x - aObject.oCoords.tr.x) < edgeDetection) {
          movingObject.left = aObject.left + aObject.getScaledWidth() - movingObject.getScaledWidth();
          this.drawLine({ x: aObject.left + aObject.getScaledWidth() });
        }
        // Left side
        if (Math.abs(movingObject.oCoords.tr.x - aObject.oCoords.tl.x) < edgeDetection) {
          movingObject.left = aObject.left - movingObject.getScaledWidth();
          this.drawLine({ x: aObject.left });
        }
        // Snap left side of the moving object
        // Right side
        if (Math.abs(movingObject.oCoords.tl.x - aObject.oCoords.tr.x) < edgeDetection) {
          movingObject.left = aObject.left + aObject.getScaledWidth();
          this.drawLine({ x: movingObject.left });
        }
        // Left side
        if (Math.abs(movingObject.oCoords.tl.x - aObject.oCoords.tl.x) < edgeDetection) {
          movingObject.left = aObject.left;
          this.drawLine({ x: movingObject.left });
        }
      });
    });

    this.canvas.on('mouse:up', () => this.clearLines());
  }

  createRegion(): void {
    const rect = new fabric.Rect({
      width: 50,
      height: 50,
      top: 50,
      left: 50,
      strokeWidth: 0
    });
    this.canvas.add(rect);
    this.objects.next([...this.objects.getValue(), new Rectangle('Region-' + this.indexCounter++, 0, 10, rect)]);
  }

  get width(): number {
    return this.canvas.getWidth();
  }

  get height(): number {
    return this.canvas.getHeight();
  }

  private drawLine({ x, y }: { x?: number, y: number } | { x: number, y?: number }): void {
    const points = y ? [0, y, this.width, y] : [x, 0, x, this.height];

    this.canvas.add(new fabric.Line(points, {
      stroke: '#000',
      strokeDashArray: [8]
    }));
  }

  private clearLines(): void {
    const lines = this.canvas.getObjects('line');
    this.canvas.remove(...lines);
  }
}

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

      this.canvas.forEachObject(aObject => {
        if (aObject === movingObject) { return; }

        // Snap top side of the moving object
        // Top side
        if (Math.abs(movingObject.oCoords.tl.y - aObject.oCoords.tl.y) < edgeDetection) {
          movingObject.top = aObject.top;
        }
        // Bottom side
        if (Math.abs(movingObject.oCoords.tl.y - aObject.oCoords.bl.y) < edgeDetection) {
          movingObject.top = aObject.top + aObject.getScaledHeight();
        }
        // Snap bottom side of the moving object
        // Top side
        if (Math.abs(movingObject.oCoords.bl.y - aObject.oCoords.tl.y) < edgeDetection) {
          movingObject.top = aObject.top - movingObject.getScaledWidth();
        }
        // Left side
        if (Math.abs(movingObject.oCoords.bl.y - aObject.oCoords.bl.y) < edgeDetection) {
          movingObject.top = aObject.top + aObject.getScaledHeight() - movingObject.getScaledHeight();
        }
        // Snap right side of the moving object
        // Right side
        if (Math.abs(movingObject.oCoords.tr.x - aObject.oCoords.tr.x) < edgeDetection) {
          movingObject.left = aObject.left + aObject.getScaledWidth() - movingObject.getScaledWidth();
        }
        // Left side
        if (Math.abs(movingObject.oCoords.tr.x - aObject.oCoords.tl.x) < edgeDetection) {
          movingObject.left = aObject.left - movingObject.getScaledWidth();
        }
        // Snap left side of the moving object
        // Right side
        if (Math.abs(movingObject.oCoords.tl.x - aObject.oCoords.tr.x) < edgeDetection) {
          movingObject.left = aObject.left + aObject.getScaledWidth();
        }
        // Left side
        if (Math.abs(movingObject.oCoords.tl.x - aObject.oCoords.tl.x) < edgeDetection) {
          movingObject.left = aObject.left;
        }
      });
    });
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
}

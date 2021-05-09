import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  @ViewChild('screenWrapper', { static: true }) screenWrapper: ElementRef;
  @ViewChild('screen', { static: true }) screen: ElementRef;
  canvas: fabric.Canvas;

  constructor() { }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas(this.screen.nativeElement);
    this.canvas.setWidth(1920);
    this.canvas.setHeight(1080);
    this.resize();
  }

  @HostListener('window:resize') onResize(): void {
    this.resize();
  }

  private resize(): void {
    const element = this.screenWrapper.nativeElement as HTMLElement;
    const parent = element.parentElement;

    const scale = Math.min(
      (parent.clientWidth * 0.85) / element.clientWidth,
      (parent.clientHeight * 0.85) / element.clientHeight
    );

    element.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }
}

import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { CanvasService } from '../core/services/canvas.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  @ViewChild('screenWrapper', { static: true }) screenWrapper: ElementRef;
  @ViewChild('screen', { static: true }) screen: ElementRef;
  canvas: fabric.Canvas;

  constructor(private canvasService: CanvasService) { }

  ngOnInit(): void {
    this.canvasService.init(this.screen.nativeElement);
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

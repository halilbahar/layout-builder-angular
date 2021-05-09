import { Component, OnInit } from '@angular/core';
import { CanvasService } from '../core/services/canvas.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public canvasService: CanvasService) { }

  ngOnInit(): void {
  }

  createRegion(): void {
    this.canvasService.createRegion();
  }
}

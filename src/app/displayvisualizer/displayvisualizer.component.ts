import { Component, OnInit } from '@angular/core';
import { Node } from '../model/Node';
import { DisplayVisualizerService } from './display-visualizer.service';

@Component({
  selector: 'app-displayvisualizer',
  templateUrl: './displayvisualizer.component.html',
  styleUrls: ['./displayvisualizer.component.css']
})
export class DisplayvisualizerComponent implements OnInit {

  items: Node[] = [new Node("White", 0, null, -1, -1, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, "", "")];


  constructor(private displayVisService: DisplayVisualizerService) {
  }

  ngOnInit(): void {
    this.items = this.displayVisService.createArray();
  }

  ngOnDestroy() {
    this.displayVisService.arrChanged.unsubscribe();
  }
}

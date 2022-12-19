import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlgoMenuService } from '../algorithms/algomenu.service';
import { AstarSearchService } from '../algorithms/astarsearch.service';
import { BreadthFirstSearchService } from '../algorithms/breadthfirstsearch.service';
import { DisplayVisualizerService } from '../displayvisualizer/display-visualizer.service';
import { HeaderService } from './header.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  algorithmSelected: string = "Select Algo";
  @ViewChild('algo') algoRef: ElementRef;
  @ViewChild('check') checkBox: ElementRef;
  algoVisible: boolean = false;
  constructor(private algoMenuService: AlgoMenuService,
    private headerService: HeaderService,
    private dsVisService: DisplayVisualizerService,
    private bfs: BreadthFirstSearchService,
    private astar: AstarSearchService) { }

  ngOnInit(): void {
  }

  onClickDropBox() {
    if (!this.algoVisible) {
      this.algoRef.nativeElement.style.visibility = "visible";
      this.algoVisible = true;
    }
    else {
      this.algoRef.nativeElement.style.visibility = "hidden";
      this.algoVisible = false;
    }

    if (!this.checkBox.nativeElement.checked) {
      this.checkBox.nativeElement.checked = true;
    }
    else {
      this.checkBox.nativeElement.checked = false;
    }
  }

  optionSelected(algoUsed: string) {
    this.onClickDropBox();
    this.algorithmSelected = algoUsed;
    this.headerService.algoSelected = algoUsed;
  }

  runAlgo() {
    this.dsVisService.resetGridWithoutWalls();
    this.algoMenuService.runAlgo(this.algorithmSelected);
  }

  onClickClearGrid() {
    this.astar.runCountResetSub.next(0);
    this.bfs.runCountresetSub.next(0);
    this.dsVisService.resetWholeGrid();
  }
}

import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { AlgoMenuService } from "../algorithms/algomenu.service";
import { AstarSearchService } from "../algorithms/astarsearch.service";
import { BreadthFirstSearchService } from "../algorithms/breadthfirstsearch.service";
import { DisplayVisualizerService } from "../displayvisualizer/display-visualizer.service";
import { HeaderService } from "../header/header.service";
import { Node } from "../model/Node";
import { HighlightService } from "./highlightservice";

@Directive({
    selector: '[highlight]'
})
export class DisplayHighlightDirective implements OnInit, OnDestroy {

    @Input() index: number;
    @Input() cell: Node;
    isTerminalNodes: boolean = false;
    terminalNode: Node;
    terminalNodeIndex: number;

    constructor(private hgService: HighlightService,
        private dsVisService: DisplayVisualizerService,
        private headerService: HeaderService,
        private algoMenu: AlgoMenuService,
        private bfs: BreadthFirstSearchService,
        private astar: AstarSearchService) { }

    isMouseDown: boolean;

    ngOnInit() {
        this.hgService.sub.subscribe(res => {
            this.isMouseDown = res;
        });
        this.hgService.terminalNodePressedSub.subscribe((flag) => {
            this.isTerminalNodes = flag;
        });
        this.hgService.terminalNodeChangedSub.subscribe((node) => {
            this.terminalNode = node;
        });
        this.hgService.terminalNodeChangedIndexSub.subscribe((index) => {
            this.terminalNodeIndex = index;
        });
        this.hgService.setEndNodeSub.subscribe((node) => {
            this.hgService.startEnd[1] = node;
        });
        this.hgService.setStartNodeSub.subscribe((node) => {
            this.hgService.startEnd[0] = node;
        });
    }

    ngOnDestroy() {
        this.hgService.sub.unsubscribe();
        this.hgService.terminalNodeChangedSub.unsubscribe();
        this.hgService.terminalNodePressedSub.unsubscribe();
        this.hgService.setEndNodeSub.unsubscribe();
        this.hgService.setStartNodeSub.unsubscribe();
        this.hgService.terminalNodeChangedIndexSub.unsubscribe();
        this.hgService.terminalNodeChangedSub.unsubscribe();
        this.hgService.terminalNodePressedSub.unsubscribe();
    }

    @HostListener('mousedown') onMouseEnter(event: Event) {
        if (this.cell["color"] != "rgba(0,255,0,0.2)" && this.cell["color"] != "rgba(255,0,0,0.2)") {
            this.hgService.setMouse(true);
        }
        else {
            this.hgService.setMouse(false);
            if (this.cell["color"] == "rgba(0,255,0,0.2)" || this.cell["color"] == "rgba(255,0,0,0.2)")
                this.hgService.setTerminalNodeFlag(true);
            this.hgService.setStartEndCell(this.cell);
            this.hgService.setStartEndCellIndex(this.index);
        }
    }

    @HostListener('mouseenter') onMouseDown(event: Event) {
        if (this.isTerminalNodes) {
            if (this.cell["color"] != "black" && this.cell != this.hgService.startEnd[0] && this.cell != this.hgService.startEnd[1]) {
                const adjacentCellColor: string = this.cell["color"];
                const prevGraphNode: Node = this.terminalNode;
                this.dsVisService.setBackgroundImage(this.index, this.terminalNode["img"]);
                this.dsVisService.setBackgroundImage(this.terminalNodeIndex, "");
                this.dsVisService.setColor(this.index, this.terminalNode["color"]);
                this.dsVisService.setColor(this.terminalNodeIndex, adjacentCellColor);
                this.hgService.setStartEndCell(this.cell);
                this.hgService.setStartEndCellIndex(this.index);
                if (prevGraphNode == this.hgService.startEnd[0]) {
                    this.hgService.setGraphStartNode(this.terminalNode);
                }
                else {
                    this.hgService.setGraphEndNode(this.terminalNode);
                }
                this.dsVisService.resetGridWithoutWalls();
                if (this.bfs.runCount > 0 || this.astar.runCount > 0) {
                    this.algoMenu.runAlgo(this.headerService.algoSelected);
                }
            }
        }
        if (!this.isMouseDown) {
            return
        }
        if (this.dsVisService.items[this.index] != this.hgService.startEnd[0] && this.dsVisService.items[this.index] != this.hgService.startEnd[1]) {
            if (this.dsVisService.items[this.index]["color"] == "black") {
                this.dsVisService.setColor(this.index, "#fff");
                this.dsVisService.setBorderColor(this.index, "#fff");
            }
            else {
                this.dsVisService.setColor(this.index, "black");
                this.dsVisService.setBorderColor(this.index, "black");
            }
        }
    }

    @HostListener('mouseup') onMouseUp(event: Event) {
        this.hgService.setTerminalNodeFlag(false);
        this.hgService.setMouse(false);
    }
}
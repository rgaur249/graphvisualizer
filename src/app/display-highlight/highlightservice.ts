import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Node } from "../model/Node";

@Injectable({
    providedIn: "root"
})
export class HighlightService {
    sub = new Subject<boolean>();
    terminalNodePressedSub = new Subject<boolean>();
    setStartNodeSub = new Subject<Node>();
    setEndNodeSub = new Subject<Node>();
    terminalNodeChangedSub = new Subject<Node>();
    terminalNodeChangedIndexSub = new Subject<number>();
    startEnd: Node[] = [];

    setMouse(flag: boolean) {
        this.sub.next(flag);
    }

    setStartEndCell(startEndCell: Node) {
        this.terminalNodeChangedSub.next(startEndCell);
    }
    setStartEndCellIndex(index: number) {
        this.terminalNodeChangedIndexSub.next(index);
    }
    setTerminalNodeFlag(flag: boolean) {
        this.terminalNodePressedSub.next(flag);
    }
    setGraphStartNode(start: Node) {
        this.setStartNodeSub.next(start);
    }
    setGraphEndNode(end: Node) {
        this.setEndNodeSub.next(end);
    }
}

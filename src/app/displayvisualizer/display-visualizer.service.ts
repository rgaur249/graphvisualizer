import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { AstarSearchService } from "../algorithms/astarsearch.service";
import { BreadthFirstSearchService } from "../algorithms/breadthfirstsearch.service";
import { HighlightService } from "../display-highlight/highlightservice";
import { Node } from "../model/Node";

@Injectable({
    providedIn: "root"
})
export class DisplayVisualizerService implements OnInit {

    arrChanged = new Subject<Node[]>();
    array2D: Node[][] = [];

    items: Node[] = [new Node("white", 0, null, -1, -1, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, "", "")];
    constructor(private highlightService: HighlightService) { }

    ngOnInit(): void {
    }

    setColor(index: number, color: string) {
        this.items[index]["color"] = color;
    }
    setBorderColor(index: number, color: string) {
        this.items[index]["border"] = color;
    }
    setBackgroundImage(index: number, imgUrl: string) {
        this.items[index]["img"] = imgUrl;
    }

    createArray() {
        this.items.pop();
        for (let i = 0; i < 26; i++) {
            const arr = [];
            for (let j = 0; j < 60; j++) {
                if (i == 15 && j == 10) {
                    const node = new Node("rgba(0,255,0,0.2)", 0, null, i, j, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, "url(\"assets/startnode2.jpg\")", "");
                    arr.push(node);
                    this.items.push(node);
                    this.highlightService.startEnd.push(node);
                }
                else if (i == 15 && j == 45) {
                    const node = new Node("rgba(255,0,0,0.2)", 0, null, i, j, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, "url(\"assets/endnode2.jpg\")", "");
                    arr.push(node);
                    this.items.push(node);
                    this.highlightService.startEnd.push(node);
                }
                else {
                    const node = new Node("#fff", 0, null, i, j, Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, "", "");
                    arr.push(node);
                    this.items.push(node);
                }
            }
            this.array2D.push(arr);
        }
        return this.items.slice();
    }


    resetGridWithoutWalls() {
        for (let node of this.items) {
            if (node["color"] != 'black' && node["color"] != this.highlightService.startEnd[0]["color"] && node["color"] != this.highlightService.startEnd[1]["color"]) {
                node["color"] = "white";
                node["border"] = "";
            }
        }
    }

    resetWholeGrid() {
        for (let i = 0; i < 26; i++) {
            for (let j = 0; j < 60; j++) {
                if (i == 15 && j == 10) {
                    this.array2D[i][j]["img"] = "url(\"assets/startnode2.jpg\")";
                    this.array2D[i][j]["color"] = "rgba(0,255,0,0.2)";
                    this.array2D[i][j]["border"] = "";
                    this.highlightService.startEnd[0] = this.array2D[i][j];
                }
                else if (i == 15 && j == 45) {
                    this.array2D[i][j]["img"] = 'url("assets/endnode2.jpg")';
                    this.array2D[i][j]["color"] = "rgba(255,0,0,0.2)";
                    this.array2D[i][j]["border"] = "";
                    this.highlightService.startEnd[1] = this.array2D[i][j];
                }
                else {
                    this.array2D[i][j]["color"] = "#fff";
                    this.array2D[i][j]["border"] = "";
                    this.array2D[i][j]["img"] = '';
                }
            }
        }
    }
}
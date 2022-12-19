import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { HighlightService } from "../display-highlight/highlightservice";
import { DisplayVisualizerService } from "../displayvisualizer/display-visualizer.service";
import { Node } from "../model/Node";
import { BuildGraphService } from "./graphbuild.service";

@Injectable({
    providedIn: 'root'
})
export class AstarSearchService {
    runCountResetSub = new Subject<number>();
    runCount: number = 0;

    constructor(private highlightService: HighlightService,
        private graphBuildService: BuildGraphService,
        private displayVisService: DisplayVisualizerService) {
        this.runCountResetSub.subscribe(value => {
            this.runCount = value;
        });
    }

    async asStarSearch() {
        const graph = this.graphBuildService.buildGraph(this.displayVisService.array2D);
        const startNode: Node = this.highlightService.startEnd[0];
        startNode["f"] = 0.0;
        startNode["g"] = 0.0;
        startNode["h"] = 0.0;

        let arr: Node[] = [];
        arr.push(startNode);

        main_loop: while (arr.length > 0) {
            let smallest = this.getSmallestIndex(arr);
            console.log(smallest);
            let node = arr[smallest];
            arr = this.removeNodeAtIndex(smallest, arr);
            if (node != this.highlightService.startEnd[0] && node != this.highlightService.startEnd[1]) {
                node["color"] = "gray";
                node["border"] = "1px solid gray";
            }


            for (let v of graph.get(node)) {

                if (v["color"] === "white") {
                    let gNew;
                    gNew = node["g"] + 1.0;
                    if (arr.includes(v)) {
                        if (v["g"] > gNew) {
                            v["g"] = gNew;
                        }
                    }
                    else {
                        v["g"] = gNew;
                        arr.push(v);
                    }
                    const hNew = this.calcHeuristic(v["row"], v["col"], this.highlightService.startEnd[1]);
                    const fNew = gNew + hNew;
                    v["h"] = hNew;
                    v["f"] = fNew;
                    v["parent"] = node;
                }

                if (v == this.highlightService.startEnd[1]) {
                    v["parent"] = node;
                    break main_loop;
                }
            }
            if (this.runCount <= 0) {
                await this.delay(0.002);
            }
            if (node != this.highlightService.startEnd[0]) {
                node["color"] = "blue";
                node["border"] = "1px solid skyblue";
            }
        }
        if (this.highlightService.startEnd[1]["parent"] != null) {
            let node: Node = this.highlightService.startEnd[1]["parent"];
            while (node != null && node != this.highlightService.startEnd[0]) {
                node.color = "yellow";
                node["border"] = "1px solid yellow";
                node = node["parent"];
                if (this.runCount <= 0) {
                    await this.delay(0.2);
                }
            }
        }
        this.runCount++;
    }

    private calcHeuristic(i: number, j: number, dest: Node) {
        return Math.abs(i - dest["row"]) + Math.abs(j - dest["col"]);
    }

    private delay(delay: number) {
        return new Promise(resolve => {
            setTimeout(() => resolve(1), delay)
        });
    }

    getSmallestIndex(arr: Node[]) {
        let small = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]["f"] < arr[small]["f"]) {
                small = i;
            }
        }
        return small;
    }

    removeNodeAtIndex(smallest: number, arr: Node[]) {
        const newArr: Node[] = [];
        for (let i = 0; i < arr.length; i++) {
            if (i != smallest) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }
}
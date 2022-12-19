import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { HighlightService } from "../display-highlight/highlightservice";
import { DisplayVisualizerService } from "../displayvisualizer/display-visualizer.service";
import { Node } from "../model/Node";
import { BuildGraphService } from "./graphbuild.service";

@Injectable({
    providedIn: 'root'
})
export class DijkstrasService {
    runCountResetSub = new Subject<number>();
    runCount: number = 0;

    constructor(private highlightService: HighlightService,
        private graphBuildService: BuildGraphService,
        private displayVisService: DisplayVisualizerService) {
        this.runCountResetSub.subscribe(value => {
            this.runCount = value;
        });
    }

    async dijkstrasSearch() {
        const graph = this.graphBuildService.buildGraph(this.displayVisService.array2D);
        const startNode: Node = this.highlightService.startEnd[0];
        
        let arr: Node[] = [];
        for(let [key,value] of graph) {
            key.parent = null;
            key.g=Number.MAX_VALUE;
            arr.push(key);
        }
        startNode["g"] = 0.0;
        console.log(arr.length)
        main_loop: while (arr.length > 0) {
            console.log("hello");
            console.log(arr.length)
            let smallest = this.getSmallestIndex(arr);
            let node = arr[smallest];
            arr = this.removeNodeAtIndex(smallest, arr);
            if (node != this.highlightService.startEnd[0] && node != this.highlightService.startEnd[1]) {
                node["color"] = "gray";
                node["border"] = "1px solid gray";
            }


            for (let v of graph.get(node)) {
                if (v.color == "red" || v == this.highlightService.startEnd[1]) {
                    console.log("khatm")
                    v.parent = node;
                    break main_loop;
                }
                if(v.g > node.g+1) {
                    v.g = node.g+1;
                    v.parent=node;
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
        console.log("wor")
        console.log(arr.length)
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

    private delay(delay: number) {
        return new Promise(resolve => {
            setTimeout(() => resolve(1), delay)
        });
    }

    getSmallestIndex(arr: Node[]) {
        let small = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]["g"] < arr[small]["g"]) {
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
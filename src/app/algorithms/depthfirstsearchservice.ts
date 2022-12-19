import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HighlightService } from "../display-highlight/highlightservice";
import { DisplayVisualizerService } from "../displayvisualizer/display-visualizer.service";
import { Node } from "../model/Node";
import { BuildGraphService } from "./graphbuild.service";
@Injectable({
    providedIn: 'root'
})
export class DepthFirstSearchService {
    runCountresetSub = new Subject<number>();
    runCount: number = 0;

    constructor(private dispayVisService: DisplayVisualizerService,
        private highlightService: HighlightService,
        private buildGraphService: BuildGraphService) {
        this.runCountresetSub.subscribe(value => {
            this.runCount = value;
        });
    }

    async depthFirstSearch() {
        const graph = this.buildGraphService.buildGraph(this.dispayVisService.array2D);

        for (let [key, value] of graph) {
            key.d = 0;
            key.parent = null;
        }
        this.highlightService.startEnd[0]["d"] = 0;
        this.highlightService.startEnd[0]["parent"] = null;
        
       await this.dfsVisit(this.highlightService.startEnd[0],graph);
        if (this.highlightService.startEnd[1]["parent"] == null) {
        for(let [key,vlaue] of graph) {
            if(key.color=="white") {
                this.dfsVisit(key,graph);
            }
            if (this.highlightService.startEnd[1]["parent"] != null) {
                break;
            }
            if (this.runCount <= 0) {
                await this.delay(0.8);
            }
        }
    }

        if (this.highlightService.startEnd[1]["parent"] != null) {
            let node: Node = this.highlightService.startEnd[1]["parent"];
            while (node != null && node != this.highlightService.startEnd[0]) {
                node.color = "yellow";
                node["border"] = "1px solid yellow";
                node = node["parent"];
                if (this.runCount <= 0) {
                    await this.delay(10);
                }
            }
        }
        this.runCount++;
    }

    delay(delayInms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(2);
            }, delayInms);
        });
    }

 async  dfsVisit(node:Node,graph) {
       if (node != this.highlightService.startEnd[0]) {
           node["color"] = "gray";
           node["border"] = "1px solid skyblue";
       }
        if ((node.color).localeCompare("green") != 0) {
            node.color = "gray";
            node.border = "1px solid skyblue";
        }
       await this.delay(20);
        for(let adj of graph.get(node)) {
            if (adj["color"].localeCompare("red") == 0 || adj == this.highlightService.startEnd[1]) {
                adj["parent"] = node;
                return;
            }
            if (adj["color"].localeCompare("white") == 0) {
                if (adj["color"].localeCompare("green") != 0) {
                    adj["color"] = "gray";
                    adj["border"] = "1px solid skyblue";
                }
                adj["parent"] = node;
                if (this.highlightService.startEnd[1]["parent"] == null) {
                   await this.dfsVisit(adj, graph);
                }
            }
        }
     if (node != this.highlightService.startEnd[0]) {
         node["color"] = "blue";
         node["border"] = "1px solid skyblue";
     }
    }

}
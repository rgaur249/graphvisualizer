import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HighlightService } from "../display-highlight/highlightservice";
import { DisplayVisualizerService } from "../displayvisualizer/display-visualizer.service";
import { Node } from "../model/Node";
import { BuildGraphService } from "./graphbuild.service";
@Injectable({
    providedIn: 'root'
})
export class BreadthFirstSearchService {
    runCountresetSub = new Subject<number>();
    runCount: number = 0;

    constructor(private dispayVisService: DisplayVisualizerService,
        private highlightService: HighlightService,
        private buildGraphService: BuildGraphService) {
        this.runCountresetSub.subscribe(value => {
            this.runCount = value;
        });
    }

    async breadthFirstSearch() {
        const graph = this.buildGraphService.buildGraph(this.dispayVisService.array2D);

        for (let [key, value] of graph) {
            key.d = 0;
            key.parent = null;
        }
        this.highlightService.startEnd[0]["d"] = 0;
        this.highlightService.startEnd[0]["parent"] = null;
        const set: Node[] = [];
        set.push(this.highlightService.startEnd[0]);

        let minus = 5;

        main_loop: while (set.length > 0) {
            let node: Node = set.shift();

            if (node != this.highlightService.startEnd[0]) {
                node["color"] = "gray";
                node["border"] = "1px solid skyblue";
            }



            for (let adj of graph.get(node)) {
                if (adj["color"].localeCompare("white") === 0) {
                    if (adj["color"].localeCompare("green") !== 0) {
                        adj["color"] = "gray";
                        adj["border"] = "1px solid skyblue";
                    }
                    adj["d"] = node["d"] + 1;
                    adj["parent"] = node;
                    set.push(adj);
                }
                if (adj["color"].localeCompare("red") === 0 || adj == this.highlightService.startEnd[1]) {
                    adj["parent"] = node;
                    break main_loop;
                }
            }
            if (this.runCount <= 0) {
                await this.delay(minus);
                minus = minus - 0.5;
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
                    await this.delay(2);
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

}
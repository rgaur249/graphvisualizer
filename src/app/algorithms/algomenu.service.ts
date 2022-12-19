import { Injectable } from "@angular/core";
import { AstarSearchService } from "./astarsearch.service";
import { BreadthFirstSearchService } from "./breadthfirstsearch.service";
import { DepthFirstSearchService } from "./depthfirstsearchservice";
import { DijkstrasService } from "./dijkstras.service";
@Injectable({
    providedIn: 'root'
})
export class AlgoMenuService {
    constructor(private bfs: BreadthFirstSearchService,
        private astar: AstarSearchService,
        private dfs:DepthFirstSearchService,
        private dijkstras:DijkstrasService) { }

    runAlgo(algo: string) {
        switch (algo) {
            case "Dijkstra's Algorithm": this.dijkstras.dijkstrasSearch(); break;
            case "Breadth First Search": this.bfs.breadthFirstSearch(); break;
            case "A* Algorithm": this.astar.asStarSearch(); break;
            case "Depth First Search":this.dfs.depthFirstSearch(); break;
        }
    }
}
import { Injectable } from "@angular/core";
import { Node } from "../model/Node";

@Injectable({
    providedIn: 'root'
})
export class BuildGraphService {

    buildGraph(data: Node[][]) {
        const graph = new Map();

        for (let i = 0; i < data.length; i++) {
            const currRow = data[i];
            const prevRow = i - 1 >= 0 ? data[i - 1] : null;
            const nextRow = i + 1 < data.length ? data[i + 1] : null;
            for (let j = 0; j < currRow.length; j++) {
                const neighbors: Node[] = [];
                if (j - 1 >= 0 && currRow[j - 1]["color"] != "black") {
                    neighbors.push(currRow[j - 1]);
                }
                if (j + 1 < currRow.length && currRow[j + 1]["color"] != "black") {
                    neighbors.push(currRow[j + 1]);
                }
                if (prevRow != null && prevRow[j]["color"] != "black") {
                    neighbors.push(prevRow[j]);
                }
                if (nextRow != null && nextRow[j]["color"] != "black") {
                    neighbors.push(nextRow[j]);
                }
                graph.set(currRow[j], neighbors);
            }
        }
        return graph;
    }
}
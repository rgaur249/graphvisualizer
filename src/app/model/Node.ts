
export class Node {
    constructor(public color: string,
        public d: number,
        public parent: Node,
        public row: number,
        public col: number,
        public f: number,
        public g: number,
        public h: number,
        public img: string,
        public border: string) { }
}
/** ArrayからNodeListを作るやつ */
export class GNodeList<N extends Node> extends Array<N> implements NodeListOf<N> {
    constructor(nodes: N[]) {
        super(...nodes);
    }

    item(index: number) {
        return this[index];
    }

    override forEach(callbackfn: (value: N, key: number, parent: this) => void, thisArg?: any) {
        this.forEach(callbackfn, thisArg);
    }
}

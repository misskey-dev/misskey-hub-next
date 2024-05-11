import { visit } from 'unist-util-visit';

export default function remarkAddSpaceFunction() {
    return (tree) => {
        visit(tree, 'text', (node, index, parent) => {
            if (parent && ['root', 'emphasis', 'strong', 'paragraph'].includes(parent.type)) {
                node.value = node.value.replace(/(?<=[\.\?\!])([A-Z(])/g, ' $1');
            }
        });
    };
}
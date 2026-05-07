/**
 * Remark plugin that converts ```mermaid fenced code blocks into raw HTML
 * <div class="mermaid">...</div> nodes. Bypasses Starlight's Expressive Code
 * (which adds syntax-highlighting markup that breaks Mermaid's parser) and
 * lets the client-side mermaid runtime pick the divs up via mermaid.run().
 *
 * Implemented without unist-util-visit so we don't add a workspace dep.
 */
function walk(node) {
  if (node && node.type === 'code' && node.lang === 'mermaid') {
    node.type = 'html';
    node.value = '<div class="mermaid">\n' + node.value + '\n</div>';
    delete node.lang;
    delete node.meta;
    return;
  }
  if (node && Array.isArray(node.children)) {
    for (const child of node.children) walk(child);
  }
}

export default function remarkMermaid() {
  return (tree) => walk(tree);
}

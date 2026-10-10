// bevel/rules-in-layers: every style rule must sit inside an @layer block, so
// an app's unlayered CSS always wins. Stylelint has no core rule for this.

import stylelint from "stylelint";

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

const ruleName = "bevel/rules-in-layers";

const messages = ruleMessages(ruleName, {
  rejected: (what) => `Expected ${what} to be inside an @layer block`,
});

const insideLayer = (node) => {
  for (let parent = node.parent; parent && parent.type !== "root"; parent = parent.parent) {
    if (parent.type === "atrule" && parent.name.toLowerCase() === "layer") return true;
  }
  return false;
};

const rule = (primary) => (root, result) => {
  if (!validateOptions(result, ruleName, { actual: primary })) return;

  root.walkRules((node) => {
    if (insideLayer(node)) return;
    report({ ruleName, result, node, message: messages.rejected(`"${node.selector}"`) });
  });

  // At-rules that hold declarations directly, such as @font-face.
  root.walkAtRules((node) => {
    if (node.name.toLowerCase() === "layer" || insideLayer(node)) return;
    if (!node.nodes?.some((child) => child.type === "decl")) return;
    report({ ruleName, result, node, message: messages.rejected(`@${node.name}`) });
  });
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = { url: "https://github.com/khushmeeet/bevel.css" };

export default createPlugin(ruleName, rule);

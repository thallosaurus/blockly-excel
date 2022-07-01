const Blockly = require('blockly/core');
require('./style.css');
const { updateCodePreview } = require("./codearea.js");
const blocks = require("./jsongen/blocks.js");
const toolbox = require("./jsongen/toolbox.js")

const vbaGenerator = require("./jsongen/generator.js");

Blockly.common.defineBlocksWithJsonArray(blocks);

window.onload = function (e) {
    let workspace = Blockly.inject('blocklyDiv', {
        toolbox: toolbox,
        renderer: "thrasos"
    });

    workspace.addChangeListener(() => {
        const code = vbaGenerator.workspaceToCode(workspace);
        updateCodePreview(code);
    });
}
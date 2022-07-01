const { Generator } = require("blockly");

const gen = new Generator('JSON');

gen.PRECEDENCE = 0;

gen.scrub_ = function(block, code, opt_thisOnly) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !opt_thisOnly) {
        return code + ',\n' + gen.blockToCode(nextBlock)
    }
    return code;
}

gen["logic_null"] = function(block) {
    return ['null', gen.PRECEDENCE];
}

gen["text"] = function(block) {
    const textValue = block.getFieldValue("TEXT");
    const code = `"${textValue}"`;
    return [code, gen.PRECEDENCE];
}

gen['math_number'] = function(block) {
    const code = String(block.getFieldValue("NUM"));
    return [code, gen.PRECEDENCE];
}

gen["logic_boolean"] = function(block) {
    const code = (block.getFieldValue("BOOL") == "TRUE") ? "true" : "false";
    return [code, gen.PRECEDENCE];
}

gen["member"] = function(block) {
    const name = block.getFieldValue("MEMBER_NAME");
    const value = gen.valueToCode(
        block, "MEMBER_VALUE", gen.PRECEDENCE
    );

    const code = '"' + name + '": ' + value;
    return code;
}

gen['lists_create_with'] = function(block) {
    const values = [];
    for (let i = 0; i < block.itemCount_; i++) {
        let valueCode = gen.valueToCode(block, "ADD" + i, gen.PRECEDENCE);

        if (valueCode) {
            values.push(valueCode);
        }
    }

    const valueString = values.join(",\n");
    const indentedValueString = gen.prefixLines(valueString, gen.INDENT);
    const codeString = '[\n' + indentedValueString + '\n]';
    return [codeString, gen.PRECEDENCE];
}

gen["object"] = function(block) {
    const statement_members = gen.statementToCode(block, "MEMBERS");
    const code = '{\n' + statement_members + '\n}';
    return [code, gen.PRECEDENCE];
}

module.exports = gen;
const baseEmmetCSS = require('./node_modules/@emmetio/snippets/css.json');
// const rulePartsArr = ruleValue.match(/(?<=\$\{).*?(?=\})/gim);

const special = require('./node_modules/stylelint-config-rational-order/groups/special');
const positioning = require('./node_modules/stylelint-config-rational-order/groups/positioning');
const boxModel = require('./node_modules/stylelint-config-rational-order/groups/boxModel');
const typography = require('./node_modules/stylelint-config-rational-order/groups/typography');
const visual = require('./node_modules/stylelint-config-rational-order/groups/visual');
const animation = require('./node_modules/stylelint-config-rational-order/groups/animation');
const misc = require('./node_modules/stylelint-config-rational-order/groups/misc');

const groupModel = [
    ['Special', special],
    ['Positioning', positioning],
    ['Box Model', boxModel({ border: true })],
    ['Typography', typography],
    ['Visual', visual({ border: false })],
    ['Animation', animation],
    ['Misc', misc],
];


function findPropertyGroup(prop) {
    let result = groupModel.find( item => item[1].find(groupProp => groupProp === prop) );
    if (!result) {
        result = ['Other'];
    }
    return result[0];
}

function normalizeFrameworkCore(emmetCSS) {
    const framework = new Map(Object.entries(emmetCSS));
    framework.forEach( (emmetValue, emmetClass) => {
        const propKeyCSS = emmetValue.split(':')[0];
        const classObject = {
            className: emmetClass,
            propKeyCSS,
            variations: [],
            group: findPropertyGroup(propKeyCSS)
        };

        if (/:/.test(emmetValue)) {
            classObject.variations = emmetValue.replace(propKeyCSS + ':', '').split('|');
        }

        framework.set(emmetClass, classObject);
    });
    return framework;
}

function normalizePropVariations(framework) {
    framework.forEach( (emmetValue, emmetClass) => {
        const varArr = emmetValue.variations;
    });
    console.log(framework);
    
}

function init() {
    let fw = normalizeFrameworkCore(baseEmmetCSS);
    fw = normalizePropVariations(fw);
}

module.exports = init();
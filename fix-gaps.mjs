import fs from 'fs';
import path from 'path';
import postcss from 'postcss';

const plugin = () => {
    return {
        postcssPlugin: 'flex-to-margin',
        Rule(rule) {
            let isFlex = false;
            let gapDecl = null;
            let direction = 'row';

            rule.walkDecls(decl => {
                if (decl.prop === 'display' && (decl.value === 'flex' || decl.value === 'inline-flex')) {
                    isFlex = true;
                }
                if (decl.prop === 'gap') {
                    gapDecl = decl;
                }
                if (decl.prop === 'flex-direction') {
                    direction = decl.value;
                }
            });

            if (isFlex && gapDecl) {
                const gapVal = gapDecl.value;
                gapDecl.remove();

                const newSelectors = rule.selectors.map(s => `${s} > * + *`);
                const newRule = new postcss.Rule({ selector: newSelectors.join(',\n') });
                
                if (direction.includes('column')) {
                    newRule.append(new postcss.Declaration({ prop: 'margin-top', value: gapVal }));
                } else {
                    newRule.append(new postcss.Declaration({ prop: 'margin-left', value: gapVal }));
                }

                rule.parent.insertAfter(rule, newRule);
            }
        }
    };
};
plugin.postcss = true;

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else if (file.endsWith('.css')) {
            results.push(file);
        }
    });
    return results;
}

const cssFiles = walk('c:/Users/Jagathratchagan/React/Gemstone_New/src/styles');

async function processFiles() {
    let count = 0;
    for (const file of cssFiles) {
        const css = fs.readFileSync(file, 'utf8');
        if (css.includes('gap:')) {
            const result = await postcss([plugin]).process(css, { from: file, to: file });
            if (css !== result.css) {
                fs.writeFileSync(file, result.css);
                console.log('Fixed', file);
                count++;
            }
        }
    }
    console.log(`Processed ${count} files.`);
}

processFiles().catch(console.error);

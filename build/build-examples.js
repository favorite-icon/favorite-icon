import { exec } from 'child_process';
import { examples } from './examples.js';

examples.map(item => {
    exec(`./node_modules/.bin/rollup ./examples/src/${item}.ts --config rollup.config.js --file ./examples/dist/${item}.js --format=umd`, (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
    });
});

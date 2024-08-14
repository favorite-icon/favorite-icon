import { exec } from 'child_process';
import { packages } from './packages.mjs';

packages.map(item => {
    [
        { name: 'iife', file: '' },
        { name: 'commonjs', file: 'common.' },
        { name: 'esm', file: 'esm.' }
    ].forEach(format => {
        let name = '';
        if (format.name === 'iife') {
            name = ` --name=${item.name}`;
        }
        exec(`./node_modules/.bin/rollup packages/${item.package}/src/${item.name === 'iief' ? 'default' : 'index'}.ts --config rollup.config.mjs --file packages/${item.package}/dist/index.${format.file}js --format ${format.name} ${name}`, (err, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
        });
    });
});

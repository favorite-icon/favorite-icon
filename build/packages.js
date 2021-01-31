'use strict';

const exec = require('child_process').exec;
const packages = require('./packages.json');

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
        exec(`./node_modules/.bin/rollup packages/${item.package}/src/index.ts --config rollup.config.js --file packages/${item.package}/dist/index.${format.file}js --format ${format.name} ${name}`, (err, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
        });
    });
});

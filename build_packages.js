'use strict';

const exec = require('child_process').exec;

[
    {
        package: 'favorite-icon',
        name: 'Favicon'
    },
    {
        package: 'favorite-icon-badge',
        name: 'FaviconBadge'
    },
    {
        package: 'favorite-icon-emoji',
        name: 'FaviconEmoji'
    },
    {
        package: 'favorite-icon-status',
        name: 'FaviconStatus'
    },
    {
        package: 'favorite-icon-video',
        name: 'FaviconVideo'
    },
    {
        package: 'favorite-icon-dot',
        name: 'FaviconDot'
    }
].map(item => {
    [
        { name: 'iife', file: '' },
        { name: 'commonjs', file: 'common.' },
        { name: 'esm', file: 'esm.' }
    ].forEach(format => {
        let name = '';
        if (format.name === 'iife') {
            name = ` --name=${item.name}`;
        }
        exec(`./node_modules/.bin/rollup packages/${item.package}/src/index.ts --config rollup.config.js --file packages/${item.package}/dist/index.${format.file}js --format ${format.name} ${name}`, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
    });
});

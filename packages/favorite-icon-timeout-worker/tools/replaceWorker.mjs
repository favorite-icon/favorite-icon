import fs from 'fs';

const worker = fs.readFileSync('./dist/worker.js', 'utf8');

[
    './dist/index.js',
    './dist/index.esm.js',
    './dist/index.common.js'
].forEach(filename => {
    const content = fs.readFileSync(filename, 'utf8').trim();
    const data64 = 'data:text/javascript;base64,' + btoa(worker);
    fs.writeFileSync(filename, content.replace(/\{worker\}/, data64));
});

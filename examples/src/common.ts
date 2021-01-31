import pages from '../../build/examples.json';

window.addEventListener('load', () => {
    let prev = pages[pages.length - 1];
    let next = pages[1];

    let num = -1;
    pages.some((item: string, i) => {
        num++;
        prev = pages[i - 1] || pages[pages.length - 1];
        next = pages[i + 1] || pages[0];

        return location.pathname.search('/' + item + '\\.') > -1;
    });

    const nav = document.createElement('div');
    nav.innerHTML = `<div class="nav">\
        <a href="https://github.com/hcodes/favorite-icon" class="button back">🏠</a>\
        <a href="./${prev}.html" class="button prev">◀</a>\
        ${num + 1}/${pages.length}
        <a href="./${next}.html" class="button next">▶</a>\
        </div>`;

    document.body.appendChild(nav);
}, false);

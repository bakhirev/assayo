const fs = require('node:fs');

const YandexMetrika = `
<script type="text/javascript" >
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  ym(94903985, "init", {
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true,
    webvisor:true
  });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/94903985" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
`;

const html = fs.readFileSync('../build/index.html', 'utf8');
const text = html
  .replace(/<\/body>/gim, `\n${YandexMetrika}\n</body>`);
fs.writeFileSync('../build/index.html', text);

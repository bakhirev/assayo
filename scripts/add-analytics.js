const fs = require('node:fs');
const path = require('node:path');

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

const GoogleAnalytics = `
<script async src="https://www.googletagmanager.com/gtag/js?id=G-MRZGLE32FG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-MRZGLE32FG');
</script>
`;

const htmlPath = path.join(__dirname, '..', 'build', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const text = html
  .replace(/<\/body>/gim, `\n${YandexMetrika}\n${GoogleAnalytics}\n</body>`);
fs.writeFileSync(htmlPath, text);

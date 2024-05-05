const SITE = 'https://assayo.online/';
const GITHUB_LINK = 'https://github.com/bakhirev/assayo';

function getLanguageLinks(languages, language) {
  const text = languages.map((lang) => {
    const title = {
      en: 'English',
      zh: '中文',
      es: 'Español',
      fr: 'Français',
      pt: 'Português',
      de: 'Deutsch',
      ja: '日本語',
      ru: 'Русский',
    }[lang] || '____';

    const link = lang === 'en'
      ? GITHUB_LINK
      : `${GITHUB_LINK}/blob/main/documents/${lang.toUpperCase()}.md`;

    return lang === language
      ? `__[${title}](${link})__`
      : `[${title}](${link})`;
  }).join(' | ');

  return `> ${text}\n`;
}

function getSocialLinks() {
  return '\n<a href="http://www.facebook.com/sharer.php?u=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo" target="_blank"><img src="https://assayo.online/assets/seo/social/facebook.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://reddit.com/submit?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&title=Visualization%20and%20analysis%20of%20git%20repository" target="_blank"><img src="https://assayo.online/assets/seo/social/reddit.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&text=Visualization%20and%20analysis%20of%20git%20repository%20%3A%20Check%20your%20git%20stats%21&via=&hashtags=IT%2Cgit%2Cstatistics%2Caudit%2Cdata-visualization%2Creport" target="_blank"><img src="https://assayo.online/assets/seo/social/twitter.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo" target="_blank"><img src="https://assayo.online/assets/seo/social/linkedin.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://www.tumblr.com/widgets/share/tool?canonicalUrl=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&title=Visualization%20and%20analysis%20of%20git%20repository&caption=Check%20your%20git%20stats%21&tags=IT%2Cgit%2Cstatistics%2Caudit%2Cdata-visualization%2Creport" target="_blank"><img src="https://assayo.online/assets/seo/social/tumblr.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://www.blogger.com/blog-this.g?u=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&n=Visualization%20and%20analysis%20of%20git%20repository&t=Check%20your%20git%20stats%21" target="_blank"><img src="https://assayo.online/assets/seo/social/blogger.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://www.evernote.com/clip.action?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&title=Visualization%20and%20analysis%20of%20git%20repository%20%3A%20Check%20your%20git%20stats%21" target="_blank"><img src="https://assayo.online/assets/seo/social/evernote.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="http://www.addthis.com/bookmark.php?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo" target="_blank"><img src="https://assayo.online/assets/seo/social/add.this.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://getpocket.com/edit?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo" target="_blank"><img src="https://assayo.online/assets/seo/social/getpocket.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://news.ycombinator.com/submitlink?u=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&t=Visualization%20and%20analysis%20of%20git%20repository" target="_blank"><img src="https://assayo.online/assets/seo/social/hacker.news.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://buffer.com/add?text=Visualization%20and%20analysis%20of%20git%20repository%20%3A%20Check%20your%20git%20stats%21&url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo" target="_blank"><img src="https://assayo.online/assets/seo/social/buffer.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://share.flipboard.com/bookmarklet/popout?v=2&title=Visualization%20and%20analysis%20of%20git%20repository%20%3A%20Check%20your%20git%20stats%21&url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo" target="_blank"><img src="https://assayo.online/assets/seo/social/flipboard.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="http://www.instapaper.com/edit?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&title=Visualization%20and%20analysis%20of%20git%20repository&description=Check%20your%20git%20stats%21" target="_blank"><img src="https://assayo.online/assets/seo/social/instapaper.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://share.diasporafoundation.org/?title=Visualization%20and%20analysis%20of%20git%20repository&url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo" target="_blank"><img src="https://assayo.online/assets/seo/social/diaspora.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo" target="_blank"><img src="https://assayo.online/assets/seo/social/qzone.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="http://vk.com/share.php?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&title=Visualization%20and%20analysis%20of%20git%20repository&comment=Check%20your%20git%20stats%21" target="_blank"><img src="https://assayo.online/assets/seo/social/vk.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="http://service.weibo.com/share/share.php?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&appkey=&title=Visualization%20and%20analysis%20of%20git%20repository&pic=&ralateUid=" target="_blank"><img src="https://assayo.online/assets/seo/social/weibo.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo" target="_blank"><img src="https://assayo.online/assets/seo/social/ok.ru.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="http://www.douban.com/recommend/?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&title=Visualization%20and%20analysis%20of%20git%20repository%20%3A%20Check%20your%20git%20stats%21" target="_blank"><img src="https://assayo.online/assets/seo/social/douban.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://www.xing.com/spi/shares/new?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo" target="_blank"><img src="https://assayo.online/assets/seo/social/xing.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="http://widget.renren.com/dialog/share?resourceUrl=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&srcUrl=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&title=Visualization%20and%20analysis%20of%20git%20repository%20%3A%20Check%20your%20git%20stats%21&description=Check%20your%20git%20stats%21" target="_blank"><img src="https://assayo.online/assets/seo/social/renren.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="threema://compose?text=Visualization%20and%20analysis%20of%20git%20repository%20%3A%20Check%20your%20git%20stats%21&id=" target="_blank"><img src="https://assayo.online/assets/seo/social/threema.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a><a href="https://lineit.line.me/share/ui?url=https%3A%2F%2Fgithub.com%2Fbakhirev%2Fassayo&text=Visualization%20and%20analysis%20of%20git%20repository%20%3A%20Check%20your%20git%20stats%21" target="_blank"><img src="https://assayo.online/assets/seo/social/line.me.jpg" title="Visualization and analysis of git repository" width="24px" height="24px"/></a>';
}

function getSreenshot() {
  return '<a href="https://assayo.online/demo/?dump=./test.txt" target="_blank"><img src="https://assayo.online/seo/github/index.png" width="100%" /></a>\n';
}

function getYandexMetrika() {
  return '\n<img src="https://mc.yandex.ru/watch/94903985" style="position:absolute; left:-9999px;" alt="" />\n';
}

function getTitle(language) {
  return `# [Assayo](${SITE}?ref=github&lang=${language})`;
}

module.exports = {
  getLanguageLinks,
  getSocialLinks,
  getSreenshot,
  getYandexMetrika,
  getTitle,
};

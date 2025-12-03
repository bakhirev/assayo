import IHashMap from 'ts/interfaces/HashMap';

export default function getSocialLinks(): IHashMap<string> {
  const link = 'https://github.com/bakhirev/assayo';
  const title = 'Visualization and analysis of git repository';
  const subTitle = 'Check your git stats!';
  const description = '';
  const tags = 'IT,git,statistics,audit,data-visualization,report';

  return {
    Facebook: `http://www.facebook.com/sharer.php?u=${link}`,
    VK: `http://vk.com/share.php?url=${link}&title=${title}&comment=${subTitle}`,
    QQ: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${link}`,
    Reddit: `https://reddit.com/submit?url=${link}&title=${title}`,
    X: `https://twitter.com/intent/tweet?url=${link}&text=${description}&via=&hashtags=${tags}`,
    LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
    OK: `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${link}`,
    Tumblr: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${link}&title=${title}&caption=${subTitle}&tags=${tags}`,
    Blogger: `https://www.blogger.com/blog-this.g?u=${link}&n=${title}&t=${subTitle}`,
    Evernote: `https://www.evernote.com/clip.action?url=${link}&title=${description}`,
    Addthis: `http://www.addthis.com/bookmark.php?url=${link}`,
    GetPocket: `https://getpocket.com/edit?url=${link}`,
    YCombinator: `https://news.ycombinator.com/submitlink?u=${link}&t=${title}`,
    Buffer: `https://buffer.com/add?text=${description}&url=${link}`,
    Flipboard: `https://share.flipboard.com/bookmarklet/popout?v=2&title=${description}&url=${link}`,
    Instapaper: `http://www.instapaper.com/edit?url=${link}&title=${title}&description=${subTitle}`,
    Renren: `http://widget.renren.com/dialog/share?resourceUrl=${link}&srcUrl=${link}&title=${title}&description=${subTitle}`,
    'The diaspora* Project': `https://share.diasporafoundation.org/?title=${title}&url=${link}`,
    Weibo: `http://service.weibo.com/share/share.php?url=${link}&appkey=&title=${title}&pic=&ralateUid=`,
    Douban: `http://www.douban.com/recommend/?url=${link}&title=${description}`,
    XING: `https://www.xing.com/spi/shares/new?url=${link}`,
    // Threema: `threema://compose?text=${description}&id=`,
    Line: `https://lineit.line.me/share/ui?url=${link}&text=${description}`,
  };
}

class RecommendationsRender {
  static list(recommendations, state) {
    const list = (recommendations || []).filter(item => item);
    const html = list.map(RecommendationsRender.item).join('');

    const className = state.openRecommendations
      ? 'recommendations_full'
      : 'recommendations_short';

    const more = !state.openRecommendations && list.length > 5
      ? '<div class="recommendations_more" onclick="app.updateState({ openRecommendations: true });">»</div>'
      : '';

    return `
      <div class="${className}">
        ${html}
        ${more}
      </div>`;
  }

  static item(recommendation) {
    const [title, subTitle] = RecommendationsRender.getTitleAndSubTitle(recommendation);

    const className = {
      info: 'recommendations_info',
      fact: 'recommendations_fact',
      warning: 'recommendations_warning',
      error: 'recommendations_error',
    }[recommendation[2] || ''] || '';

    const description = RecommendationsRender.getFormattedDescription(recommendation[1] || '');
    // const description = (recommendation[1] || '')
    //   .replace(/(#)([^#]*)(#)/gim, '<span style="color: #ED675F">$2</span>');

    return `
      <div class="recommendations_item ${className}">
        <div class="recommendations_item_wrapper recommendations_item_wrapper_scroll">
          <h5 class="recommendations_title">
            <span class="recommendations_icon"></span>
            ${title}
            ${subTitle || ''}
          </h5>
          ${description}
        </div>
      </div>`;
  }

  static getTitleAndSubTitle(recommendation) {
    if (!Array.isArray(recommendation[0])) {
      return [recommendation[0] || ''];
    }

    const firstTitle = recommendation[0][0] || '';
    const count = recommendation[0].length;
    if (count <= 1) return [firstTitle];

    const mainTitle = `
      ${firstTitle}
      <span class="recommendations_title_more">
        +${count - 1}
      </span>`;

    const otherTitle = recommendation[0]
      .slice(1, Infinity)
      .join(', ');

    const subTitle = `
      <span class="recommendations_sub_title">
        , ${otherTitle}
      </span>`;

    return [mainTitle, subTitle];
  }

  static getFormattedDescription(text) {
    const className = 'recommendations_description';
    const paragraphs = text.trim().split(/\n+/gm);
    let prevPrefix = '';
    let fullText = paragraphs.map((paragraph, index) => {
      const prefix = paragraph.substring(0, 2);

      let suffix = index === 1 ? `<div class="${className}_shortcut">` : '';
      if (prevPrefix !== '- ' && prefix === '- ') suffix += `<ul class="${className}_list">`;
      if (prevPrefix === '- ' && prefix !== '- ') suffix += '</ul>';
      prevPrefix = prefix;

      if (prefix === '- ') return `${suffix}<li class="${className}_item">${paragraph.substring(2)}</li>`;
      if (prefix === '# ') return `${suffix}<h6 class="${className}_sub_title">${paragraph.substring(2)}</h6>`;
      return `${suffix}<p class="${className}">${paragraph}</p>`;
    }).join('');

    return paragraphs.length > 1
      ? (fullText + '</div>')
      : fullText;
  }
}
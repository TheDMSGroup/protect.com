const blogMixin = {
  methods: {
    /*
      returns formatted month string, ie. 'Jan'
    */
    dateGetMonth(datestring) {
      const date = new Date(datestring);
      const n = date.getMonth();
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      return monthNames[n];
    },
    /*
      returns formatted date string, ie. '01'
    */
    dateGetDate(datestring) {
      const date = new Date(datestring);
      return (`0${date.getDate()}`).slice(-2);
    },
    getVerticals(tags) {
      // check for vertical and subvertical
      const verticalDefinitions = ['insurance', 'home-security', 'warranty', 'identity', 'antivirus-protection'];
      /*
      - insurance
          auto-insurance
          life-insurance
          home-insurance
          pet-insurance
          burial-insurance
      - home-security
      - warranty
          auto-warranty
      - identity
          identity-monitoring
      - antivirus-protection
      */
      const selectedVertical = {
        main: '',
        sub: '',
      };
      // get any tags that don't include a - for main vertical
      tags.forEach((tag) => {
        if (verticalDefinitions.includes(tag.urlSlug)) {
          selectedVertical.main = tag;
        }
      });
      // get any tags that include a - for sub vertical
      tags.forEach((tag) => {
        if (tag.urlSlug.includes('-')) {
          selectedVertical.sub = tag;
        }
      });
      return selectedVertical;
    },
    /*
      returns formatted year string, ie. '2020'
    */
    dateGetYear(datestring) {
      const date = new Date(datestring);
      return date.getFullYear();
    },
    // setup the breadcrumbs
    breadcrumbs() {
      // figure out the main vertical
      const crumbs = [];
      let mainVertical = this.tags.find((tag) => tag.urlSlug.includes('insurance'));
      if (!mainVertical) {
        mainVertical = this.tags.find((tag) => tag.urlSlug.includes('health'));
      }
      crumbs.push(mainVertical);
      let firstSubVertical = this.tags.find((tag) => tag.urlSlug.includes('auto'));
      if (!firstSubVertical) {
        firstSubVertical = this.tags.find((tag) => tag.urlSlug.includes('health'));
      }

      if (firstSubVertical) {
        crumbs.push(firstSubVertical);
      }
      return crumbs;
    },

    mapData() {
      const defaultValues = this.$store.state.defaultArticleFieldValues;

      // save article data to component
      // this.author.name = this.articleData.author.name ? this.articleData.author.name : defaultValues.authorName;
      // this.author.urlSlug = this.articleData.author.urlSlug ? this.articleData.author.urlSlug : defaultValues.urlSlug;
      // this.author.about = this.articleData.author.about ? this.articleData.author.about : defaultValues.about;
      // this.author.twitter = this.articleData.author.twitter ? this.articleData.author.twitter : defaultValues.twitter;
      // this.author.email = this.articleData.author.email ? this.articleData.author.email : defaultValues.email;
      // this.author.avatar = this.articleData.author.avatar ? this.articleData.author.avatar.url : defaultValues.avatar;
      this.content = this.articleData.content ? this.substitution(this.articleData.content.html) : defaultValues.content;
      this.coverImage = this.articleData.coverImage ? this.articleData.coverImage.url : defaultValues.coverImage;
      this.coverImageAltText = this.articleData.coverImageAltText ? this.articleData.coverImageAltText : this.articleData.coverImage.fileName;
      this.secondaryImage = this.articleData.secondaryImage ? this.articleData.secondaryImage.url : defaultValues.secondaryImage;
      this.date = this.articleData.date ? this.articleData.date.split('-').join('/') : defaultValues.date;
      this.excerpt = this.articleData.excerpt ? this.articleData.excerpt : defaultValues.excerpt;
      this.title = this.articleData.title ? this.substitution(this.articleData.title) : defaultValues.title;
      this.tags = Array.isArray(this.articleData.tags) ? this.articleData.tags : defaultValues.tags;
      this.relatedArticles = Array.isArray(this.articleData.relatedArticles) ? this.articleData.relatedArticles : defaultValues.relatedArticles;
      this.readTime = this.articleData.readTime ? this.articleData.readTime : defaultValues.readTime;
      this.metaTitle = this.articleData.metaTitle ? this.articleData.metaTitle : defaultValues.title;
      this.metaDescription = this.articleData.excerpt ? this.articleData.excerpt : defaultValues.excerpt;
      this.metaKeywords = this.articleData.metaKeywords ? this.articleData.metaKeywords : '';
      this.updatedAt = this.articleData.updatedAt ? this.articleData.updatedAt : defaultValues.date;
      this.vertical = this.articleData.vertical;
      this.subvertical = this.articleData.subvertical;
      this.urlSlug = this.articleData.urlSlug ? this.articleData.urlSlug : defaultValues.urlSlug;
      this.articleType = this.articleData.articleType;
      // set up title and description meta tags
      this.articleData.ogDescription = this.excerpt;
      this.articleData.ogTitle = this.title;
      this.componentRefs = this.checkForDynamicComponent(this.articleData.content.html);
      this.setUpViewMetaTags(this.articleData);
    },
    checkForDynamicComponent(articleContent) {
      const regex = /!!component_(\w+)!!/g;
      const matches = [...articleContent.matchAll(regex)];
      const componentNames = matches.map((match) => match[1]);
      const ranges = matches.map((match) => ({ matchStart: match.index, matchEnd: match.index + match[0].length }));
      const data = { componentNames, ranges, matches: (Object.keys(matches).map((key) => matches[key][0])) };

      const htmlRange = document.createRange();
      const htmlFragment = htmlRange.createContextualFragment(articleContent);

      const parts = Array.from(htmlFragment.children).filter((el) => el.textContent && el.textContent.trim().length > 0);
      data.contentParts = [];
      parts.forEach((part) => {
        console.log(part);
        data.contentParts.push({ type: 'text', content: part.outerHTML.replace(regex, ''), tag: part.tagName.toLowerCase() ?? null });
        data.componentNames.forEach((name) => {
          const r = new RegExp(name, 'g');
          if (part.textContent.match(r)) {
            data.contentParts.push({ type: 'component', name });
          }
        });
      });
      return data;
    },
    substitution(content, definitions = []) {
      let modifiedContent = content;
      if (content) {
        if (definitions.length === 0) {
          definitions.push(
            {
              variable: 'year',
              value: new Date().getFullYear(),
            },
          );
        }
        definitions.forEach((definition) => {
          modifiedContent = content.replace(/{{\s*(\w+)\s*}}/g, (_, subKey) => {
            console.log(_, subKey);
            return definition.value || '';
          });
        });
      }
      return modifiedContent;
    },
  },
};

export default blogMixin;

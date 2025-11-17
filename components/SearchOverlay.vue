<template>
  <div class="search-overlay-wrapper" :id="id || 'search-overlay-wrapper'">
    <div class="search-box">
      <div class="container search-container">
        <div class="search-input-container">
          <div class="input-and-button">
            <inputs
            v-model="searchq"
            class="search-input"
            :state="false"
            :valid="true"
            :config="{
              appendIcon: 'search',
              appendIconClickFunction: search,
              invalidFeedback: 'Please enter a search term',
              placeholderText: 'What are you looking for?',
              noCheckMark: false,
              noFocusStyle: false,
            }"></inputs>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.65 35.65" class="close-icon" @click="closeSearch">
            <g>
              <g id="icons2">
                <polygon class="cls-1"
                  points="35.65 2.53 33.12 0 17.82 15.29 2.53 0 0 2.53 15.29 17.82 0
                  33.12 2.53 35.65 17.82 20.35 33.12 35.65 35.65 33.12 20.35 17.82 35.65 2.53"
                  />
                  </g>
              </g>
          </svg>
        </div>
        <div class="results" v-if="foundResults">
          <!-- <div class="select-categories">
            <div class="select-wrapper">
              <div class="select-header">
                <span class="select-title" @click="toggleTagsDropdown">Select Categories</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.32 10.74" :class="selectCategoriesArrowPosition" @click="toggleTagsDropdown">
                  <g>
                    <g id="icons1">
                      <path class="down-arrow-gray" d="M17.7.68A2.16,2.16,0,0,0,14.62.61c-.74.67-1.48,
                      1.36-2.2,2S10.75,4.2,9.9,5l-.72.65,0,0-.3-.25L8.42,5,7,3.67c-1.08-1-2.2-2-3.32-3.06A2.16,
                      2.16,0,0,0,.62.68,2.16,2.16,0,0,0,.71,3.8c2.41,2.26,4.65,4.33,6.85,6.32a2.56,2.56,0,0,0,
                      1.23.58,2.85,2.85,0,0,0,.41,0,1.8,1.8,0,0,0,.73-.15,2.4,2.4,0,0,0,.83-.47c2.2-2,4.44-4.06,
                      6.85-6.32A2.16,2.16,0,0,0,17.7.68Z" />
                    </g>
                  </g>
                </svg>
              </div>

              <div class="category-options" v-if="showTagsDropdown">
                <div
                @click="selectTag"
                value="insurance" class="category">
                  <label
                  for="tag-select-insurance" value="insurance">
                    Insurance
                    <div class="radio-box">
                      <input id="tag-select-insurance" type="radio"
                      :checked="selectedTagTemp.value === 'insurance'" value="insurance" /></div>
                  </label>
                </div>
                <div
                @click="selectTag" value="warranty">
                  <label for="tag-select-warranty" value="warranty" class="category">
                    Warranty
                    <div class="radio-box">
                      <input id="tag-select-warranty" type="radio" :checked="selectedTagTemp.value === 'warranty'" value="warranty" /></div>
                  </label>
                </div>
              </div>
              <div class="update" v-if="showTagsDropdown">
                <span @click="search" class="search-update-results">
                  <b-buttons class="update-results-button" :config="{size: 'sm', variant: 'primary', label:'Update Results'}"></b-buttons>
                </span>
                <span class="reset" @click="resetTags">Reset</span>
              </div>
            </div>
          </div> -->

          <div class="results-count">
            Showing results {{revealedResults}} out of {{results.length}}
          </div>
          <ul>
            <li v-for="result in results.slice(0, 4)" v-bind:key="result.title">
              <span class="article-type" v-for="tag in result.tags.slice(0, 1)" v-bind:key="tag.id">
                {{tag.name}} Article
              </span>
              <span class="title">
                <a :href="`/article/${result.urlSlug}`">{{result.title}}</a>
              </span>
              <div class="excerpt">
                <span class="excerpt-body">{{result.excerpt}}</span>
                <a class="continue-reading-link" :href="`/article/${result.urlSlug}`">
                  Continue reading
                </a>
              </div>
            </li>
          </ul>
          <div class="show-more" v-if="results.length > 4">
            <a class="show-more-click" :href="`/articles/${this.selectedQuery}`">Show More</a>
          </div>
        </div>
        <div class="no-results" v-if="noResults">
          {{noResults}}
        </div>
      </div>
    </div>
    <!-- <div class="search-overlay" @click="closeSearch"></div> -->
  </div>
</template>

<script>
import axios from 'axios';
import Inputs from './Inputs/Main.vue';
// import BButtons from './Buttons/Main.vue';

export default {
  name: 'SearchOverlay',
  props: {
    toggleSearch: { type: Function },
    id: { type: String },
  },
  components: {
    Inputs,
    // BButtons,
  },
  data() {
    return {
      site_name: this.$store.state.site_name,
      searchq: '',
      foundResults: false,
      results: [],
      noResults: '',
      showTagsDropdown: false,
      selectedInsurance: false,
      selectedWarranty: false,
      searchInput: '',
      selectCategoriesArrowPosition: 'down',
      selectedQuery: '',
      revealedResults: '',
      searchOverlayHeight: '',
      selectedTag: {
        value: '',
        name: '',
      },
      selectedTagTemp: {
        value: '',
        name: '',
      },
    };
  },
  methods: {
    selectTag(event) {
      if (event.target.innerText) {
        this.selectedTagTemp = {
          value: event.target.getElementsByTagName('input')[0].value,
          name: event.target.innerText,
        };
      }
    },
    resetTags() {
      this.selectedTag = {
        name: '',
        value: '',
      };

      this.selectedTagTemp = {
        name: '',
        value: '',
      };
      this.search();
    },
    search() {
      if (!this.searchq) {
        return;
      }
      this.selectedTag = this.selectedTagTemp;
      this.toggleTagsDropdown();
      // reset
      this.noResults = '';
      this.defaultArticles = false;

      // api url
      const apiUrl = this.$store.state.apiUrl;

      // options for search
      const options = {
        search: this.searchq,
        tag: '',
      };

      // input search
      const search = options.search || '';
      let searchString = '';
      search.split(' ').forEach((word) => {
        searchString += '%' + word + '%';
      });

      // if there is an input or selected tag, then do axios query
      if (this.searchq || this.selectedTag) {
        const query = this.searchq ? `
        query searchQuery2($queryString: String = "${searchString}"){
            articles(where: {title_contains: $queryString}) {
            title
            excerpt
            urlSlug
            tags {
              name
            }
          }
        }
        ` : `
        query tagQuery($tagString: String = "${this.selectedTag.value}"){
          articles(where: {tags_some: {name_contains: $tagString}}) {
            title
            excerpt
            urlSlug
            tags {
              name
              id
            }
          }
        }
        `;
        axios({
          method: 'post',
          url: apiUrl,
          data: {
            query,
          },
        })
          .then((response) => {
            const queryData = response.data.data;
            if (queryData.articles !== null && queryData.articles.length > 0) {
              // format fetched articles
              this.results = queryData.articles.map((article) => {
                // get default values from store
                const defaultValues = this.$store.state.defaultArticleFieldValues;

                // return formatted article data
                return {
                  author: article.author ? article.author.name : defaultValues.authorName,
                  coverImage: article.coverImage ? article.coverImage.url : defaultValues.coverImage,
                  date: article.date ? article.date.split('-').join('/') : defaultValues.date,
                  excerpt: article.excerpt ? article.excerpt : defaultValues.excerpt,
                  tags: Array.isArray(article.tags) ? article.tags : defaultValues.tags,
                  title: article.title ? article.title : defaultValues.title,
                  urlSlug: article.urlSlug ? article.urlSlug : defaultValues.urlSlug,
                };
              });

              // indicate found results
              this.foundResults = true;

              // save data on query
              this.selectedQuery = this.searchq || this.selectedTag.value;
              this.revealedResults = this.results.length < 4 ? this.results.length : '4';
              // this.searchOverlayHeight = document.getElementById('search-overlay-wrapper').offsetHeight;

              // clear inputs so that the form can be submitted again
              this.searchq = '';
              this.selectedTag = '';
            } else {
              // if no articles found, go to main articles feed
              // this.$router.push('/articles');
              console.log('no articles');
              this.results = [];
              // this.foundResults = false;
              this.revealedResults = 0;
              this.noResults = 'No Results Found.';
            }

            return this.results;
          })
          .catch((error) => {
            console.error(error);
            // this.$router.push('/articles');
          });
      }
    },
    closeSearch() {
      this.toggleSearch();
    },
    toggleTagsDropdown() {
      this.showTagsDropdown = !this.showTagsDropdown;
      this.selectCategoriesArrow = !this.selectCategoriesArrow;

      if (this.showTagsDropdown) {
        this.selectCategoriesArrowPosition = 'up';
      } else {
        this.selectCategoriesArrowPosition = 'down';
      }
    },
  },
};
</script>

<style lang="scss">
@import '../scss/bootstrap.scss';
@import '../scss/_variables.scss';

.search-overlay-wrapper {
  width: 100%;
  // height: 1250px;
  // position: absolute;
  // z-index: 101;
  // overflow: hidden;

  .search-box {
    background-color: $white;
    width: 100%;
    padding-bottom: 1.5em;
    overflow: hidden;
    z-index: 1;
    box-shadow: 0px 9px 13px -8px rgba(0,0,0,0.4);

    @include media-breakpoint-down(sm) {
      // height: 1230px;
      padding-top: 0.5em;
    }

    .search-container {
      .search-input-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1em;
        padding: 0;
        position: relative;

        @include media-breakpoint-down(xs) {
          padding: 0 1em 1.5em 1em;
          border-bottom: 1px solid #ced4da;
          margin-left: -1em;
          margin-right: -1em;
          margin-bottom: 0;
        }

        .input-and-button {
          position: relative;
          width: 90%;
          box-shadow: 0 0 10px rgba(0, 0 ,0 , 0.08);
          background-color: transparent;
          border-radius: 10px;

          @include media-breakpoint-down(md) {
            width: 100%;
          }

          .search-input {
            width: 100%;
            margin-bottom: 0;
          }

          .search-button {
            background-color: transparent;
            border: 0;
            width: 50px;
            height: 50px;
            position: absolute;
            right: 4em;
            top: 1em;
            outline: none;
          }

          .valid {
            .input-group {
              > .form-control {
                @include media-breakpoint-down(xs) {
                  border-top-left-radius: 10px;
                  border-bottom-left-radius: 10px;
                }
              }

              > .input-group-append {
                > .input-group-text {
                  @include media-breakpoint-down(xs) {
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                  }
                }
              }
            }
            .input-group-text {
              cursor: pointer;

              @media (min-width: $widthMobile) {
                background-color: transparent;
                border-left: 0;
              }

              .elixr-icon {
                @include media-breakpoint-down(xs) {
                  width: 35px;
                }
              }
            }

            .input-group {
              &.focus {
                @media (min-width: $widthMobile) {
                  background-color: #3b54ba;
                }

                @include media-breakpoint-down(xs) {
                  border-radius: 10px;
                }
              }
            }
          }

          .form-control {
            @media (min-width: $widthMobile) {
              border-right: 0;
              padding: 0 1em;
            }
          }
        }

        .search-icon-nav {
          fill: #66C296;
        }

        .close-icon {
          width: 50px;
          height: 50px;
          cursor: pointer;
          fill: #999999;

          @include media-breakpoint-down(sm) {
            margin-left: 1em;
          }

          @include media-breakpoint-down(md) {
            display: none;
          }
        }
      }

      .search-input {
        width: 100%;
        margin-bottom: 2em;
      }

      .results {
        display: flex;
        border-top: 1px solid $gray-dark;
        margin-top: 2em;
        padding: 1.5em 0;
        position: relative;
        min-height: 230px;
        flex-wrap: wrap;

        @include media-breakpoint-down(xs) {
          flex-wrap: wrap;
          border-top: 0;
          margin-top: 0;
          padding-top: 1em;
        }

        .select-categories {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          flex-wrap: wrap;
          margin-bottom: 1em;
          position: absolute;

          @include media-breakpoint-down(md) {
            display: none;
          }

          @include media-breakpoint-down(xs) {
            display: flex;
            position: relative;
            justify-content: flex-start;
          }

          .select-wrapper {
            width: 260px;

            @include media-breakpoint-down(xs) {
              width: 107%;
              border-bottom: 1px solid $gray;
              margin-left: -1em;
              margin-right: -1em;
              padding: 0 1em 0 6px;
            }

            @media (max-width: 400px) {
              width: 110%;
            }

            .select-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 0.5em;

              @include media-breakpoint-down(xs) {
                padding-right: 3px;
                padding-bottom: 3px;
              }

              .select-title {
                cursor: pointer;
                display: block;
                color: $blue;
                font-weight: 600;
                padding-left: 10px;
                flex: 1;

                @include media-breakpoint-down(xs) {
                  padding-left: 16px;
                }
              }

              .down {
                fill: #999999;
                width: 15px;
                cursor: pointer;
              }

              .up {
                fill: #999999;
                width: 15px;
                cursor: pointer;
                transform: rotate(180deg);
              }
            }

            .category-options {
              display: flex;
              flex-direction: column;
              width: initial;
              border-left: 1px solid #ced4d9;
              border-right: 1px solid #ced4d9;
              border-top: 1px solid $blue;
              border-bottom: 1px solid #ced4d9;

              @include media-breakpoint-down(xs) {
                margin-left: -1em;
                margin-right: -1.5em;
              }

              @media (max-width: 400px) {
                margin-right: -1.8em;
              }

              div {
                background-color: $white;
                border: 0;
                text-align: left;
                border-bottom: 1px solid #ced4d9;
                padding: 0 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                outline: 0;

                @include media-breakpoint-down(xs) {
                  padding: 0 2em;
                  background-color: #f7faff;
                }

                &:last-child {
                  border-bottom: 0;
                }

                label {
                  padding: 10px 0;
                  margin: 0;
                  width: 100%;
                  cursor: pointer;
                }

                .radio-box {
                  border-left: 1px solid #ced4d9;
                  padding: 0 0 0 8px;
                  position: absolute;
                  right: 10px;
                  height: 44px;
                  display: flex;
                  align-items: center;
                  cursor: initial;
                  top: 0;

                  @include media-breakpoint-down(xs) {
                    border-left: 0;
                    padding-right: 1em;
                  }

                  input[type='radio'] {
                    opacity: 1;
                    &:checked {
                      &:after {
                        width: 15px;
                        height: 15px;
                        border-radius: 15px;
                        top: -2px;
                        left: -1px;
                        position: relative;
                        background-color: $blue;
                        content: '';
                        display: inline-block;
                        visibility: visible;
                        border: 1px solid $gray;
                      }
                    }

                    &:after {
                      width: 100px;
                      height: 44px;
                    }
                  }
                }
              }
            }

            .update {
              font-weight: 600;
              border-left: 1px solid #ced4d9;
              border-right: 1px solid #ced4d9;
              border-bottom: 1px solid #ced4d9;
              padding: 10px;
              display: flex;
              justify-content: space-between;
              align-items: center;

              @include media-breakpoint-down(xs) {
                border: 0;
                background-color: #f7faff;
                width: 107%;
                margin-left: -1em;
                display: block;
                padding: 1em;
              }

              @media (max-width: 400px) {
                width: 110%;
              }

              .search-update-results {
                display: block;

                @include media-breakpoint-down(xs) {
                  padding-left: 1em;
                }

                .update-results-button {
                  display: block;

                  button {
                    font-weight: 600;

                    @include media-breakpoint-down(xs) {
                      width: 100%;
                      background-color: transparent;
                      color: $green;
                      border: 2px solid $green;
                    }
                  }
                }

              }

              .reset {
                font-weight: 600;
                margin-right: 1.5em;
                font-size: 0.875em;
                cursor: pointer;

                @include media-breakpoint-down(xs) {
                  display: none;
                }
              }
            }
          }
        }

        .results-count {
          margin: 0.5em 0 1em;
          color: $blue;
          width: 100%;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          width: 70%;

          @include media-breakpoint-down(md) {
            width: 100%;
          }

          @include media-breakpoint-down(xs) {
            width: initial;
            margin-left: -1em;
            margin-right: -1em;
          }

          li {
            margin-bottom: 1em;

            @include media-breakpoint-down(xs) {
              border-bottom: 1px solid lighten($color: $gray, $amount: 30);
              padding: 0 1em 1.6em 1em;
            }

            .article-type {
              text-transform: uppercase;
              color: $gray;
              display: block;
              font-weight: 600;
              font-size: 0.875em;
              margin: 1.5em 0 0.5em;
            }

            .title {
              font-size: 1.2em;
              font-weight: 600;

              a {
                color: #3a4db3;
              }
            }

            .excerpt {
              margin: 0;

              @include media-breakpoint-down(xs) {
                line-height: 22px;
                margin-top: 0.5em;
              }

              .excerpt-body {
                // TO DO: if we decide the need to truncate the excerpt
                // overflow: hidden;
                // display: -webkit-box;
                // -webkit-line-clamp: 2;
                // -webkit-box-orient: vertical;
                margin-right: 6px;
              }

              .continue-reading-link {
                color: $green;
                border-bottom: 2px solid $green;
                padding-bottom: 2px;
                font-weight: 600;
                display: inline-block;
                cursor: pointer;

                &:hover {
                  text-decoration: none;
                  color: $green-darker;
                  border-bottom: 2px solid $green-darker;
                  padding-bottom: 2px;
                }
              }
            }
          }
        }

        .show-more {
          width: 100%;

          .show-more-click {
            display: inline-block;
            color: $green;
            border-bottom: 2px solid $green;
            padding-bottom: 2px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1em;

            &:hover {
              text-decoration: none;
              color: $green-darker;
              border-bottom: 2px solid $green-darker;
              padding-bottom: 2px;
            }
          }
        }
      }

      .no-results {
        padding: 1em 0;
      }
    }
  }

  .search-overlay {
    width: 100%;
    height: 100vh;
    z-index: -1;
    position: absolute;
    // background-color: rgba(255, 255, 255, 0.7);
  }
  input#search-input {
    padding: 5px;
    height: 100%;
  }
}
</style>

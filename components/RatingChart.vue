<template lang="html">
  <div
    class="rating-chart"
    v-if="typeof carriers !== 'undefined' && carriers.length > 0"
  >
    <!-- headers -->
    <b-row class="rating-headers-row">
      <b-col
        class="header-cell"
        :cols="
          index === 0
            ? headerColumnWidth(headers.length)
            : Math.floor(
                (12 - headerColumnWidth(headers.length)) / (headers.length - 1)
              )
        "
        v-for="(header, index) in headers"
        v-bind:key="header.label"
      >
        <span v-for="(word, i) in header.label.split(' ')" :key="word">
          <span v-if="i + 1 !== header.label.split(' ').length">
            {{ word }}
          </span>
          <span class="nowrap" v-else>
            {{ word }}
            <info-tooltip
              v-if="header.tooltip && header.tooltip.message"
              :target="header.tooltip.target + index"
              :message="header.tooltip.message"
            />
          </span>
        </span>
      </b-col>
    </b-row>
    <!-- rows of the carriers -->
    <b-row
      v-for="(carrier, index) in carriers"
      :key="index"
      class="rating-content-row"
      :class="index % 2 === 0 ? 'white' : ''"
    >
      <b-col
        :class="hindex === 0 ? 'rating-cell carrier-name-cell' : 'rating-cell'"
        :cols="hindex === 0 ? '12' : Math.floor(12 / (headers.length - 1))"
        :lg="
          hindex === 0
            ? headers.length - 1 === 3
              ? 6
              : 4
            : Math.floor((12 - 4) / (headers.length - 1))
        "
        v-for="(header, hindex) in headers"
        :key="hindex + index + 'subheader'"
      >
        <div
          class="cell-header"
          v-if="!['lenderName', 'carrierName'].includes(header.name)"
        >
          <span v-for="(word, i) in header.label.split(' ')" :key="word">
            <span v-if="i + 1 !== header.label.split(' ').length">
              {{ word }}
            </span>
            <span class="nowrap" v-else>
              {{ word }}
              <info-tooltip
                v-if="header.tooltip && header.tooltip.message"
                :target="header.tooltip.target + index"
                :message="header.tooltip.message"
              />
            </span>
          </span>
        </div>
        <div class="cell-content">
          <span
            v-if="
              carrier[header.name].includes('/') &&
              carrier[header.name].split('/')[1].length > 3
            "
          >
            <span class="d-block d-xl-none">
              <sup>{{ carrier[header.name].split("/")[0] }}</sup
              >/<sub>{{ carrier[header.name].split("/")[1] }}</sub>
            </span>
            <span class="d-none d-xl-block">
              {{ carrier[header.name] }}
            </span>
          </span>
          <span v-else>
            {{ carrier[header.name] }}
          </span>
        </div>
      </b-col>
    </b-row>
    <b-row class="compare-ratings-banner">
      <div class="gradient"></div>
      <div class="banner">
        <b-row>
          <b-col cols="12" lg="8">
            <h3>{{ bannerHeadline }}</h3>
          </b-col>
          <b-col cols="12" lg="4">
            <b-buttons
              :config="{
                type: 'submit',
                size: 'lg',
                variant: 'primary',
                label: 'COMPARE RATES',
                icon: 'arrow-right-short',
                click: goToAction,
              }"
            ></b-buttons>
          </b-col>
        </b-row>
      </div>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "RatingChart",
  props: ["bannerHeadline", "action", "carriers"],
  data() {
    return {
      headerDefinitions: {
        carrierName: {
          name: "carrierName",
          label: "Carrier Name",
        },
        amBestScore: {
          name: "amBestScore",
          label: "AM Best Rating",
          tooltip: {
            target: "am-best-score-tooltip",
            message:
              "AM Best issues financial-strength ratings measuring insurance companies' " +
              "ability to pay claims. The agency offers in-depth financial analysis reports to " +
              "help people judge an insurer’s creditworthiness. (A higher score here is better)",
          },
        },
        amBestRating: {
          name: "amBestRating",
          label: "AM Best Rating",
          tooltip: {
            target: "am-best-rating-tooltip",
            message:
              "AM Best is specialized in the rating of insurance and reinsurance companies." +
              "Its scale includes 7 categories that range from A to C. Ratings can be supplemented " +
              "with the signs (+) or (-) to specify the exact level or “Rating Notches”.",
          },
        },
        jdPowerRating: {
          name: "jdPowerRating",
          label: "J.D. Power Rating",
          tooltip: {
            target: "jd-power-rating-tooltip",
            message:
              "J.D. Power rankings are your guide to finding which" +
              "products or services ranked highest in J.D. Power Consumer Studies." +
              "All rankings are based on the opinions of a sample of consumers from a variety of industries" +
              "who have used or owned the product or service being rated. (A higher score here is better)",
          },
        },
        jdPowerScore: {
          name: "jdPowerScore",
          label: "J.D. Power Score",
          tooltip: {
            target: "jd-power-score-tooltip",
            message:
              "J.D. Power rankings are your guide to finding which products or services ranked " +
              "highest in J.D. Power Consumer Studies. All rankings are based on the opinions of a sample " +
              "of consumers from a variety of industries who have used or owned the product or service " +
              "being rated. (A higher score here is better)",
          },
        },
        bbbScore: {
          name: "bbbScore",
          label: "BBB Score",
          tooltip: {
            target: "bbb-score-tooltip",
            message:
              "BBB ratings represent the BBB's opinion of how the business is " +
              "likely to interact with its customers. The BBB rating is based on information BBB " +
              "is able to obtain about the business, including complaints received from the public." +
              "BBB seeks and uses information directly from businesses and from public data sources.",
          },
        },
        naicScore: {
          name: "naicScore",
          label: "NAIC Score",
          tooltip: {
            target: "naic-score-tooltip",
            message:
              "The NAIC helps consumers research specific insurance companies, " +
              "including any complaint data the NAIC has collected. Companies are scored on a " +
              "national complaint index, which shows whether they've received more or fewer " +
              "complaints than other insurers, after adjusting for market share. (A lower score here is better)",
          },
        },
        lenderName: {
          name: "lenderName",
          label: "Lender Name",
        },
        minCreditScore: {
          name: "minCreditScore",
          label: "Min. Credit Score",
          tooltip: {
            target: "mincredit-score-tooltip",
            message:
              "Qualifying buyers can find lenders offering conventional loans with " +
              "down payments as low as 3%. If you qualify for a VA loan some lenders offer 0% down on new purchases.",
          },
        },
        minDownPayment: {
          name: "minDownPayment",
          label: "Min. Down Payment",
          tooltip: {
            target: "min-downpayment-tooltip",
            message:
              "Conventional loans typically will require a minimum FICO® credit score of 620. " +
              "If you qualify for a VA loan some lenders minimum FICO® credit score can be as low as 580.",
          },
        },
      },
    };
  },
  methods: {
    goToAction() {
      if (this.action.includes("#")) {
        const element = document.querySelector(this.action);
        element.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      } else {
        /* this.$router.push(this.action); */
        window.location.href = this.action;
      }
    },
    headerColumnWidth(headerLength) {
      return headerLength - 1 === 3 ? 6 : 4;
    },
    testDataForVertical(carrierData, targetKeys) {
      if (carrierData) {
        /* filter the array for any values that are undefined */
        const hasMissingKeys = targetKeys.filter((key) => !carrierData[key]);
        /* If hasMissingKeys array has items in it, this set of carrier data is not a match. The below expression will return false and we move on to the next vertical of data
         */
        return hasMissingKeys.length === 0;
      }
      return false;
    },
  },
  computed: {
    vertical() {
      const carrier = this.carriers[0];
      let vertical = "autoInsurance";

      if (
        this.testDataForVertical(carrier, [
          "amBestRating",
          "jdPowerRating",
          "bbbScore",
          "naicScore",
        ])
      ) {
        vertical = "autoInsurance";
      } else if (
        this.testDataForVertical(carrier, [
          "minCreditScore",
          "minDownPayment",
          "bbbScore",
        ])
      ) {
        vertical = "mortgage";
      } else if (
        this.testDataForVertical(carrier, [
          "amBestRating",
          "bbbScore",
          "jdPowerScore",
        ])
      ) {
        vertical = "medicare";
      }
      console.log(vertical);
      return vertical;
    },
    headers() {
      let desiredHeaders = [];
      switch (this.vertical) {
        case "mortgage":
          desiredHeaders = [
            this.headerDefinitions.lenderName,
            this.headerDefinitions.minCreditScore,
            this.headerDefinitions.bbbScore,
            this.headerDefinitions.minDownPayment,
          ];
          break;
        case "medicare":
          desiredHeaders = [
            this.headerDefinitions.carrierName,
            this.headerDefinitions.amBestRating,
            this.headerDefinitions.bbbScore,
            this.headerDefinitions.jdPowerScore,
          ];
          break;
        case "autoInsurance":
        default:
          desiredHeaders = [
            this.headerDefinitions.carrierName,
            this.headerDefinitions.amBestRating,
            this.headerDefinitions.jdPowerRating,
            this.headerDefinitions.bbbScore,
            this.headerDefinitions.naicScore,
          ];
      }
      return desiredHeaders;
    },
  },
};
</script>

<style lang="scss">
.rating-chart {
  margin-top: 50px;
  @include media-breakpoint-down(md) {
    padding: 0 15px;
  }
  .nowrap {
    white-space: nowrap;
  }
  .rating-headers-row {
    padding: 25px 0;

    @include media-breakpoint-down(md) {
      display: none;
    }

    .header-cell {
      font-size: 1rem;
      color: #3b54ba;
      line-height: 1.2;
      font-weight: 500;
    }
  }
  .rating-content-row {
    padding: 35px 0;
    flex-wrap: wrap;

    @include media-breakpoint-down(md) {
      padding: 0;
      background: #fff;
      margin-bottom: 25px;
    }

    &.white {
      background: #fff;
    }
    .rating-cell {
      @include media-breakpoint-down(md) {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .cell-header {
        display: none;

        @include media-breakpoint-down(md) {
          display: block;
          font-size: 1rem;
          color: #3b54ba;
          line-height: 1.2;
          font-weight: 500;
          margin-bottom: 25px;
        }
      }
      .cell-content {
        line-height: 1.3;
        color: #0c2c67;
        text-align: left;
        font-size: 1.75rem;
        font-weight: 500;

        @include media-breakpoint-down(md) {
          font-size: 1.5rem;
          margin-bottom: 25px;
        }
      }
      &.carrier-name-cell {
        .cell-content {
          font-size: 1.25rem;

          @include media-breakpoint-down(md) {
            font-size: 1.5rem;
            padding: 20px 0 15px 0;
            margin-bottom: 15px;
            border-bottom: 1px #ccc solid;
          }
        }
      }
    }
  }
  .compare-ratings-banner {
    box-sizing: border-box;

    .gradient {
      margin-top: -250px;
      height: 275px;
      width: 100%;
      background-image: linear-gradient(
        rgba(255, 555, 555, 0),
        rgba(249, 249, 249, 1)
      );
      z-index: 0;
    }
    .banner {
      width: 100%;
      display: block;
      padding: 35px;
      background: #e2e9ff;
      text-align: center;

      h3 {
        line-height: 1.3;
        color: #0c2c67;
        text-align: left;
        font-size: 1.8rem;
        font-weight: 600;

        @include media-breakpoint-down(md) {
          text-align: center;
          margin-bottom: 25px;
          font-size: 1.5rem;
        }
      }
      .btn {
        height: 80px;
        margin-left: auto;
        display: block;

        @include media-breakpoint-down(md) {
          width: 100%;
        }
      }
    }
  }
}
</style>

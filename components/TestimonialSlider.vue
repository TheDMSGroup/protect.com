<template>
  <!-- be sure to import carousel styles in scss/bootstrap.scss -->
  <b-carousel indicators :interval="0">
    <b-carousel-slide
      v-for="testimonial in testimonialConfig"
      :key="testimonial.title"
    >
      <b-container>
        <b-row :class="testimonial.layout">
          <b-col cols="3" class="testimonial-image">
            <b-img-lazy
              :src="getImage(testimonial.image)"
              :alt="testimonial.title"
            ></b-img-lazy>
          </b-col>
          <b-col class="testimonial-text">
            <h2>{{ testimonial.title }}</h2>
            <h4>{{ testimonial.subhead }}</h4>
            <p>{{ testimonial.quote }}</p>
            <small class="byline">{{ testimonial.byline }}</small>
          </b-col>
        </b-row>
      </b-container>
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {
  components: {
    BCarousel,
    BCarouselSlide,
    BImgLazy,
    BContainer,
    BRow,
    BCol,
  },
  props: {
    testimonialConfig: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    getImage(image) {
      return require("../assets/testimonials/" + image);
    },
  },
};
</script>

<style>
.carousel {
  position: relative;
}
.carousel {
  background: rgba(103, 194, 151, 0.06);
  position: relative;
}
.carousel::before {
  content: "";
  background-color: white;
  height: 100px;
  width: 100%;
  position: absolute;
}
.carousel-item {
  width: 100%;
}
.carousel-caption {
  position: relative;
  max-width: 900px;
  width: 100%;
}
.carousel .carousel-indicators li {
  background-color: #67c297;
  width: 15px;
  height: 15px;
  border-radius: 100%;
}
.testimonial-image img {
  max-width: 100%;
}
.testimonial-text {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.image-left .testimonial-image {
  order: 1;
}
.image-left .testimonial-text {
  order: 2;
}
.image-right .testimoial-text {
  order: 1;
}
.image-right .testimonial-image {
  order: 2;
}
.carousel-indicators {
  justify-content: flex-end;
}
.testimonial-text .byline {
  color: black;
  font-weight: bold;
}
@media screen and (max-width: 767px) {
  .carousel {
    padding: 3em 0;
  }
  .carousel::before {
    content: unset;
  }
  .carousel .carousel-caption {
    max-width: 75%;
  }
  .testimoial-text {
    order: 1;
  }
  .testimonial-image {
    display: none;
    order: 2;
  }
}
</style>

<template>
  <div class="client-ext-posts">
    <nav-bar is-fixed="true"></nav-bar>

    <main>
      <section id="cd-team">
        <div class="client-ext-content">
          <div class="ext-post"
               v-for="(story, i) in stories"
               :key="i"
          >

            <a href="#0" data-type="member-1"  @click="setActive(i)">
              <div class="ext-image">
                <img v-if="story.image" :src="`/src/assets/img/stories/${story.image}`">
                <img v-if="story.imageURL" :src="story.imageURL">
              </div>

              <div class="ext-content">
                <div class="ext-title">
                  <span class="highlight-text">{{story.title}}</span>
                </div>

                <div class="ext-description">
                  {{story.subtitle}}
                </div>
              </div>
            </a>
          </div>
        </div> <!-- cd-container -->
      </section> <!-- cd-team -->

      <div class="cd-overlay"></div>
    </main>

    <div class="cd-member-bio member-1">
      <div class="cd-member-bio-pict">
        <img v-if="currentStory.image" :src="`/src/assets/img/stories/${currentStory.image}`">
        <img v-if="currentStory.imageURL" :src="currentStory.imageURL">
      </div> <!-- cd-member-bio-pict -->

      <div class="cd-bio-content">
        <div class="title">{{currentStory.title}}</div>
        <div class="subtitle">{{currentStory.subtitle}}</div>
        <div class="description" v-html="currentStory.description"></div>
      </div> <!-- cd-bio-content -->
    </div> <!-- cd-member-bio -->
  </div>
</template>

<script>
import Nav from "../nav";
import stories from "./stories";
import MagicGrid from "magic-grid";

export default {
  data(){
    return {
      stories: stories,
      index: 0
    };
  },

  components: {
    "nav-bar": Nav
  },

  methods: {
    /**
     * Sets the active index to
     * the given value.
     *
     * @param index
     */
    setActive(index){
      let self = this;
      self.index = index;
      self.$ga.event("Stories", "select", self.stories[index].title);
    },

    /**
     * Checks if an index is the
     * active index.
     *
     * @param index - to be checked
     *
     * @return {boolean}
     */
    isActive(index){
      return index === this.index;
    }
  },

  computed: {
    /**
     * Gets the story at the active index.
     *
     * @return {{_id, title, subtitle, description, image}|*}
     */
    currentStory(){
      return this.stories[this.index]
    }
  },

  async created() {
    let self = this;
    self.$nextTick(() => {
      new MagicGrid({
        container: ".client-ext-content",
        items: self.stories.length,
        gutter: 40,
        maxColumns: 3
      }).listen();

      jQuery(document).ready(function($){
        var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

        //open team-member bio
        $('#cd-team').find('a').on('click', function(event){
          event.preventDefault();
          var selected_member = $(this).data('type');
          $('.cd-member-bio.'+selected_member+'').addClass('slide-in');
          $('.cd-member-bio-close').addClass('is-visible');

          // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
          if( is_firefox ) {
            $('main').addClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
              $('body').addClass('overflow-hidden');
            });
          } else {
            $('main').addClass('slide-out');
            $('body').addClass('overflow-hidden');
          }

        });

        //close team-member bio
        $(document).on('click', '.cd-overlay, .cd-member-bio-close', function(event){
          event.preventDefault();
          $('.cd-member-bio').removeClass('slide-in');
          $('.cd-member-bio-close').removeClass('is-visible');

          if( is_firefox ) {
            $('main').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
              $('body').removeClass('overflow-hidden');
            });
          } else {
            $('main').removeClass('slide-out');
            $('body').removeClass('overflow-hidden');
          }
        });
      });

    });
  }
};

</script>

<style scoped>

  .client-ext-posts{
    max-width: 1920px;
    height: 100vh;
    margin: auto;
    overflow: auto;
    background-color: white;
    transition: all 0.3s ease;
  }

  main {
    position: relative;
    z-index: 2;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    transition-property: transform;
    -webkit-transition-duration: 0.3s;
    -moz-transition-duration: 0.3s;
    transition-duration: 0.3s;
  }
  main.slide-out {
    /* the main element slides to the left when the author bio is visible */
    -webkit-transform: translateX(-270px);
    -moz-transform: translateX(-270px);
    -ms-transform: translateX(-270px);
    -o-transform: translateX(-270px);
    transform: translateX(-270px);
  }
  main.slide-out .cd-overlay {
    /* the overlay layer gets visible when the author bio slides in */
    display: block;
    -webkit-animation: cd-fade-in 0.3s;
    -moz-animation: cd-fade-in 0.3s;
    animation: cd-fade-in 0.3s;
  }
  @media only screen and (min-width: 768px) {
    main.slide-out {
      /* change in size of the author bio section */
      -webkit-transform: translateX(-600px);
      -moz-transform: translateX(-600px);
      -ms-transform: translateX(-600px);
      -o-transform: translateX(-600px);
      transform: translateX(-600px);
    }
  }
  @media only screen and (min-width: 1200px) {
    main.slide-out {
      -webkit-transform: translateX(-800px);
      -moz-transform: translateX(-800px);
      -ms-transform: translateX(-800px);
      -o-transform: translateX(-800px);
      transform: translateX(-800px);
    }
  }

  .cd-member-bio {
    position: fixed;
    top: 80px;
    right: 0;
    width: 270px;
    height: 100%;
    overflow-y: auto;
    /* smooth scrolling on mobile phones and tablets */
    -webkit-overflow-scrolling: touch;
    background: #5c4b51;
    z-index: 1;
    /* this how we move the author bio section off the canvas */
    -webkit-transform: translateX(270px);
    -moz-transform: translateX(270px);
    -ms-transform: translateX(270px);
    -o-transform: translateX(270px);
    transform: translateX(270px);
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    transition-property: transform;
    -webkit-transition-duration: 0.3s;
    -moz-transition-duration: 0.3s;
    transition-duration: 0.3s;
  }
  .cd-member-bio.slide-in {
    /* the author bio section slides in when the user clicks on the team member picture */
    -webkit-transform: translateX(0);
    -moz-transform: translateX(0);
    -ms-transform: translateX(0);
    -o-transform: translateX(0);
    transform: translateX(0);
  }
  .cd-member-bio .cd-member-bio-pict {
    position: relative;
  }
  .cd-member-bio .cd-member-bio-pict::after {
    /* gradient at the bottom of the image - same color of the background of the section */
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: -webkit-linear-gradient( bottom , #5c4b51, rgba(92, 75, 81, 0));
    background: linear-gradient(to top, #5c4b51, rgba(92, 75, 81, 0));
  }
  .no-cssgradients .cd-member-bio .cd-member-bio-pict::after {
    display: none;
  }
  .cd-member-bio img {
    width: 100%;
    display: block;
  }
  .cd-member-bio .cd-bio-content {
    padding: 1em;
    color: #FFF;
  }
  .cd-member-bio .cd-bio-content h1 {
    font-family: "Droid Sans", sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    font-size: 20px;
    font-size: 1.25rem;
  }
  .cd-member-bio .cd-bio-content p {
    font-size: 14px;
    font-size: 0.875rem;
    margin: 1em 0;
    line-height: 1.4;
    color: #d7cfd2;
  }
  @media only screen and (min-width: 768px) {
    .cd-member-bio {
      width: 600px;
      -webkit-transform: translateX(600px);
      -moz-transform: translateX(600px);
      -ms-transform: translateX(600px);
      -o-transform: translateX(600px);
      transform: translateX(600px);
    }
    .cd-member-bio .cd-bio-content {
      padding: 2em;
    }
    .cd-member-bio .cd-bio-content p {
      line-height: 1.6;
      margin: 2em 0;
    }
  }
  @media only screen and (min-width: 1200px) {
    .cd-member-bio {
      width: 800px;
      -webkit-transform: translateX(800px);
      -moz-transform: translateX(800px);
      -ms-transform: translateX(800px);
      -o-transform: translateX(800px);
      transform: translateX(800px);
    }
    .cd-member-bio .cd-member-bio-pict::after {
      height: 150px;
    }
    .cd-member-bio .cd-bio-content {
      padding: 4em;
      /* we move the content up so the title is over the color gradient */
      -webkit-transform: translateY(-80px);
      -moz-transform: translateY(-80px);
      -ms-transform: translateY(-80px);
      -o-transform: translateY(-80px);
      transform: translateY(-80px);
    }
    .cd-member-bio .cd-bio-content h1 {
      font-size: 40px;
      font-size: 2.5rem;
    }
    .cd-member-bio .cd-bio-content p {
      font-size: 16px;
      font-size: 1rem;
    }
    .no-cssgradients .cd-member-bio .cd-bio-content {
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0);
      transform: translateY(0);
    }
  }

  .cd-member-bio-close {
    width: 32px;
    height: 32px;
    overflow: hidden;
    position: fixed;
    top: 10px;
    right: 10px;
    /*background: url("../img/cd-icon-close.svg") no-repeat center center;*/
    text-indent: 100%;
    white-space: nowrap;
    z-index: 3;
    display: none;
  }
  .cd-member-bio-close.is-visible {
    display: block;
    -webkit-animation: cd-move-in 0.8s;
    -moz-animation: cd-move-in 0.8s;
    animation: cd-move-in 0.8s;
  }
  @media only screen and (min-width: 1200px) {
    .cd-member-bio-close {
      right: 20px;
      top: 20px;
    }
  }

  .cd-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(138, 190, 178, 0.8);
    cursor: pointer;
    display: none;
  }

  /* --------------------------------

  xkeyframes

  -------------------------------- */
  @-webkit-keyframes cd-fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  @-moz-keyframes cd-fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  @keyframes cd-fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes cd-move-in {
    0% {
      -webkit-transform: translateX(100px);
    }

    100% {
      -webkit-transform: translateX(0);
    }
  }
  @-moz-keyframes cd-move-in {
    0% {
      -moz-transform: translateX(100px);
    }

    100% {
      -moz-transform: translateX(0);
    }
  }
  @keyframes cd-move-in {
    0% {
      -webkit-transform: translateX(100px);
      -moz-transform: translateX(100px);
      -ms-transform: translateX(100px);
      -o-transform: translateX(100px);
      transform: translateX(100px);
    }

    100% {
      -webkit-transform: translateX(0);
      -moz-transform: translateX(0);
      -ms-transform: translateX(0);
      -o-transform: translateX(0);
      transform: translateX(0);
    }
  }

  .client-ext-posts{
    max-width: 1920px;
    height: 100vh;
    margin: auto;
    overflow: auto;
    background-color: white;
    transition: all 0.3s ease;
  }

  .client-ext-content{
    top: 130px;
    padding-bottom: 20px;
  }

  .ext-post{
    width: 450px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.2s ease;
  }

  .ext-post:hover{
    background-color: whitesmoke;
  }

  .ext-post a{
    display: block;
    text-decoration: none;
    padding: 15px;
  }

  .ext-post .ext-date{
    position: absolute;
    z-index: 1;
    width: fit-content;
    width: -moz-fit-content;
    font-size: 10px;
    font-weight: bold;
    padding: 5px;
    top: 10px;
    left: 10px;
    background-color: white;
    color: #454547;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }

  .ext-post .ext-image{
    position: relative;
    width: 100%;
    height: 216px;
  }

  .ext-post .ext-image img{
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }

  .ext-post .ext-content{
    color: #454547;
  }

  .ext-post .highlight-text{
    background-color: #b5e3cf;
    color: black;
    padding: 3px;
  }

  .ext-post .ext-title, .ext-post .ext-description{
    width: fit-content;
    width: -moz-fit-content;
    font-weight: bold;
  }

  .ext-post .ext-title{
    margin: 15px 0 8px;
    font-size: 14px;
    color: #24292e;
    border-bottom: 2px solid #42b983;
  }

  .ext-post .ext-description{
    font-size: 12px;
    margin-left: 3px;
    color: #494d50;
  }

  @media screen and (max-width: 640px){
    .client-ext-content{
      top: 100px;
    }

    .ext-post{
      width: 80%;
      max-width: 380px;
      min-width: 350px;
    }

    .ext-post .ext-date{
      font-size: 10px;
    }

    .ext-post .ext-image{
      height: 160px;
    }

    .ext-post .ext-title{
      font-size: 10px;
    }

    .ext-post .ext-description{
      font-size: 10px;
    }
  }

</style>

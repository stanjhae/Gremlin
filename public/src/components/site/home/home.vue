<template>
  <div class="home">
    <nav-bar is-fixed="true"></nav-bar>

    <home-head></home-head>
    <home-first></home-first>
    <home-second></home-second>
    <home-foot></home-foot>
  </div>
</template>

<script>
import Nav from "../nav.vue";
import Header from "./header";
import Footer from "./footer";
import FirstRow from "./firstRow";
import SecondRow from "./secondRow";
import "../../../../../node_modules/animate.css/animate.css";
import { WOW } from "wowjs";
import "./home.css";

export default{
  components: {
    "nav-bar": Nav,
    "home-head": Header,
    "home-first": FirstRow,
    "home-second": SecondRow,
    "home-foot": Footer,
  },

  methods: {
    analytics(){
      let self = this;
      let anchors = [
        {selector: ".intro a", type: "Title Link"},
        {selector: ".links a", type: "Icon Link"}
      ];

      for (let a of anchors){
        $(a.selector).click(function(){
          let url = $(this).attr("href");
          self.$ga.event(`Home - ${a.type}`, "open", url);
        });
      }
    }
  },

  async created(){
    let self = this;

    self.$nextTick(() => {
      new WOW().init();
      self.analytics();
    });
  },
};

</script>

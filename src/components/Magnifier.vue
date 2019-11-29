<template>
  <div class="img-magnifier-container" @mouseleave="isHover = false" @mouseenter="isHover = true">
    <div
      ref="glass"
      v-show="isHover"
      class="img-magnifier-glass"
      :style="`background-image:url(${this.src});width:${glassWidth}px;height:${glassHeight}px;background-size:${width*zoomLevel}px ${height*zoomLevel}px`"
      @mousemove="moveMagnifier"
    ></div>
    <img @mousemove="moveMagnifier" ref="myImg" :src="src" :width="width" :height="height" />
  </div>
</template>

<script>
export default {
  name: "Magnifier",
  props: {
    src: String,
    width: { type: Number, default: 400 },
    height: {
      type: Number,
      default: 550
    },
    zoomLevel: {
      type: Number,
      default: 3
    },
    glassWidth: {
      type: Number,
      default: 100
    },
    glassHeight: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      image: "",
      semiGlassWidth: "",
      semiGlassHeight: "",
      glass: "",
      bw: 1,
      isHover: false
    };
  },
  mounted() {
    this.image = this.$refs.myImg;
    this.magnify();
  },
  methods: {
    moveMagnifier(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = this.getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > this.image.width - this.semiGlassWidth / this.zoomLevel) {
        x = this.image.width - this.semiGlassWidth / this.zoomLevel;
      }
      if (x < this.semiGlassWidth / this.zoomLevel) {
        x = this.semiGlassWidth / this.zoomLevel;
      }
      if (y > this.image.height - this.semiGlassHeight / this.zoomLevel) {
        y = this.image.height - this.semiGlassHeight / this.zoomLevel;
      }
      if (y < this.semiGlassHeight / this.zoomLevel) {
        y = this.semiGlassHeight / this.zoomLevel;
      }
      /*set the position of the magnifier this.glass:*/
      this.glass.style.left = x - this.semiGlassWidth + "px";
      this.glass.style.top = y - this.semiGlassHeight + "px";
      /*display what the magnifier this.glass "sees":*/
      this.glass.style.backgroundPosition =
        "-" +
        (x * this.zoomLevel - this.semiGlassWidth + this.bw) +
        "px -" +
        (y * this.zoomLevel - this.semiGlassHeight + this.bw) +
        "px";
    },
    getCursorPos(e) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = this.image.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    },
    magnify() {
      this.glass = this.$refs.glass;
      this.semiGlassWidth = this.glass.offsetWidth / 2;
      this.semiGlassHeight = this.glass.offsetHeight / 2;
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.img-magnifier-container {
  position: relative;
}

.img-magnifier-glass {
  position: absolute;
  border-radius: 50%;
  background-repeat: no-repeat;
  cursor: none;
}
</style>
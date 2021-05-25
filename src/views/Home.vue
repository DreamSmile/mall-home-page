<template>
  <div class="home">
    <!-- 搜索框 -->
    <div class="search">
      <div class="imgs">
        <img src="@/assets/imgs/logo.png" />
      </div>
      <div class="search_el">
        <van-search
          v-model="sel"
          shape="round"
          background="none"
          placeholder="请输入搜索关键词"
        />
      </div>
    </div>
    <!-- 分类 -->
    <div class="sort" ref="sort" :class="{ is_fixed: overFixed }">
      <div class="sort_left">
        <button class="sort_btn" @click="showDia('全部商品')">全部商品</button>
        <button class="sort_btn" @click="showDia('毕业职场季')">
          毕业职场季
        </button>
      </div>
      <div class="sort_center">
        <button class="sort_btn sort_btn_center" @click="showDia('会员众筹日')">
          会员众筹日
        </button>
      </div>
      <div class="sort_right">
        <button class="sort_btn" @click="showDia('会员专享')">会员专享</button>
        <button class="sort_btn" @click="showDia('新品上市')">新品上市</button>
      </div>
    </div>
    <!-- 礼包入口 -->
    <div class="gift">
      <img
        :src="gift.url"
        usemap="#planetmap"
        ref="gift_img"
        @load="getGiftImgData(gift.url)"
      />
      <map name="planetmap" id="planetmap">
        <area
          shape="rect"
          :coords="member"
          @click="showDia('会员众筹日')"
          alt="Venus"
        />
        <area
          shape="rect"
          :coords="giftBag"
          @click="showDia('礼包')"
          alt="Mercury"
        />
      </map>
    </div>
    <!-- 轮播图 -->
    <div class="swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in swipe_img" :key="index">
          <img
            v-lazy="item.url"
            class="swipe_img"
            @click="showDia('轮播' + item.name)"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 图片分类区 -->
    <div class="sort_img">
      <img
        :src="sort_img.url"
        usemap="#sortplanetmap"
        class="img_width"
        @load="getImgData(sort_img.url)"
      />
      <map name="sortplanetmap" id="sortplanetmap">
        <area shape="rect" :coords="t" @click="showDia('T恤')" />
        <area shape="rect" :coords="shirt" @click="showDia('衬衫')" />
        <area shape="rect" :coords="pants" @click="showDia('裤子')" />
        <area shape="rect" :coords="shoes" @click="showDia('鞋子')"
      /></map>
    </div>
    <!-- 视频区 -->
    <div class="video">
      <video id="myVideo" class="video-js">
        <source :src="videoSrc" type="video/mp4" />
      </video>
    </div>
    <!-- 多张图片区 -->
    <div class="imgs">
      <van-image
        width="100%"
        lazy-load
        v-for="(item, index) in imgList"
        :key="index"
        :src="item.url"
        @click="showDia('多张图片' + item.name)"
      >
      </van-image>
    </div>
    <!-- 推荐轮播图 -->
    <div class="swipe_hot">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in swipe_hot" :key="index">
          <img
            v-lazy="item.url"
            class="swipe_img"
            @click="showDia(item.name)"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品链接区 -->
    <div class="goods">
      <img
        width="100%"
        class="img_width"
        usemap="#goodsmap"
        lazy-load
        :src="goodsImg.url"
        @load="getGoodsImgData(goodsImg.url)"
      />
      <map name="goodsmap" id="goodsmap">
        <area shape="rect" :coords="goods1" @click="showDia('商品1')" />
        <area shape="rect" :coords="goods2" @click="showDia('商品2')" />
        <area shape="rect" :coords="goods3" @click="showDia('商品3')" />
      </map>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "Home",
  data() {
    return {
      videoSrc: require("../assets/video/testVideo.mp4"), //视频地址
      videoImg: require("../assets/imgs/videoOPen.jpg"), //视频图片
      sel: "", //搜索
      swipe_img: [
        { url: require("@/assets/imgs/swipe1.jpg"), name: "1" },
        { url: require("@/assets/imgs/swipe2.jpg"), name: "2" },
      ],
      gift: {
        url: require("@/assets/imgs/gift.jpg"),
      },
      sort_img: {
        url: require("@/assets/imgs/sort_img.jpg"),
      },
      imgList: [
        { url: require("@/assets/imgs/one.jpg"), name: "1" },
        { url: require("@/assets/imgs/two.jpg"), name: "2" },
        { url: require("@/assets/imgs/three.jpg"), name: "3" },
        { url: require("@/assets/imgs/four.jpg"), name: "4" },
        { url: require("@/assets/imgs/five.jpg"), name: "5" },
        { url: require("@/assets/imgs/six.jpg"), name: "6" },
        { url: require("@/assets/imgs/seven.jpg"), name: "7" },
      ],
      swipe_hot: [
        { url: require("@/assets/imgs/swipe_hot1.jpg"), name: "推荐轮播1" },
        { url: require("@/assets/imgs/swipe_hot2.jpg"), name: "推荐轮播2" },
      ],
      goodsImg: {
        url: require("@/assets/imgs/goods.jpg"),
      },
      gift_img_height: 0,
      screenWidth: document.body.clientWidth,
      overFixed: false, //分类是否已经超出界面，超出需要定位顶部
      member: "0,0,0,0", //会员热区
      giftBag: "0,0,0,0", //礼包热区
      t: "0,0,0,0", //T恤的热区
      shirt: "0,0,0,0", //衬衫的热区
      pants: "0,0,0,0", //裤子的热区
      shoes: "0,0,0,0", //鞋子的热区
      goods1: "0,0,0,0",
      goods2: "0,0,0,0",
      goods3: "0,0,0,0",
    };
  },
  mounted() {
    const that = this;
    that.initVideo();
    window.addEventListener("scroll", this.handleScroll);
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
        console.log(window.screenWidth);
        that.screenWidth > 600
          ? (that.videoWidth = 11 + "rem")
          : (that.videoWidth = that.screenWidth);
        this.getImgData(this.sort_img.url);
        this.getGiftImgData(this.gift);
        this.getGoodsImgData(this.goodsImg.url);
        setTimeout(() => {
          this.gift_img_height = that.getGiftImgH();
        }, 3000);
      })();
    };
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 视频
    initVideo() {
      //初始化视频方法
      let myPlayer = this.$video(myVideo, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        autoplay: false, //是否自动播放
        poster: this.videoImg, //封面图
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: this.screenWidth *0.88,
        height: this.screenWidth * 0.4928,//0.88*0.56
      });
    },
    // 获得礼包图片并计算热区
    getGiftImgData(url) {
      let img = new Image();
      let that = this;
      img.src = url;
      img.onload = function () {
        let scale = document.body.clientWidth / img.width;
        that.member =
          "0,0," + document.body.clientWidth / 2 + "," + img.height * scale;
        that.giftBag =
          document.body.clientWidth / 2 +
          ",0," +
          document.body.clientWidth +
          "," +
          img.height * scale;
      };
    },
    // 获取分类图片尺寸并计算热区
    getImgData(url) {
      let img = new Image();
      let that = this;
      img.src = url;
      img.onload = function () {
        let scale = document.body.clientWidth / img.width;
        that.t =
          31 * scale +
          "," +
          462 * scale +
          "," +
          236 * scale +
          "," +
          528 * scale; //T恤
        that.shirt =
          263 * scale +
          "," +
          462 * scale +
          "," +
          468 * scale +
          "," +
          528 * scale;
        that.pants =
          31 * scale +
          "," +
          564 * scale +
          "," +
          232 * scale +
          "," +
          627 * scale;
        that.shoes =
          263 * scale +
          "," +
          564 * scale +
          "," +
          468 * scale +
          "," +
          634 * scale;
      };
    },
    // 获得商品图片尺寸并计算热区
    getGoodsImgData(url) {
      let img = new Image();
      let that = this;
      img.src = url;
      img.onload = function () {
        let scale = document.body.clientWidth / img.width;
        let height = img.height * scale; //图片转换比例后的热区高度
        let twoThirdsWidth = (2 * that.screenWidth) / 3; //图片三分之二转换的宽度
        that.goods1 = "0,0," + that.screenWidth / 3 + "," + height;
        that.goods2 =
          that.screenWidth / 3 + ",0," + twoThirdsWidth + "," + height;
        that.goods3 = twoThirdsWidth + ",0," + that.screenWidth + "," + height;
      };
    },
    getGiftImgH() {
      this.$nextTick(() => {
        this.gift_img_height = this.$refs.gift_img.offsetHeight;
        return this.$refs.gift_img.offsetHeight;
      });
    },
    // 点击时提醒
    showDia(msg) {
      Dialog.alert({
        title: "提示",
        message: msg,
        theme: "round-button",
      }).then(() => {
        // on close
      });
    },
    // 滚动事件
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.overFixed = scrollTop > 60; // 44px是导航标题头的高度
    },
  },
};
</script>
<style scoped lang="less">
.home {
  font-size: 0.37333rem;
  max-width: 11rem;
  margin: 0 auto;
  .search {
    background-color: #897864;
    display: flex;
    align-items: center;
    height: 1.6rem;
    .imgs {
      width: 2.4rem;
      height: 0.6rem;
      padding: 0.2rem;
      img {
        width: 100%;
        display: block;
      }
    }
    .search_el {
      flex: 1;
    }
  }
  // 分类
  .sort {
    background-color: #8998ab;
    display: flex;
    display: -ms-flexbox;
    justify-content: space-evenly;
    justify-content: space-around;
    padding: 0.2rem 0;
    .sort_left,
    .sort_right {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-around;
      box-sizing: border-box;
    }
    .sort_btn {
      border: 2px solid #fff;
      color: #fff;
      width: 2.4rem;
      padding: 0.14rem 0;
      border-radius: 99px;
      background-color: #343338;
    }
    .sort_btn_center {
      height: 2.4rem;
      font-size: 0.58rem;
      border-radius: 50%;
    }
  }
  // 分类置顶
  .is_fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 88;
    width: 100%;
    max-width: 11rem;
    margin: 0 auto;
  }
  // 礼包入口
  .gift {
    width: 100%;
    img {
      width: 100%;
      max-width: 11rem;
      display: block;
    }
  }
  // 轮播图
  .swipe_img {
    width: 100%;
  }
  /deep/.van-image__img {
    display: block;
  }
  /deep/.van-image {
    display: block;
  }
  // 视频
  #myVideo {
    margin: 0 auto;
  }
  .video {
    background-image: url("../assets/imgs/video.jpg");
    width: 100%;
    background-size: cover;
    background-position: 100% 100%;
    // 去除播放按钮
    /deep/.vjs-big-play-button {
      display: none;
    }
  }
  .img_width {
    width: 100%;
    display: block;
  }
  /deep/.swipe_img {
    display: block;
  }
  // 去除轮播图的样式
  /deep/.van-swipe__indicators {
    display: none;
  }
}
</style>

<template>
  <div class="container">
    <div class="product">
      <img src="@/assets/images/home-page/home-eidophor.png">
      <div class="product-character">
        <div class="character-big">YOUR MILLION DOLLAR SMILE ON A BARGAIN</div>
        <div
          class="character-little">
          Bargain for your price by spreading our mission for affordable oral care
        </div>
        <div class="colour">
          <div @click="onFBLogin">SHOP NOW</div>
        </div>
        <div class="get">
          <span
            class="wzprice">
            Click SHOP NOW to start your bargain
          </span>
        </div>
        <!-- <div class="get">
          <span
            class="wzprice"
            style="text-decoration:line-through">${{ productInfo.info.current_price }}</span>
          <span>&nbsp;&nbsp;&nbsp;Now</span>
          <span class="lowprice">&nbsp;${{ productInfo.info.bottom_price }}</span><br>
          Bargain for Discount
        </div> -->
      </div>
    </div>
    <div class="text">THE SONIC TRUBRUSH</div>
    <!-- 大轮播图 -->
    <div
      class="banner"
      v-if="productBanner[0].length">
      <swiper :options="swiperOption">
        <swiper-slide
          v-for="(item,index) in productBanner[0]"
          :key="index">
          <img
            :src="item.img_src | imgMapper"
            class="swiper-image">
        </swiper-slide>
        <div
          class="swiper-pagination"
          slot="pagination"/>
      </swiper>
    </div>
    <div class="describe">
      <div class="describeC">
        Compact, affordable, chargable, easy to use. The brush that actually
        makes your pearly whites, pearly white.
      </div>
      <div class="describeY">
        Your #1 defense that fights stains, plaque, and gingivitis
        in 2 minutes. A whiter and brighter smile in just days.
      </div>
      <div class="describe-map">
        <div class="describe-map-a">
          <img src="@/assets/images/home-page/carriage.png">
          Free Shipping & Delivery
        </div>
        <div class="describe-map-b">
          <img src="@/assets/images/home-page/tick.png">
          90 Money Day Guarantee
        </div>
      </div>
    </div>
    <div class="features">
      <div class="features-F">FEATURES</div>
      <div class="features-content">
        <div class="features-content-map">
          <img src="@/assets/images/home-page/home-dianliang.png">
        </div>
        <div>
          <div class="features-content-A">A MONTH OF BRUSHING ON ONE CHARGE</div>
          <div class="features-content-G">Get gently reminded every 30 seconds by the smart pacer
          to know when to move to your next mouth quadrant
          </div>
        </div>
      </div>
      <div class="features-content">
        <div class="features-content-map">
          <img src="@/assets/images/home-page/home-time.png">
        </div>
        <div>
          <div class="features-content-A">2 MINUTE TIMER</div>
          <div class="features-content-G">Get notified through vibrationafter the 2
          minute session recommended time by dentists
          </div>
        </div>
      </div>
      <div class="features-content">
        <div class="features-content-map">
          <img src="@/assets/images/home-page/home-clean.png">
        </div>
        <div>
          <div class="features-content-A">4 CLEANING MODES</div>
          <div class="features-content-G">With clean, sensitive, polishing, and
          massage mode - this brush was designed for every mouthin mind
          </div>
        </div>
      </div>
      <div class="features-content">
        <div class="features-content-map">
          <img src="@/assets/images/home-page/home-jiyi.png">
        </div>
        <div>
          <div class="features-content-A">SECTION PACER</div>
          <div class="features-content-G">Get gently reminded every 30 seconds by the smart
          pacer to know when to move to your next mouth quadrant
          </div>
        </div>
      </div>
      <div class="features-content">
        <div class="features-content-map">
          <img src="@/assets/images/home-page/home-yachi.png">
        </div>
        <div>
          <div class="features-content-A">MOST POWERFUL MOTOR</div>
          <div class="features-content-G">Get an unrivaled deep clean on every brush
          with up to 38,000sonic vibrations per minute
          </div>
        </div>
      </div>
      <div
        class="features-content">
        <div class="features-content-map">
          <img src="@/assets/images/home-page/home-yashua.png">
        </div>
        <div>
          <div class="features-content-A">BRISTLETECH SOFTNESS</div>
          <div class="features-content-G">A softness that helps those that brush
          too hard, that also takes away years of plaque buildup
          </div>
        </div>
      </div>
      <div class="features-trail"/>
    </div>
    <div class="know">
      <div class="know-headline">DID YOU KNOW...</div>
      <div class="know-little">that big toothbrush brands spend millions
      every year just on expensive advertising?</div>
    </div>
    <div class="cause">
      THAT’S WHY WE INVENTED THE
      <samp class="cause-s">SHARE BARGAIN</samp>
      <img src="@/assets/images/home-page/home-share.png">
    </div>
    <div class="concept">
      <div class="concept-a">
        <img src="@/assets/images/home-page/home-shares.png">
        <div>SHARE</div>
      </div>
      <div class="concept-b">
        <img src="@/assets/images/home-page/home-bargain.png">
        <div>BARGAIN</div>
      </div>
      <div class="concept-c">
        <img src="@/assets/images/home-page/home-save.png">
        <div>SAVE</div>
      </div>
    </div>
    <div class="savings">
      <div class="savings-o">Our goal is simple. Provide EVERYONE high quality,
      affordable oral care - starting with the best sonic toothbrush.</div>
      <div class="savings-t">The more you share our cause with your friends, the
      less we can spend on marketingcosts, and the more you save by helpingthe cause.</div>
      <div class="savings-s">SHARE MORE, SAVE MORE.</div>
    </div>
    <div class="video">
      <p>WHY EVERYONE’S<br>LOVES TRUBRUSH</p>
      <div class="video-toothbrush">
        <iframe
          type="text/html"
          src="https://www.youtube.com/embed/vbpXvMlANF4"/>
      </div>
    </div>
    <div class="goodies">
      <img src="@/assets/images/home-page/product-picture.png">
      <div class="goodies-text">
        <div class="goodies-text-y">
          YOUR GOODIES
          <div class="goodies-text-g">Get yours today and receive:</div>
        </div>
        <div class="goodies-text-t">
          <p>- The Sonic TruBrush</p>
          <p>- Slim, Travel Friendly Cover</p>
          <p>- One FREE Replacement Head</p>
          <p>- On-the-go USB Charger</p>
        </div>
      </div>
    </div>
    <div class="theory">
      <div class="theory-tooth">
        <img src="@/assets/images/home-page/home-tooth.png">
        <h3>90 DAY GUARANTEE</h3>
        <p>Trubrush not meeting your standards</p>
        <p>within 90 days? No worries! We’ll have</p>
        <p>it back for a full refund. Performance lost</p>
        <p>it’s touch? Just let us know and we’ll</p>
        <p>replace it for no cost.</p>
      </div>
      <div class="theory-set">
        <img src="@/assets/images/home-page/home-Setting.png">
        <h3>TruTrial WARRANTY</h3>
        <p>Trubrush WORKS. We’re so condifent</p>
        <p>that it will give you a more confident</p>
        <p>smile that we’re offering an unlimited</p>
        <p>warranty during your first 90 days.</p>
      </div>
    </div>
    <!-- 评论轮播 -->
    <div class="comment-headline">WHAT OUR CUSTOMERS<br>HAVE TO SAY:</div>
    <div
      class="comment">
      <swiper :options="swiperOption">
        <swiper-slide>
          <div class="content">
            <div class="head">
              <div>
                <img src="@/assets/images/discuss/Alex (0).png">
              </div>
              <div>
                <p class="otext">Alex</p>
                <div class="grade">
                  <img
                    v-for="(item,index) in 5"
                    :key="index"
                    src="@/assets/images/discuss/imperial_crown.png">
                </div>
              </div>
            </div>
            <div class="centre">
              <p class="otext"> I have braces and it’s normally hard for me to brush with
              a regular brush, testing out different modes made it seamless!
              </p>
            </div>
            <div class="below">
              <img src="@/assets/images/discuss/Alex (2).png">
              <img src="@/assets/images/discuss/1c1166d62ab1ed1ac298beaf0e4e9d7@2x.png">
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="content">
            <div class="head">
              <div>
                <img src="@/assets/images/discuss/Alison(0).png">
              </div>
              <div>
                <p class="otext">Alison</p>
                <div class="grade">
                  <img
                    v-for="(item,index) in 5"
                    :key="index"
                    src="@/assets/images/discuss/imperial_crown.png">
                </div>
              </div>
            </div>
            <div class="centre">
              <p class="otext">Definitely made the switch from my
              last brush. It’s just such a convenient brush!
              </p>
            </div>
            <div class="below">
              <img src="@/assets/images/discuss/Alison (3).png">
              <img src="@/assets/images/discuss/3b9268efe2df9acef70d7426b83b08c@2x.png">
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="content">
            <div class="head">
              <div>
                <img src="@/assets/images/discuss/Angela (0).png">
              </div>
              <div>
                <p class="otext">Angela</p>
                <div class="grade">
                  <img
                    v-for="(item,index) in 5"
                    :key="index"
                    src="@/assets/images/discuss/imperial_crown.png">
                </div>
              </div>
            </div>
            <div class="centre">
              <p class="otext">Trubrush is very nice, very sturdy. My mouth feels clean!
              Brushing with it is a calming sensation that just so happens to remove plaque
              and bacteria. Highly recommend!
              </p>
            </div>
            <div class="below">
              <img src="@/assets/images/discuss/Angela (3).png">
              <img src="@/assets/images/discuss/1f4c1959cc666c4906e75aedd68d5e8@3x.png">
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="content">
            <div class="head">
              <div>
                <img src="@/assets/images/discuss/Charity (0).png">
              </div>
              <div>
                <p class="otext">Charity</p>
                <div class="grade">
                  <img
                    v-for="(item,index) in 5"
                    :key="index"
                    src="@/assets/images/discuss/imperial_crown.png">
                </div>
              </div>
            </div>
            <div class="centre">
              <p class="otext"> It REALLY works! I have really sensitive gums, my gums don’t
              do well with regular electric toothbrushes. This one is super
              comfortable! I’m so happy!
              </p>
            </div>
            <div class="below">
              <img src="@/assets/images/discuss/Charity (2).png">
              <img src="@/assets/images/discuss/30ea604c1a7a5db182e0990cc2f6a8d@2x.png">
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="content">
            <div class="head">
              <div>
                <img src="@/assets/images/discuss/Muhammad (0).png">
              </div>
              <div>
                <p class="otext">Muhammad</p>
                <div class="grade">
                  <img
                    v-for="(item,index) in 5"
                    :key="index"
                    src="@/assets/images/discuss/imperial_crown.png">
                </div>
              </div>
            </div>
            <div class="centre">
              <p class="otext">I’ve tried other toothbrushes, and this one is the
              most powerful. It’s effective. Really awesome, I like it a lot!
              </p>
            </div>
            <div class="below">
              <img src="@/assets/images/discuss/Muhammad (1).png">
              <img src="@/assets/images/discuss/3df971a5065d6df656cddaa8657a7e1@2x.png">
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="content">
            <div class="head">
              <div>
                <img
                  src="@/assets/images/discuss/Kaylee (0).png">
              </div>
              <div>
                <p class="otext">Kaylee</p>
                <div class="grade">
                  <img
                    v-for="(item,index) in 5"
                    :key="index"
                    src="@/assets/images/discuss/imperial_crown.png">
                </div>
              </div>
            </div>
            <div class="centre">
              <p class="otext">Overall, it’s like a new school version of our old
              electronic toothbrushes! I’m excited to keep using it!
              </p>
            </div>
            <div class="below">
              <img src="@/assets/images/discuss/Kaylee (2).png">
              <img src="@/assets/images/discuss/2e770d22b25c345eabf1ea163bdd0eb@2x.png">
            </div>
          </div>
        </swiper-slide>
        <div
          class="swiper-pagination"
          slot="pagination"/>
      </swiper>
    </div>
  </div>
</template>

<script>
import { getHomeShow, getProductBanner, getProductInfo } from '@/api/api';
import utils from '@/jslibs/dk-utils'

export default {
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: '.swiper-pagination',
        },
      },
      token: '',
      productBanner: [[], []],
      productInfo: { info: {} },
    };
  },
  mounted() {
    this.network().getProductBanner(1)
    this.network().getProductInfo()
    window.addEventListener('scroll', this.showIcon);
  },
  // vuex数据使用
  computed: {
    fstatus() {
      return this.$store.state.fenter
    },
    reveal() {
      return this.$store.state.withFacebook.reveal
    },
  },
  methods: {
    onFBLogin() {
      if (!this.token) {
        this.$store.commit('pcondition', true)
      } else {
        this.$router.push('/user/bargain/detail');
      }
    },
    // 滚动事件
    showIcon() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      || document.body.scrollTop
      if (scrollTop >= 600) {
        this.$store.commit('rcondition', true)
        this.$store.commit('amend', false)
      } else {
        this.$store.commit('amend', true)
      }
      if (scrollTop >= 1300) {
        this.$store.commit('opaymentBounced', true)
      } else if (scrollTop <= 1000) {
        this.$store.commit('opaymentBounced', false)
      }
    },
    network() {
      return {
        getProductBanner: async (type) => {
          const { data } = await getProductBanner({ type })
          console.log(`获取产品轮播 type=${type}`, data)
          this.token = utils.getCookie('X-Access-Token')
          if (data.data.length) {
            const ind = type - 1
            this.productBanner.splice(ind, 1, data.data)
          }
        },
        getProductInfo: async () => {
          const { data } = await getProductInfo()
          console.log('获取产品信息', data)
          this.productInfo = data
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container{
  padding-bottom: 0;
  background: #fff;
  /deep/ .swiper-pagination-bullet {
      width: 0.18rem;
      height: 0.18rem;
      background: url("~assets/images/current/ic_home_banner_normal.png");
      background-size: 100% 100% !important;
      opacity: 1;
      vertical-align: top;
}
/deep/ .swiper-pagination-bullet-active {
      background:  url("~assets/images/current/ic_home_banner_light.png");
}
.product {
  position: relative;
  margin-top: 0.2rem;
  .product-character{
    width: 4.97rem;
    position: absolute;
    left: 0.61rem;
    top: 2.5rem;
    .character-big {
      font-weight: bold;
      font-size: 0.61rem;
    //   letter-spacing: 0.01rem;
    }
    .character-little{
        margin-top: 0.3rem;
        font-size:0.4rem;
    }
    .colour {
        height: 1.41rem;
        background: #FBAF5D;
        margin-top: 1.6rem;
        div{
            font-size: 0.4rem;
            display: flex;
            justify-content: center;
            padding-top: 0.5rem;
            font-weight: bold;
        }
    }
    .get {
        margin-top: 0.2rem;
        font-size: 0.4rem;
        font-weight: 500;
        font-style:oblique;
        // .wzprice{
        //   font-size: 0.4rem;
        //   font-weight: 500;
        // }
        // .lowprice{
        //   font-size: 0.5rem;
        //   color: red;
        // }
        span{
          font-size: 0.2rem;
          font-weight: 700;
        }
    }
  }
  img {
      width: 100%;
  }
}
.text{
    font-size: 0.45rem;
    display: flex;
    justify-content: center;
    margin-top: 0.49rem;
    // margin-block: 0.16rem;
    font-weight: bold;
}
.banner{
    // text-align:center;
    .swiper-container{
      padding-bottom: 0.8rem;
    }
        .swiper-image{
          width: 100%;
          height: 4.7rem;
          object-fit: cover;
          background: #f9f9f9;
        }
        .swiper-pagination{
          bottom: 0.4rem;
          height: 0.18rem;
        }
    }
    .describe {
        width: 5.9rem;
        margin-left: 0.46rem;
        .describeC {
            font-size: 0.3rem;
        }
        .describeY {
            margin-top: 0.28rem;
            font-size: 0.3rem;
        }
        .describe-map {
            margin-top: 0.8rem;
            font-size: 0.3rem;
            .describe-map-a{
                img {
                    width: 0.31rem;
                    height: 0.22rem;
                    margin-right: 0.2rem;
                }
            }
            .describe-map-b{
                margin-top: 0.17rem;
                img {
                    width: 0.21rem;
                    height: 0.29rem;
                    margin-right: 0.3rem;
                }
            }
        }
    }
    .features {
        width: 100%;
        height: 21.3rem;
        background: #BCF5ED;
        margin-top: 0.49rem;
        .features-F {
            width: 6.57rem;
            font-size: 0.53rem;
            font-weight: bold;
            border-bottom:0.01rem dashed #b0a1a1;
            padding-top: 1rem;
            padding-bottom: 0.5rem;
            display: flex;
            justify-content: center;
            margin-left: 0.47rem;
        }
        .features-content {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            .features-content-map{
                display: flex;
                align-items:center;
                img {
                  margin-top: 0.8rem;
                  width: 1.5rem;
                  margin-left: 0.4rem;
            }
            }
            .features-content-A{
                width: 4.5rem;
                font-weight: bold;
                font-size: 0.34rem;
                margin-top: 0.51rem;
            }
            .features-content-G{
                width: 4.57rem;
                font-size: 0.3rem;
                color: #6D6D6D;
                margin-right: 0.86rem;
            }
        }
        .features-trail{
            width: 6.57rem;
            border-bottom:0.01rem dashed #b0a1a1;
            padding-bottom: 0.01rem;
            margin-left: 0.47rem;
        }
    }
    .know {
      color: #ffffff;
      background: #000000;
      width: 100%;
      height: 5.04rem;
      padding-left: 1rem;
      .know-headline{
        font-size: 0.6rem;
        font-weight: 700;
        padding-top: 1.1rem;
      }
      .know-little{
        margin-top: 0.65rem;
        font-size: 0.35rem;
        font-weight: 600;
        width: 5.68rem;
      }
    }
    .cause{
      width: 6rem;
      height: 4.5rem;
      font-weight: bold;
      font-size: 0.7rem;
      padding-left: 1rem;
      margin-top: 0.95rem;
      .cause-s{
        font-weight: bold;
        color: #FBAF5D;
      }
      img{
        margin-left: 0.2rem;
        width: 0.33rem;
      }
    }
    .concept{
      background: #504F4F;
      display: flex;
      justify-content: center;
      color: #ffffff;
      div{
        font-weight: bold;
        text-align:center;
        margin-top: 0.1rem;
      }
      .concept-a{
        margin: 1.01rem 0.8rem 1.14rem 0.8rem;
        img{
          width: 1.58rem;
        }
      }
      .concept-b{
        margin-top: 2.04rem;
        img{
          width: 1.58rem;
        }
      }
      .concept-c{
        margin: 1.01rem 0.8rem 1.14rem 0.8rem;
        img{
          width: 1.31rem;
        }
      }
    }
    .savings{
      background: #504F4F;
      color: #ffffff;
      padding-left: 0.4rem;
      padding-top: 1.26rem;
      font-size: 0.3rem;
      div{
        width: 6.18rem;
        margin-bottom: 0.56rem;
        font-weight: 400;
      }
      .savings-s{
        width: 4.67rem;
        font-weight: bold;
        color: #FBAF5D;
        font-size: 0.61rem;
        margin-bottom: 0;
        padding-bottom: 1.11rem;
      }
    }
    .video{
      background: #000000;
      height: 7.5rem;
      text-align: center;
      p{
        padding-top: 0.79rem;
        color: #fff;
        font-size: 0.51rem;
        font-weight: 500;
        margin-bottom: 0.4rem;
      }
      .video-toothbrush{
        margin-bottom: 0.6rem;
        iframe{
          width: 6rem;
          height: 4rem;
        }
      }
    }
    .goodies{
      margin: 1.04rem 0.7rem 0.8rem 0.7rem;
      background: #EEFDFD;
      img{
        width: 6.04rem;
        height: 4.02rem;
      }
      .goodies-text{
        margin-top: 0.59rem;
        .goodies-text-y{
          font-weight: 700;
          font-size: 0.51rem;
          margin-left: 0.27rem;
          .goodies-text-g{
            font-size: 0.33rem;
          }
        }
        .goodies-text-t{
          width: 5.27rem;
          margin: 0.49rem 1.48rem 0 0.28rem;
          font-size: 0.33rem;
          padding-bottom: 0.51rem
        }
      }
    }
    .theory{
      text-align:center;
      .theory-tooth{
        margin-bottom: 0.5rem;
        img{
        width: 1.1rem;
      }
      }
      .theory-set{
        margin-bottom: 0.44rem;
        img{
          width: 0.8rem;
        }
      }
      h3{
        font-weight: 700;
        font-size: 0.51rem;
      }
      p{
        font-size: 0.33rem;
      }
    }
    .comment-headline{
      font-size: 0.51rem;
      font-weight: 600;
      background: #BCF5ED;
      text-align: center;
      padding: 0.55rem
    }
    .comment{
      background: #BCF5ED;
      padding: 0.2rem 0.5rem;
      .content{
        width: 100%;
        height: 7.6rem;
        object-fit: cover;
        background: #f9f9f9;
        padding: 0.32rem 0.36rem;
        border-radius: 0.1rem;
        .head{
          color: #999999;
          display: flex;
          .otext{
            color: #000000;
            font-size: 0.36rem;
          }
          img{
          width: 1.12rem;
          height: 1.12rem;
          margin-right: 0.27rem;
        }
        .grade{
          img{
            width:0.4rem;
            height:0.4rem;
          }
        }
        }
        .centre{
          margin-top: 0.59rem;
          color: #999999;
          .otext{
            color: #000000;
            font-size: 0.36rem;
          }
        }
        .below{
          display: flex;
          justify-content:space-between;
          img{
            margin-top: 0.29rem;
            width: 1.8rem;
            height: 1.8rem;
          }
        }
      }
      .swiper-pagination{
        padding-top: 0.2rem;
        background: #BCF5ED;
        bottom: -0.6rem;
        height: 1.18rem;
        }
         /deep/ .swiper-pagination-bullet {
      width: 0.25rem;
      height: 0.25rem;
      background: url("~assets/images/current/ic_home_banner_normal.png");
      background-size: 100% 100% !important;
      opacity: 1;
      vertical-align: top;
      margin:0 0.3rem;
}
/deep/ .swiper-pagination-bullet-active {
      background:  url("~assets/images/current/ic_home_banner_light.png");
}
    }
}
</style>

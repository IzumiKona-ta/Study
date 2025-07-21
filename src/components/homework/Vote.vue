<template>
  <div class="activity-page">


    <!-- 数据统计区 -->
    <van-row class="stats-row" gutter="20">
      <van-col span="8">
        <div class="stat-item">
          <p class="stat-number">72</p>
          <p class="stat-label">参与数</p>
        </div>
      </van-col>
      <van-col span="8">
        <div class="stat-item">
          <p class="stat-number">9927</p>
          <p class="stat-label">投票数</p>
        </div>
      </van-col>
      <van-col span="8">
        <div class="stat-item">
          <p class="stat-number">14</p>
          <p class="stat-label">访问量</p>
        </div>
      </van-col>
      <!-- 倒计时区 -->
      <div class="countdown-wrap">
        <van-count-down
            :time="countdownTime"
            format="DD 天 HH 时 mm 分 ss 秒"
            class="countdown-text"
        />
      </div>
      <!-- 报名按钮 -->
      <van-button class="apply-btn">我要报名</van-button>
    </van-row>

    <!-- 搜索框 -->
    <van-search
        v-model="searchVal"
        placeholder="请输入搜索关键词"
        class="search-box"
    />

    <!-- 作品列表（使用List+Grid实现两列布局） -->
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多作品了"
        @load="onLoad"
        class="image-list"
    >
      <van-grid :column-num="2" :gutter="10">
        <van-grid-item
            v-for="(item, index) in imageList"
            :key="index"
            class="grid-item"
        >
          <!-- 图片区域 -->
          <div class="img-container">
            <img :src="item.url" alt="参赛作品" class="item-img" />
            <div
                class="img-tag"
                :class="{ 'left-position': index % 2 === 0, 'right-position': index % 2 !== 0 }"
            >
              {{ item.number }}
            </div>
          </div>

          <!-- 信息区（名字、票数、按钮） -->
          <div class="info-section">
            <p class="item-name">{{ item.name }}</p>
            <p class="item-vote">{{ item.vote }}票</p>
            <van-button class="vote-btn">投票</van-button>
          </div>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 顶部背景图
const bgImage = new URL('@/assets/bg.jpg', import.meta.url).href;

// 数据统计
const stats = ref([
  { value: 72, label: '参与数' },
  { value: 9927, label: '投票数' },
  { value: 14, label: '访问量' }
]);

// 倒计时时间（示例：6天14时26分23秒 → 转换为毫秒）
const countdownTime = ref(6 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 26 * 60 * 1000 + 23 * 1000);

// 搜索框
const searchVal = ref('');

// 作品列表（新增name和vote字段）
const imageList = ref([
  {
    url: new URL('@/assets/img.jpg', import.meta.url).href,
    number: '25号',
    name: '泉此方',
    vote: 2014
  },
  {
    url: new URL('@/assets/img2.jpg', import.meta.url).href,
    number: '70号',
    name: '泉此方',
    vote: 1862
  },
  {
    url: new URL('@/assets/img3.jpg', import.meta.url).href,
    number: '18号',
    name: '泉彼方',
    vote: 1234
  },
  {
    url: new URL('@/assets/img2.jpg', import.meta.url).href,
    number: '78号',
    name: '菲比',
    vote: 5678
  }
]);

// 加载状态
const loading = ref(false);
const finished = ref(false);

// // 加载更多作品
// const onLoad = () => {
//   // 模拟异步加载
//   setTimeout(() => {
//     // 生成新数据
//     const newItems = [
//       {
//         url: new URL('@/assets/img.jpg', import.meta.url).href,
//         number: '25号',
//         name: '新加1',
//         vote: 1000
//       },
//       {
//         url: new URL('@/assets/img2.jpg', import.meta.url).href,
//         number: '70号',
//         name: '新加2',
//         vote: 800
//       }
//     ];
//
//     // 添加到列表
//     imageList.value = [...imageList.value, ...newItems];
//
//     // 设置加载状态
//     loading.value = false;
//
//     // 模拟数据加载完毕
//     if (imageList.value.length >= 12) {
//       finished.value = true;
//     }
//   }, 1000);
// };
</script>

<style scoped>

/* 主体*/
.activity-page {
  min-height: 100vh;
  background: linear-gradient(to left, #51B1F9, #BD759A);
  padding-top: 2px;
  margin-top: 0px;
}

/* 顶部背景图 */
/* 数据统计区 */
.stats-row {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin:  20px 20px;
  box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.9);
  padding-top: 16px;
}

.stat-item {
  text-align: center;
  color: #fff;
}

.stat-number {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
}

/* 倒计时区 */
.countdown-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 16px 0;

}

.countdown-text {
  font-size: 16px;
  color: #fff;
}

/* 报名按钮 */
.apply-btn {
  width: 80%;
  margin: 0 auto 16px;
  background: linear-gradient(to right, #ff99cc, #6699ff);
  border: none;
  color: #fff;
  border-radius: 24px;
  display: block;
}

/* 搜索框 */
.search-box {
  background: #F7F8FA;
  border-radius: 14px;
  margin: 16px 20px;
  box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.9);
}

/* 作品列表 */
.image-list {
  padding: 0 8px;
}

.grid-item {
  border-radius: 8px;
}
:deep(.van-grid-item__content) {
  background: transparent !important; /* 彻底透明背景 */
    padding: 0 0 10px 0!important; /* 移除所有内边距 */
/*  margin: 0 !important; !* 移除所有外边距 *!*/
}

.img-container {
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.item-img {
  width: 100%;
  display: block;
}

.img-tag {
  position: absolute;
  bottom: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.left-position {
  left: 10px;
}

.right-position {
  right: 10px;
}

/* 新增：信息区样式 */
.info-section {
  text-align: center;
  margin-top: 8px;
  color:#fff;
}

.item-name {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 4px;
}

.item-vote {
  font-size: 14px;
  color: #fff;
  margin-bottom: 8px;
}

.vote-btn {
  width: 150px;
  height: 30px;
  padding: 6px 0;
  background: linear-gradient(to right, #ff99cc, #6699ff);
  border: none;
  color: #fff;
  border-radius: 20px;
  font-size: 14px;
}

/* List组件样式 */
.van-list__finished-text {
  color: #fff;
  margin-top: 16px;
}
</style>
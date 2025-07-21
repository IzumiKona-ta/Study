<template>
  <div class="activity-page">
    <!-- 数据统计区：循环后端返回的 stats 数据 -->
    <!-- 数据统计区 -->
    <van-row class="stats-row" gutter="20">
      <van-col span="8">
        <div class="stat-item">
          <p class="stat-number">{{ stats.partake}}</p>
          <p class="stat-label">参与数</p>
        </div>
      </van-col>
      <van-col span="8">
        <div class="stat-item">
          <p class="stat-number">{{ stats.ticket}}</p>
          <p class="stat-label">投票数</p>
        </div>
      </van-col>
      <van-col span="8">
        <div class="stat-item">
          <p class="stat-number">{{ stats.visit }}</p>
          <p class="stat-label">访问量</p>
        </div>
      </van-col>
      <!-- 倒计时区 -->
      <div class="countdown-wrap">
        <van-count-down
            :time="countdowntime"
            format="DD 天 HH 时 mm 分 ss 秒"
            class="countdown-text"
        />
      </div>
      <van-button class="apply-btn">我要报名</van-button>
    </van-row>>

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
            v-for="item in userList"
            class="grid-item"
        >
          <!-- 图片区域 -->
          <div class="img-container">
            <img :src="item.picture" alt="参赛作品" class="item-img" />
            <div
                class="img-tag"
                :class="{ 'left-position': index % 2 === 0, 'right-position': index % 2 !== 0 }"
            >
              {{ item.userId }}号
            </div>
          </div>

          <!-- 信息区（名字、票数、按钮） -->
          <div class="info-section">
            <p class="item-name">{{ item.name }}</p>
            <p class="item-vote"><!--{{ item.vote }}-->0票</p>
            <van-button class="vote-btn">投票</van-button>
          </div>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router'; // 引入路由

// 响应式数据：从后端获取
const stats = ref([]) ;               // 统计数据
const userList = ref([]);           // 作品列表
const countdowntime = ref(0);        // 倒计时

//请求用户列表
fetch("api1/user/list",{
  method:"POST",
}).then(async res => {
  const data = await res.json();
  userList.value = data.obj.userlist;
})
//获取统计信息
fetch("api1/home/index",{
  method:"GET",
}).then(async res => {
  const data = await res.json();
  stats.value = data.obj;
  countdowntime.value=stats.activitytime;
})


/*// 页面每次挂载（打开）时都执行一次请求
onMounted(fetchData);*/

// 搜索框
const searchVal = ref('');
// 加载状态
const loading = ref(false);
const finished = ref(false);

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
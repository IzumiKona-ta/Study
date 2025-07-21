<template>
  <div class="app-container">
    <!-- 顶部背景 -->
    <div class="top-section">
      <img :src="bgImage" alt="活动背景" class="top-bg-img" />
      <div class="top-title">
        <span>YOUTH</span>
        <p>青春就是一场旅行</p>
      </div>
      <van-icon name="pear" color="#fff" size="40" class="top-icon" />
    </div>

    <!-- 路由视图 -->
    <router-view />

    <!-- 底部导航 -->
    <van-tabbar v-model="activeTab" @change="onTabChange">
      <van-tabbar-item icon="photo-o" name="vote">投票</van-tabbar-item>
      <van-tabbar-item icon="plus-o" name="apply">报名</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('vote');
const bgImage = new URL('@/assets/bg.jpg', import.meta.url).href;

const onTabChange = (name) => {
  activeTab.value = name;
  router.push({ name });
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(to left, #51B1F9, #BD759A);
}

.top-section {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.top-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.top-title {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
}

.top-title span {
  font-size: 24px;
  font-weight: bold;
}

.top-title p {
  font-size: 14px;
  margin-top: 4px;
}

.top-icon {
  position: absolute;
  top: 20px;
  right: 20px;
}

/* 底部导航样式 */
.van-tabbar {
  background: rgba(255, 255, 255, 0.9);
}

.van-tabbar-item {
  color: #333;
}

.van-tabbar-item--active {
  color: #ff99cc;
}
</style>
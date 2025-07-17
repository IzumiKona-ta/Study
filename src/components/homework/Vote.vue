<template>
  <!-- 顶部横幅 -->
  <div class="banner relative h-64">
    <div class="absolute inset-0 bg-banner-gradient opacity-90"></div>
    <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
      <h1 class="text-3xl md:text-4xl font-bold">《蓝色青春》大学生摄影大赛</h1>
      <p class="text-lg md:text-xl mt-2">青春就是一场旅行</p>
    </div>
  </div>

  <!-- 统计数据区 -->
  <div class="stats-container mx-auto max-w-5xl px-4 py-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard :value="72" label="参与数" />
      <StatCard :value="9927" label="投票数" />
      <StatCard :value="14" label="访问量" />
      <StatCard :value="countdown" label="倒计时" />
    </div>
  </div>

  <!-- 搜索框 -->
  <div class="search-container mx-auto max-w-3xl px-4 py-4">
    <input
        type="text"
        placeholder="请输入搜索关键词"
        class="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 backdrop-blur-md"
    />
  </div>

  <!-- 作品列表 -->
  <div class="gallery-container mx-auto max-w-5xl px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <PhotoCard
          v-for="item in photos"
          :key="item.id"
          :name="item.name"
          :votes="item.votes"
          :src="item.src"
          :badge="item.badge"
          :voted="item.voted"
          @vote="handleVote(item)"
      />
    </div>
  </div>

  <!-- 底部导航 -->
  <div class="bottom-nav fixed bottom-0 left-0 w-full bg-white/20 backdrop-blur-md flex justify-around items-center py-2">
    <a href="#" class="nav-item">首页</a>
    <a href="#" class="nav-item">规则</a>
    <a href="#" class="nav-item">排行榜</a>
  </div>
</template>

<script setup>
import { ref, onMounted, defineComponent } from 'vue';

// 统计卡片组件（使用 Vue 单文件组件格式）
const StatCard = defineComponent({
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  template: `
    <div class="stat-card flex-1 bg-white/20 p-4 rounded-lg backdrop-blur-md">
      <p class="text-2xl font-bold">{{ value }}</p>
      <p class="text-gray-300">{{ label }}</p>
    </div>
  `
});

// 作品卡片组件（使用 Vue 单文件组件格式）
const PhotoCard = defineComponent({
  props: {
    name: String,
    votes: Number,
    src: String,
    badge: String,
    voted: Boolean
  },
  emits: ['vote'],
  template: `
    <div class="photo-card bg-white/20 rounded-lg backdrop-blur-md overflow-hidden relative">
      <div class="badge absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded">
        {{ badge }}
      </div>
      <img :src="src" alt="作品" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h2 class="text-xl font-bold">{{ name }}</h2>
        <p class="text-gray-300 mt-1">{{ votes }} 票</p>
        <button
          class="vote-btn mt-2 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-primary-purple to-primary-blue text-white hover:from-purple-600 hover:to-blue-600 transition-colors"
          :class="{ 'opacity-50 cursor-not-allowed': voted }"
          @click="!voted && $emit('vote')"
        >
          {{ voted ? '已投票' : '投票' }}
        </button>
      </div>
    </div>
  `
});

// 模拟作品数据
const photos = ref([
  { id: 1, name: "蟹黄堡", votes: 1678, src: "/assets/photo1.jpg", badge: "34号", voted: false },
  { id: 2, name: "宋亚博", votes: 1232, src: "/assets/photo2.jpg", badge: "44号", voted: false },
  { id: 3, name: "汤圆", votes: 2014, src: "/assets/photo3.jpg", badge: "01号", voted: false },
  { id: 4, name: "张苗苗", votes: 1862, src: "/assets/photo4.jpg", badge: "12号", voted: false },
]);

// 投票逻辑
const handleVote = (item) => {
  if (item.voted) {
    alert("您已投过票啦～");
    return;
  }
  item.votes++;
  item.voted = true;
  alert("投票成功！感谢支持 ❤️");
};

// 倒计时逻辑
const countdown = ref("00天12时47分06秒");
onMounted(() => {
  const endTime = new Date("2025-12-31T23:59:59").getTime();
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = endTime - now;
    if (diff <= 0) {
      clearInterval(timer);
      countdown.value = "活动已结束";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    countdown.value = `${days.toString().padStart(2, "0")}天 ${hours
        .toString()
        .padStart(2, "0")}时 ${minutes.toString().padStart(2, "0")}分 ${seconds
        .toString()
        .padStart(2, "0")}秒`;
  }, 1000);
});
</script>

<style scoped>
.banner {
  background: url("/assets/banner-bg.jpg") center/cover no-repeat;
}
.nav-item {
  color: white;
  padding: 4px 8px;
  transition: color 0.3s;
}
.nav-item:hover {
  color: #ffffffcc;
}
.vote-btn {
  border: none;
}
</style>
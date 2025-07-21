<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-nav-bar
        title="Vant UI 示例"
        left-text="返回"
        right-text="前进"
        right-icon="search"
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />

    <!-- 按钮组件 -->
    <div class="demo-section">
      <h3 class="section-title">按钮组件</h3>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="success">成功按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button plain type="primary">朴素按钮</van-button>
      <van-button round type="primary">圆角按钮</van-button>
      <van-button square type="primary">方形按钮</van-button>
      <van-button disabled type="primary">禁用按钮</van-button>
      <van-button loading type="primary">加载中</van-button>
    </div>

    <!-- 表单组件 -->
    <div class="demo-section">
      <h3 class="section-title">表单组件</h3>
      <van-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
      />
      <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
      />
      <van-checkbox v-model="checked">我已阅读并同意用户协议</van-checkbox>
      <van-button type="primary" block @click="submitForm">提交</van-button>
    </div>

    <!-- 弹窗组件 -->
    <div class="demo-section">
      <h3 class="section-title">弹窗组件</h3>
      <van-button type="primary" @click="Toastt">按钮1</van-button>
      <van-button type="success" @click="Dialogg">按钮2</van-button>
      <van-button type="danger" @click="showPopup">显示弹出层</van-button>
    </div>

    <!-- 弹窗层 -->
    <van-popup v-model:show="popupVisible" position="bottom">
      <div class="popup-content">
        <h3>底部弹出层</h3>
        <van-button type="primary" @click="popupVisible = false">关闭</van-button>
      </div>
    </van-popup>

    <!-- 列表组件 -->
    <div class="demo-section">
      <h3 class="section-title">列表组件</h3>
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item.id" :title="item.title" :value="item.value" />
      </van-list>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {Toast, Dialog, Button, Field, Cell, CellGroup, showToast, showDialog} from 'vant';
import { useRouter } from 'vue-router';
import router from "@/router/index.js";

// 表单数据
const username = ref('');
const password = ref('');
const checked = ref(true);

// 弹窗控制
const popupVisible = ref(false);
const loading = ref(false);
const finished = ref(false);
const list = ref([
  { id: 1, title: '列表项1', value: '内容1' },
  { id: 2, title: '列表项2', value: '内容2' },
  { id: 3, title: '列表项3', value: '内容3' }
]);

// 事件处理
const onClickLeft = () => {
  router.back();
};

const onClickRight = () => {
  showToast('请输入任务内容');
};

const submitForm = () => {
  if (!username.value || !password.value) {
    showToast('请输入任务内容');
    return;
  }
  showToast('请输入任务内容');
};

const Toastt = () => {
  showToast('请输入任务内容');
};

const Dialogg = () => {
  showDialog({
    title: '提示',
    message: '缺省缺省缺省？',
    confirmButtonText: '取消',
    cancelButtonText: '清空',
    cancelButtonColor: '#f56c6c',
    showCancelButton: true,
  }).then(() => {

  }).catch(() => {
    //真正的确认操作
    todos.value = [];
    showToast({
      type: 'success', // 指定类型为成功
      message: '已清空所有任务'
    });
  });
};

const showPopup = () => {
  popupVisible.value = true;
};

const onLoad = () => {
  // 模拟加载更多数据
  setTimeout(() => {
    for (let i = 0; i < 3; i++) {
      list.value.push({
        id: list.value.length + 1,
        title: `列表项${list.value.length + 1}`,
        value: `内容${list.value.length + 1}`
      });
    }
    loading.value = false;
    if (list.value.length >= 15) {
      finished.value = true;
    }
  }, 1000);
};
</script>

<style scoped>
.container {
  padding: 16px;
}

.demo-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}

van-button {
  margin: 8px 0;
}

.popup-content {
  padding: 24px;
  text-align: center;
}
</style>
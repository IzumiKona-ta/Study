<template>
  <div class="todo-app">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="Todo List" right-text="清空" @click-right="clearAll" />

    <!-- 输入区域 -->
    <div class="input-area">
      <van-field
          v-model="newTodo"
          placeholder="添加新任务..."
          @keydown.enter="addTodo"
      />
      <van-button type="primary" @click="addTodo">添加</van-button>
    </div>

    <!-- 过滤标签 -->
    <van-tabs v-model:active="filter" @change="onFilterChange">
      <van-tab title="全部">全部</van-tab>
      <van-tab title="进行中">进行中</van-tab>
      <van-tab title="已完成">已完成</van-tab>
    </van-tabs>

    <!-- 任务列表 -->
    <van-cell-group v-if="filteredTodos.length > 0">
      <van-checkbox-group v-model:value="checkedIds">
        <van-cell
            v-for="todo in filteredTodos"
            :key="todo.id"
            :title="todo.text"
            :border="false"
            clickable
            @click="toggleTodo(todo.id)"
        >
          <template #right-icon>
            <van-checkbox :name="todo.id" :checked="todo.completed" />
          </template>
        </van-cell>
      </van-checkbox-group>
    </van-cell-group>

    <!-- 空状态 -->
    <van-empty v-else description="暂无任务" />

    <!-- 底部统计 -->
    <div class="stats" v-if="todos.length > 0">
      <span>剩余任务: {{ remainingCount }}</span>
      <span class="divider">|</span>
      <span>已完成: {{ completedCount }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import {Toast, Dialog, Button, Field, Cell, CellGroup, showToast, showDialog} from 'vant';
// 任务列表数据
const todos = ref([
  { id: 1, text: '学习 Vue 3', completed: false },
  { id: 2, text: '使用 Vant UI', completed: false },
  { id: 3, text: '完成 TodoList 示例', completed: true }
]);

// 新任务输入
const newTodo = ref('');

// 过滤状态 (0: 全部, 1: 进行中, 2: 已完成)
const filter = ref(0);

// 已选择的任务 ID
const checkedIds = computed({
  get() {
    return todos.value.filter(todo => todo.completed).map(todo => todo.id);
  },
  set(ids) {
    todos.value.forEach(todo => {
      todo.completed = ids.includes(todo.id);
    });
  }
});

// 计算属性: 过滤后的任务列表
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 1: // 进行中
      return todos.value.filter(todo => !todo.completed);
    case 2: // 已完成
      return todos.value.filter(todo => todo.completed);
    default: // 全部
      return todos.value;
  }
});

// 计算属性: 剩余任务数量
const remainingCount = computed(() => {
  return todos.value.filter(todo => !todo.completed).length;
});

// 计算属性: 已完成任务数量
const completedCount = computed(() => {
  return todos.value.filter(todo => todo.completed).length;
});

// 添加新任务
const addTodo = () => {
  if (!newTodo.value.trim()) {
    showToast('请输入任务内容');
    return;
  }

  const newTask = {
    id: Date.now(),
    text: newTodo.value.trim(),
    completed: false
  };

  todos.value.unshift(newTask);
  newTodo.value = '';

  // 显示成功提示
  showToast({
    type: 'success', // 指定类型为成功
    message: '任务已添加'
  });
};

// 切换任务状态
const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

// 过滤变更
const onFilterChange = (index) => {
  filter.value = index;
};

// 清空所有任务
const clearAll = () => {
  if (todos.value.length === 0) {
    return;
  }

  showDialog({
    title: '提示',
    message: '确认清空所有任务？',
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
</script>

<style scoped>
.todo-app {
  padding: 16px;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.stats {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  text-align: center;
  background-color: #f7f8fa;
  border-top: 1px solid #e4e7ed;
  font-size: 14px;
  color: #606266;
}

.divider {
  margin: 0 10px;
  color: #c0c4cc;
}
</style>
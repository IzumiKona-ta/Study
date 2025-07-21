<template>
  <div class="apply-page">
    <div class="apply-container">
      <van-form @submit="onSubmit" @validate="onValidate">
        <!-- 姓名 -->
        <van-field
            v-model="form.name"
            name="name"
            label="姓名"
            placeholder="请输入您的姓名"
            required
            :rules="[
            { required: true, message: '请输入姓名' },
            { min: 2, message: '姓名至少2个字符' }
          ]"
        />

        <!-- 手机号 -->
        <van-field
            v-model="form.phone"
            name="phone"
            label="手机号"
            placeholder="请输入您的手机号"
            type="tel"
            required
            :rules="[
            { required: true, message: '请输入手机号' },
            {/* pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' */}
          ]"
        />

        <!-- 图片上传 -->
        <van-uploader
            v-model="form.images"
            :max-count="1"
            :after-read="afterRead"
            accept="image/*"
            upload-text="上传作品图片"
        >
          <template #preview-cover="{ item }">
            <van-button size="mini" text="删除" @click="deleteImage(item)" />
          </template>
        </van-uploader>
        <div class="upload-tip">请上传清晰的作品图片（支持JPG、PNG格式）</div>

        <!-- 提交按钮 -->
        <van-button type="primary" native-type="submit" class="submit-btn">
          提交报名
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';

const form = ref({
  name: '',
  phone: '',
  images: []
});

// 图片上传后处理
const afterRead = (file) => {
  form.value.images = [file.content];
};

// 删除图片
const deleteImage = (item) => {
  form.value.images = form.value.images.filter(img => img !== item);
};

// 表单验证回调
const onValidate = (name, error) => {
  if (error) {
    showToast(error.message);
  }
};

// 提交表单（修复所有错误）
const onSubmit = async () => {
  let loadingInstance = null; // 提升作用域，确保catch可访问
  try {
    // 显示加载提示
    loadingInstance = showToast({
      type: 'loading',
      message: '提交中...',
      forbidClick: true,
      duration: 0 // 持续显示，需手动关闭
    });

    // 构建表单数据
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('phone', form.value.phone);

    // 处理图片（Base64转Blob）
    if (form.value.images.length > 0) {
      const base64 = form.value.images[0];
      const response = await fetch(base64);
      const blob = await response.blob();
      formData.append('image', blob, 'upload.jpg');
    }

    // 发送请求（通过Vite代理绕跨域，路径改为/api）
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    // 处理响应：先判断状态，再解析数据
    if (!response.ok) {
      const errorText = await response.text(); // 读取非JSON响应
      throw new Error(errorText || '请求失败');
    }

    // 尝试解析JSON（防御后端返回非JSON）
    let result;
    try {
      result = await response.json();
    } catch (jsonError) {
      throw new Error(`后端数据格式错误：${jsonError.message}`);
    }

    // 关闭加载 & 提示成功
    loadingInstance.close();
    showToast({
      type: 'success',
      message: result.message || '报名成功！'
    });

    // 重置表单
    form.value = { name: '', phone: '', images: [] };

  } catch (error) {
    // 关闭加载（若存在）
    if (loadingInstance) {
      loadingInstance.close();
    }
    // 提示错误
    showToast({
      type: 'fail',
      message: error.message || '网络错误，请重试'
    });
  }
};
</script>

<style scoped>
.apply-page {
  padding: 20px;
  padding-bottom: 60px; /* 预留底部导航空间 */
}

.apply-container {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.van-field {
  margin-bottom: 16px;
}

.van-uploader {
  margin: 16px 0;
}

.upload-tip {
  font-size: 12px;
  color: #666;
  margin-top: 8px;
  margin-bottom: 20px;
}

.submit-btn {
  margin-top: 20px;
  height: 44px;
  border-radius: 22px;
}
</style>
<template>
  <div class="enroll">
    <!-- 表单：保留原有结构，修复校验和提交逻辑 -->
    <van-form @submit="onSubmit" :validate-trigger="['onChange', 'onBlur']">
      <van-cell-group inset>
        <!-- 名称：修复校验规则（required: true） -->
        <van-field
            v-model="form.name"
            name="name"
            label="名称"
            placeholder="请填写名称"
            :rules="[
            { required: true, message: '请填写名称' }
          ]"
        />

        <!-- 手机：修复校验规则（required: true + 格式校验） -->
        <van-field
            v-model="form.phone"
            name="phone"
            label="手机"
            placeholder="请填写手机"
            type="phone"
            :rules="[
            { required: true, message: '请填写手机号' },
            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
          ]"
        />

        <!-- 文件上传：保留原有结构，绑定到form.images -->
        <van-field name="uploader" label="文件上传">
          <template #input>
            <van-uploader
                v-model="form.images"
                max-count="1"
                :after-read="afterRead"
                accept="image/*"
            />
          </template>
        </van-field>
      </van-cell-group>

      <!-- 提交按钮：保留原有样式 -->
      <div style="margin: 16px;">
        <van-button
            round
            block
            type="primary"
            native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { showSuccessToast, showToast } from 'vant';
import { useRouter } from 'vue-router';

// 1. 统一表单数据管理（替代零散的ref）
const form = ref({
  name: '',
  phone: '',
  images: [] // 存储上传的文件（van-uploader 默认格式）
});
const imageUrl = ref(''); // 后端返回的图片URL
const router = useRouter();

// 2. 图片上传逻辑：先上传到服务器，拿到URL
const afterRead = async (file) => {
  try {
    showToast({ type: 'loading', message: '图片上传中...' });
    const formData = new FormData();
    formData.append('files', file.file); // file.file 是原生文件对象

    // 上传图片到后端（保持你原有的接口）
    const res = await fetch('/api1/upload/picture', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    imageUrl.value = data.url; // 保存后端返回的图片URL
    showToast.clear();
  } catch (err) {
    showToast({ type: 'fail', message: '图片上传失败' });
    console.error('图片上传失败:', err);
  }
};

// 3. 提交报名逻辑：等图片上传完，再提交表单
const onSubmit = async (e) => {
  // e.preventDefault(); // 阻止默认提交

  // 校验图片是否上传（如果必须上传）
  if (form.value.images.length === 0 || !imageUrl.value) {
    return showToast({ type: 'fail', message: '请先上传图片' });
  }

  try {
    showToast({ type: 'loading', message: '提交中...', duration: 0 });

    // 构造请求体（保持你原有的参数）
    const requestBody = JSON.stringify({
      openid: "hujingshan",
      avatar: "",
      name: form.value.name,
      nickname: form.value.name,
      phone: form.value.phone,
      picture: imageUrl.value
    });

    // 提交到后端（保持你原有的接口）
    const res = await fetch('/api1/user/save', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: requestBody
    });
    const data = await res.json();

    if (data.success) {
      showSuccessToast('报名成功');
      setTimeout(() => {
        router.push({ name: 'home' }); // 保持你原有的跳转
        form.value = { name: '', phone: '', images: [] }; // 重置表单
        imageUrl.value = ''; // 重置图片URL
      }, 1000);
    } else {
      showToast({ type: 'fail', message: data.message || '提交失败' });
    }
  } catch (err) {
    showToast({ type: 'fail', message: '网络异常，请重试' });
    console.error('提交失败:', err);
  } finally {
    showToast.clear();
  }
};
</script>

<style scoped>
.enroll {
  padding: 20px;
}
.van-form {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0.1);
}
.van-field {
  margin-bottom: 16px;
}
.van-uploader {
  margin: 16px 0;
}
</style>
<template>
  <div class="sign" :style="{backgroundImage: `url('${backgroundImage}')`}">
    <div class="sign-logo">
      <img :src="logoUrl" />
      <h3>{{ appName }}</h3>
    </div>
    <img class="sign-introduce" :src="introduceImage" draggable="false" v-if="clientWidth > 900" />
    <div class="sign-divider" v-if="clientWidth > 900"></div>
    <div class="sign-form">
      <h2 class="sign-form-title">
        <img :src="require('@/assets/Sign/cube.png')" />
        <span>登录 Sign in to Data Assets</span>
      </h2>
      <el-popover trigger="manual" title="账号不能为空！" width="100" placement="top-start" v-model="accountTip" popper-class="sign-form-popover">
        <template #reference>
          <el-input clearable prefix-icon="User" placeholder="请输入学号/工号" v-model="account" class="sign-form-account" @input="handleInput" @keyup.enter="handleSignIn">
          </el-input>
        </template>
      </el-popover>
      <el-popover trigger="manual" title="密码不能为空！" width="100" placement="top" v-model="passwordTip" popper-class="sign-form-popover">
        <template #reference>
          <el-input clearable show-password prefix-icon="Key" placeholder="默认身份证后六位" v-model="password" class="sign-form-password" @input="handleInput" @keyup.enter="handleSignIn">
          </el-input>
        </template>
      </el-popover>
      <button class="sign-form-submit" @click="handleSignIn">
        <i class="el-icon-loading" v-if="loading"></i>
        <span>登录</span>
      </button>
    </div>
    <h6 class="sign-copyright">© 2020 {{copyright}}</h6>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getBasic, getPicUrl } from "@/api/config";
import { ElMessage } from "element-plus";
const copyright = ref("上海树维信息科技有限公司");
const backgroundImage = ref(require("@/assets/Sign/background.png"));
const logoUrl = ref(require("@/assets/Common/logo.png"));
const introduceImage = ref(require("@/assets/Sign/introduce.png"));
const appName = ref((window as any).config.VUE_APP_NAME);
const account = ref("");
const accountTip = ref(false);
const password = ref("");
const passwordTip = ref(false);
const loading = ref(false);
const clientWidth = ref(2000);

const store = useStore();
// 获取背景图
const handleGetBackground = () => {
  getBasic().then((res: any) => {
    if (res.status === 200) {
      logoUrl.value = res.data.logoPath
        ? getPicUrl(res.data.logoPath)
        : logoUrl.value;
      store.commit("SET_BASIC_DATA", res.data);
      copyright.value = res.data.copyright || "上海树维信息科技有限公司";
    }
  });
};
const handleResize = () => {
  clientWidth.value = document.body.clientWidth;
};
// 输入
const handleInput = () => {
  accountTip.value = false;
  passwordTip.value = false;
};

const router = useRouter();
// 点击登录
const handleSignIn = () => {
  if (account.value.length === 0) {
    accountTip.value = true;
    setTimeout(() => {
      accountTip.value = false;
    }, 2000);
  } else if (password.value.length === 0) {
    passwordTip.value = true;
    setTimeout(() => {
      passwordTip.value = false;
    }, 2000);
  } else {
    loading.value = true;
    store
      .dispatch("login", {
        username: account.value,
        password: password.value,
      })
      .then(() => {
        router.push({
          path: "/",
          query: { t: Date.now() },
        });
        loading.value = false;
      })
      .catch(() => {
        ElMessage.error("登录失败，请检查账号密码是否输入正确。");
        loading.value = false;
      });
  }
};
//vue实例化后，模板挂载
handleGetBackground();
//dom初始化后
onMounted(() => {
  clientWidth.value = document.body.clientWidth;
  window.addEventListener("resize", handleResize);
});
//dom销毁时
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

</script>
<style lang="scss">
@import "@/styles/variables.scss";
.sign {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  &-logo {
    position: absolute;
    top: 2vw;
    left: 2vw;
    display: flex;
    align-items: center;
    color: #fff;
    > img {
      width: 45px;
      height: 45px;
      margin-right: 20px;
    }
    > h3 {
      font-size: 24px;
    }
  }
  &-introduce {
    width: 35vw;
    object-fit: cover;
  }
  &-divider {
    width: 1px;
    height: 35vh;
    background-color: rgba($color: #fff, $alpha: 0.1);
    margin: 0 5vw;
  }
  &-form {
    width: 400px;
    &-title {
      position: relative;
      color: #fff;
      margin-bottom: 60px;
      > img {
        position: absolute;
        top: -15px;
        left: -15px;
        width: 30px;
        height: 30px;
        object-fit: contain;
      }
    }
    &-popover {
      .el-popover__title {
        text-align: center;
        font-size: $font-size-small;
        margin-bottom: 0;
      }
    }
    &-account,
    &-password,
    &-submit {
      width: 100%;
    }
    &-account,
    &-password {
      margin-bottom: 20px;
    }
    &-submit {
      height: 36px;
      color: #fff;
      border: none;
      outline: none;
      transition: $transition-primary;
      border-radius: 4px;
      cursor: pointer;
      background-image: linear-gradient(
        30deg,
        rgb(0, 102, 204) 0%,
        rgb(51, 204, 255) 100%
      );
      &:active {
        opacity: 0.8;
      }
      i {
        margin-right: 4px;
      }
    }
  }
  &-copyright {
    position: fixed;
    bottom: 10px;
    color: rgba($color: #fff, $alpha: 0.7);
    text-align: center;
    // font-size: $font-size-base;
    line-height: 14px;
  }
}
</style>
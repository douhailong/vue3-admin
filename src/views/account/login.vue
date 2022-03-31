<template>
  <div class="account">
    <div class="form-wrap">
      <a-form>
        <a-form ref="formRef" v-model="Form_data">
          <a-form-item name="username">
            <label>用户名</label>
            <a-input v-model:value="Form_data.username" />
          </a-form-item>
          <a-form-item name="password">
            <label>密码</label>
            <a-input v-model:value="Form_data.password" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="aa" block>登录</a-button>
          </a-form-item>
        </a-form>
      </a-form>
    </div>
  </div>
</template>
<script>
import { setToken, setUsername } from "@/utils/cookies";
import { Login } from "@/api/account.js"
import { message } from "ant-design-vue";
import { useRouter } from "vue-router"
import { reactive, toRefs } from 'vue';
export default {
  name: "Login",
  components: {},
  setup() {
    const {push,replace} = useRouter();
    const data = reactive({
      Form_data: {
        username: "17752648710",
        password: "123qwe"
      }
    })
    const aa = () => {
      const requestData = {
        username: data.Form_data.username,
        password: data.Form_data.password,
      }
      //登录接口
      Login(requestData).then(res => {
        const data = res.content
        setToken(data.token)
        setUsername(data.username)
        //进入后台
        push({
          name: 'Home'
        })

      }).catch(err => {
        message.error('data.message');
      })
    };
    return {
      ...toRefs(data),
      aa
    };
  }
}
</script>
<style lang="scss" scoped>
.account {
  width: 100vm;
  height: 100vh;
  background-color: #282828;
}
.form-wrap {
  width: 285px;
  margin: auto;
  padding-top: 100px;
  color: #fff;
  label {
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }
}
</style>

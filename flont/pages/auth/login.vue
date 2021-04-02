<template>
  <v-container>
    <form-card title="ログイン">
      <v-form>
        <email-input :email.sync="user.email" :disabled="disabled" />
        <password-input :password.sync="user.password" :disabled="disabled" />
        <v-card-actions>
          <v-btn class="info" @click="submit" :disabled="disabled"
            >ログイン</v-btn
          >
        </v-card-actions>
      </v-form>
    </form-card>
    <transition
      ><v-alert
        v-if="error"
        border="right"
        colored-border
        type="error"
        elevation="2"
      >
        {{ error }}
      </v-alert></transition
    >
  </v-container>
</template>

<script>
import emailInput from "../../components/form/emailInput.vue";
import FormCard from "../../components/form/formCard.vue";
import PasswordInput from "../../components/form/passwordInput.vue";

export default {
  components: { emailInput, PasswordInput, FormCard },
  data() {
    return {
      error: "",
      disabled: false,
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async submit() {
      const user = this.user;
      this.disabled = true;
      if (!user.email || !user.password) {
        this.disabled = false;
        this.error = "すべての欄に入力してね";
        return;
      }

      this.$auth
        .loginWith("local", {
          data: this.user
        })
        .catch(e => {
          this.error = "パスワードまたはEmailが間違ってます";
          this.disabled = false;
        });
    }
  }
};
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>

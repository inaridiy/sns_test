<template>
  <v-container>
    <form-card title="登録">
      <v-form>
        <email-input :email.sync="user.email" :disabled="disabled" />
        <name-input :name.sync="user.name" :disabled="disabled" />
        <id-input :id.sync="user.id" :disabled="disabled" />
        <password-input :password.sync="user.password" :disabled="disabled" />
        <v-card-actions>
          <v-btn class="info" @click="submit" :disabled="disabled">登録</v-btn>
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
import IdInput from "../../components/form/idInput.vue";
import NameInput from "../../components/form/nameInput.vue";
import PasswordInput from "../../components/form/passwordInput.vue";

export default {
  components: { emailInput, PasswordInput, FormCard, NameInput, IdInput },
  data() {
    return {
      error: "",
      disabled: false,
      user: {
        email: "",
        id: "",
        name: "",
        password: ""
      }
    };
  },
  methods: {
    async submit() {
      const user = this.user;
      this.disabled = true;
      if (!user.email || !user.id || !user.name || !user.password) {
        this.disabled = false;
        this.error = "すべての欄に入力してね";
        return;
      }

      this.$axios
        .post("/auth/register", this.user)
        .then(response => {
          this.$auth.loginWith("local", {
            data: this.user
          });
        })
        .catch(e => {
          this.error = "既に登録されているidまたはemailです。";
          this.disabled = false;
          return;
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

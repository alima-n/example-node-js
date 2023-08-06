<template>
  <v-layout wrap justify-center>
    <v-flex sm12 md6>
      <v-card elevation="4" light tag="section">
        <v-card-title>
          <v-layout align-center justify-space-between>
            <h3 class="headline">This is an example app</h3>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form v-model="isFormValid" ref="form" @submit.prevent="">
            <v-text-field v-model="username" :rules="[rules.required]" outline label="Username" type="text" />
            <v-text-field
              v-model.trim="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              outline
              label="Password"
              :rules="[rules.required, rules.min]"
              @click:append="showPassword = !showPassword"
            />
            <v-text-field
              v-if="isSignup"
              v-model.trim="confirmPassword"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirmPassword ? 'text' : 'password'"
              outline
              label="Confirm password"
              :rules="[rules.required, rules.confirmPassword]"
              @click:append="showConfirmPassword = !showConfirmPassword"
            />
          </v-form>
          <p class="text-start error--text">{{ errorMessage }}</p>
          <p v-if="!isSignup">
            Don't have an account?
            <router-link :to="{ name: 'signup' }" class="green--text">Sign up for free.</router-link>
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
          <router-link v-if="isSignup" :to="{ name: 'login' }" class="green--text">Sign in</router-link>
          <v-spacer></v-spacer>
          <v-btn
            color="info"
            type="submit"
            :large="$vuetify.breakpoint.smAndUp"
            :disabled="!isFormValid"
            @click="submit"
          >
            <v-icon left>lock</v-icon>
            {{ isSignup ? 'Sign up' : 'Sign in' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import router from '../router'

export default defineComponent({
  name: 'AuthForm',
  props: {
    isSignup: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      isFormValid: false,
      rules: {
        required: (v) => !!v || 'Required.',
        min: (v) => (v && v.length >= 8) || 'Min 8 characters',
        confirmPassword: (v) => v === this.password || 'The password confirmation does not match.',
      },
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$emit('submit', {
          username: this.username,
          password: this.password,
        })
      }
    },
    clear() {
      this.$refs.form.reset()
    },
  },
  watch: {
    isSignup() {
      this.clear()
    },
  },
  components: { router },
})
</script>

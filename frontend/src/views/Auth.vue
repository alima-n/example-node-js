<template>
  <AuthForm :is-signup="isSignup" :error-message="errorMessage" @submit="onSubmit" />
</template>

<script>
import axios from '@/axios'

import { defineComponent } from '@vue/composition-api'

import AuthForm from '@/components/AuthForm.vue'
import parseJwt from '@/utils/parseJwt'

export default defineComponent({
  name: 'Auth',
  components: { AuthForm },
  props: {
    isSignup: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    errorMessage: '',
  }),
  methods: {
    setTokenData(token) {
      const { exp } = parseJwt(token)      

      localStorage.setItem('access_token', token)
      localStorage.setItem('access_token_exp', exp)
    },
    async onSubmit(formData) {
      this.errorMessage = ''

      try {
        const { data } = await axios.post(this.isSignup ? 'signup' : 'login', formData)

        this.setTokenData(data.token)
        this.$router.push({ name: 'devices' })
        this.$emit('login')
      } catch (error) {
        this.errorMessage = (error.response && error.response.data.message) || error.message
      }
    },
  },
  watch: {
    isSignup() {
      this.errorMessage = ''
    },
  },
})
</script>

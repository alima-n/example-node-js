<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on" elevation="2" small> Add new Raspberry Pi </v-btn>
    </template>
    <v-card>
      <v-container>
        <v-form v-model="isFormValid" ref="form" @submit.prevent="">
          <v-text-field v-model="form.name" :rules="[rules.required]" outline label="Name" type="text" />
          <v-text-field
            v-model="form.publicIP"
            :rules="[rules.required, rules.IP]"
            outline
            label="Public IP"
            type="text"
          />
          <v-text-field v-model="form.privateIPs" :rules="[rules.required]" outline label="Private IPs" type="text" />
          <v-select v-model="form.model" :items="models" :rules="[rules.required]" label="Model"></v-select>
          <v-text-field
            v-model="form.serialNumber"
            :rules="[rules.required]"
            outline
            label="Serial number"
            type="text"
          />
          <p class="text-start error--text">{{ errorMessage }}</p>
        </v-form>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" small text @click="onClose"> Close </v-btn>
        <v-btn color="primary" elevation="2" small @click="onSaveClick" type="submit" :disabled="!isFormValid">
          Save Raspberry Pi
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from '@/axios'

const formInitialState = {
  _id: '',
  name: '',
  publicIP: '',
  privateIPs: '',
  model: '',
  serialNumber: '',
}

export default {
  props: {
    dialogVisible: Boolean,
    device: {
      type: Object,
      default: () => ({ ...formInitialState }),
    },
  },
  data() {
    return {
      dialog: false,
      form: {
        ...formInitialState,
      },
      models: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      isFormValid: false,
      rules: {
        required: (v) => !!v || 'Required.',
        IP: (v) => {
          const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/
          return ipRegex.test(v) || 'Invalid IP address.'
        },
      },
      errorMessage: '',
    }
  },
  methods: {
    clear() {
      this.$refs.form.reset()
    },
    onClose() {
      this.dialog = false
      this.clear()
      this.$emit('close')
    },
    async onSaveClick() {
      if (this.$refs.form.validate()) {
        this.errorMessage = ''

        try {
          if (this.device) {
            const { data } = await axios.put(`devices/${this.device._id}`, this.form)
            this.$emit('updated', data)
          } else {
            delete this.form._id
            await axios.post('devices', this.form)
            this.$emit('created')
          }

          this.onClose()
        } catch (error) {
          this.errorMessage = (error.response && error.response.data.message) || error.message
        }
      }
    },
  },
  onMounted() {
    this.clear()
    this.dialog = this.dialogVisible
  },
  watch: {
    dialogVisible() {
      this.dialog = this.dialogVisible
    },
    device: {
      handler() {
        this.form = { ...this.device }
      },
      deep: true,
    },
  },
}
</script>

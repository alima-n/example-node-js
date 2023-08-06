<template>
  <div>
    <h1>My Raspberry Pis</h1>
    <p v-if="!devices.length && !loading" class="text--left">You have not added any Raspberry Pi yet.</p>

    <div class="mb-8">
      <NewRaspberryPiDialog
        :dialogVisible="dialogVisible"
        :device="editingDevice"
        @created="getDevices"
        @updated="updateDevice"
        @close="onDialogClose"
      />
    </div>
    <v-row class="justify-space-between">
      <v-col v-if="loading" cols="12" md="4" v-for="c in 3" :key="c">
        <v-skeleton-loader v-for="n in 3" :key="n" type="article, actions" class="mb-6" elevation="2" />
      </v-col>
    </v-row>

    <v-row :class="{ 'card-container': !loading }">
      <v-card
        v-if="!loading && devices.length > 0"
        v-for="(device, idx) in devices"
        :key="idx"
        class="card-container__item"
      >
        <v-card-title>
          <span class="text-h6">{{ device.name }}</span>
        </v-card-title>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-for="key in Object.keys(device)" :key="key">
                <td class="text-left">{{ keys[key] }}</td>
                <td class="text-left">{{ device[key] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" elevation="2" small @click="onEditClick(device)"> Edit </v-btn>
          <v-btn color="error" elevation="2" small @click="onDeleteClick(device._id)"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import axios from '@/axios'
import NewRaspberryPiDialog from '@/components/NewRaspberryPiDialog.vue'

export default {
  components: {
    NewRaspberryPiDialog,
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      devices: [],
      keys: {
        _id: 'ID',
        name: 'Name',
        publicIP: 'Public IP',
        privateIPs: 'Private IPs',
        model: 'Model',
        serialNumber: 'Serial Number',
      },
      editingDevice: null,
    }
  },
  methods: {
    getDevices() {
      if (this.loading) return

      this.loading = true

      axios.get('devices').then(({ data }) => {
        this.devices = data
      })

      setTimeout(() => {
        this.loading = false
      }, 800)
    },
    onDialogClose() {
      this.dialogVisible = false
      this.editingDevice = null
    },
    onEditClick(device) {
      this.editingDevice = device
      this.dialogVisible = true
    },
    onDeleteClick(id) {
      try {
        axios.delete(`devices/${id}`)
        this.devices = this.devices.filter((device) => device._id !== id)
      } catch (error) {
        console.log(error)
      }
    },
    updateDevice(device) {
      this.devices = this.devices.map((d) => (d._id === device._id ? device : d))
    },
  },
  mounted() {
    this.getDevices()
  },
}
</script>

<style>
.card-container {
  column-gap: 24px;
  row-gap: 24px;
}

.card-container__item {
  width: calc(33% - 24px);
}
</style>

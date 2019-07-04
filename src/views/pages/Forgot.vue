<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
            <b-alert :show="checkSuccess" variant="success">К вам на эл. почту было отправлено писмо с инструкциями</b-alert>
            <b-alert :show="checkEmail" variant="danger">Такой email не найден</b-alert>

            <b-card-group>
                <b-card no-body class="p-sm-4">
                    <b-card-body>
                        <b-form>
                        <h3>Восстановить пароль</h3>
                        <p class="text-muted">Восстановите в свой пароль</p>
                        <b-input-group class="mb-4">
                            <b-input-group-prepend><b-input-group-text>@</b-input-group-text></b-input-group-prepend>
                            <b-form-input type="text" class="form-control" placeholder="Email" autocomplete="email" v-model="email" />
                        </b-input-group>
                        <b-row>
                            <b-col cols="6">
                                <b-button variant="secondary" to="login" class="px-4" @click="restorePassword">Назад</b-button>
                            </b-col>
                            <b-col cols="6" class="text-right">
                                <b-button variant="primary" class="px-sm-4 px-3" @click="restorePassword">Восстановить</b-button>
                            </b-col>
                        </b-row>
                        </b-form>
                    </b-card-body>
                </b-card>
            </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Forgot',
  data() {
      return {
          email: '',
          checkEmail: false,
          checkSuccess: false
      }
  },
  methods: {
      restorePassword() {
            this.$store.dispatch('auth/restorePassword', this.email).then(res => {
                if(res.data.status == 200) {
                    this.email = ''
                    this.checkEmail = false
                    this.checkSuccess = true
                } else if(res.data.status == 201) {
                    this.checkEmail = true
                    this.checkSuccess = false
                }
                else {
                }
                console.log(res)
            }, err => {
                console.error(err)
            })
      }
  }
}
</script>

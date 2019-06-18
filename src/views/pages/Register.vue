<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form @submit.prevent="onSubmit">
                <h1>Регистрация</h1>
                <p class="text-muted">Создать свой аккаунт</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" class="form-control" v-model="data.username" placeholder="Имя пользователя в Instagram" autocomplete="username" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>@</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="text" v-model="data.email" class="form-control" placeholder="Email" autocomplete="email" />
                </b-input-group>

                <b-input-group class="mb-3">
                    <b-input-group-prepend>
                        <b-input-group-text><i class="icon-phone"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <vue-tel-input
                            v-model="data.phoneNumber"
                            placeholder="Укажите ваш номер телефона"
                            :preferredCountries="['kz']"
                            class="form-control">
                    </vue-tel-input>
                </b-input-group>

                <b-input-group class="mb-3">
                    <b-input-group-prepend>
                        <b-input-group-text><i class="icon-wrench"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-select
                        :plain="true"
                        v-model="data.type"
                        :options="[
                        {
                        text: 'Free',
                        value: 'free'
                        }, {
                        text: 'Premium',
                        value: 'premium'
                        }, {
                        text: 'Vip',
                        value: 'vip'
                        }]">
                    </b-form-select>
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="password" v-model="data.password" class="form-control" placeholder="Пароль" autocomplete="new-password" />
                </b-input-group>

                <b-button type="submit" variant="success" block>Создать аккаунт</b-button>
              </b-form>
            </b-card-body>
            <b-card-footer class="p-4">
              <b-row>
                <b-col cols="6">
                  <b-button block class="btn btn-facebook"><span>facebook</span></b-button>
                </b-col>
                <b-col cols="6">
                  <b-button block class="btn btn-twitter" type="button"><span>twitter</span></b-button>
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import VueTelInput from 'vue-tel-input'

export default {
    name: 'Register',
    data() {
        return {
            data: {
                username: '',
                email: '',
                phoneNumber: '+7',
                type: 'premium',
                password: '',
            }
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch('auth/checkUsername', this.data.username).then(response => {
                console.log("Got some data, now lets show something in this component")
            }, error => {
                console.error("Got nothing from server. Prompt user to check internet connection and try again")
            })
        }
    },
    components: {
        VueTelInput
    }
}
</script>

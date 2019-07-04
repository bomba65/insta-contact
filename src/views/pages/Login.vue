<template>
  <div class="app flex-row align-items-center">
    <Loading v-if="loading" />
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
            <b-alert :show="checkSuccess" variant="danger">Вы ввели неверный email или пароль!</b-alert>
            <b-card-group v-loading="loading">
                <b-card no-body class="p-4">
                    <b-card-body>
                        <b-form @submit.prevent="onSubmit">
                            <h1>Вход</h1>
                            <p class="text-muted">Войдите в свой аккаунт</p>
                            <b-input-group class="mb-3">
                                <b-input-group-prepend><b-input-group-text>@</b-input-group-text></b-input-group-prepend>
                                <b-form-input type="text" class="form-control" placeholder="Email" autocomplete="email"
                                        v-model="data.email"
                                        v-validate="'required|email'" 
                                        :state="validateState('email')"
                                        name="email" />
                                <b-form-invalid-feedback>
                                    Это обязательное поле и должен быть действительный адрес электронной почты
                                </b-form-invalid-feedback>
                            </b-input-group>
                            <b-input-group class="mb-4">
                                <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                                <b-form-input type="password" class="form-control" placeholder="Password" 
                                    autocomplete="password"
                                    v-model="data.password"
                                    v-validate="'required|alpha_dash|min:5|max:15'" 
                                    :state="validateState('password')"
                                    name="password" />
                                <b-form-invalid-feedback>
                                    Это обязательное поле и должно содержать не менее 5 и максимум 15 символов.
                                </b-form-invalid-feedback>	
                            </b-input-group>
                            <b-row>
                                <b-col cols="6">
                                <b-button type="submit" :disabled="veeErrors.any()" variant="primary" class="px-4">
                                    Вход
                                </b-button>
                                </b-col>
                                <b-col cols="6" class="text-right">
                                <b-button variant="link" to="/forgot" class="px-0">Забыл пароль?</b-button>
                                </b-col>
                            </b-row>
                        </b-form>
                    </b-card-body>
                </b-card>
                <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
                <b-card-body class="text-center">
                    <div>
                    <h2>Регистрация</h2>
                    <p>С Instacontact ваши последователи могут отправлять вам сообщения непосредственно в Whatsapp, Viber, Telegram, не сохраняя ваш номер в контактах.</p>
                    <b-button variant="primary" to="/register"  class="active mt-3">Зарегистрироваться!</b-button>
                    </div>
                </b-card-body>
                </b-card>
            </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

import { Validator } from 'vee-validate'

import Loading from '@/components/Loading/Loading'

export default {
    name: 'Login',
    data() {
        return {
            data: {
                email: '',
                password: ''
            },
            checkSuccess: false,
            loading: false
        }
    },
    methods: {
        validateState(ref) {
			if (
			this.veeFields[ref] &&
			(this.veeFields[ref].dirty || this.veeFields[ref].validated)
			) {
			return !this.veeErrors.has(ref)
			}
			return null
		},
        onSubmit() {
            this.$validator.validateAll().then((result) => {
				if (!result) {
					return
				}
                
                this.loading = true

				this.$store.dispatch('auth/login', this.data).then(res => {
					if(res.data.status == 200) {
                        this.$router.push('links')
                        this.checkSuccess = false
					}
					else {
                        this.checkSuccess = true
                    }
                    this.loading = false
					console.log(res)
				}, err => {
					console.error(err)
				})
			})
        }
    },
    components: {
        Loading
    }
}
</script>
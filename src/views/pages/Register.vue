<template>
  <div class="app flex-row align-items-center">
    <Loading v-if="loading" />
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
            <b-alert dismissible
                     show
                     variant="success" class="mx-4">
                <h4 class="alert-heading">Отлично!</h4>
                <hr>
                <p class="mb-0">
                    На вашу эл. почту было отправлено письмо с дальнейшими инструкциями. Следуйте этим интрукциям и закончите регистрацию. 
                </p>

                <router-link to="login">Перейти на страницу входа</router-link>
            </b-alert>

            <b-card no-body class="mx-4">
                <b-card-body class="p-4">
                    <b-form @submit.prevent="onSubmit">
                        <h1>Регистрация</h1>
                        <p class="text-muted">Создать свой аккаунт</p>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input 
                                name="username"
                                type="text"
                                :state="validateState('username')" 
                                class="form-control" 
                                v-model="data.username"
                                v-validate="'required|alpha_dash|min:5'"
                                placeholder="Имя пользователя в Instagram" 
                                autocomplete="username" />
                            <b-form-invalid-feedback>
                                Это обязательное поле и должно содержать не менее 5 символов.
                            </b-form-invalid-feedback>	
                            <b-form-invalid-feedback v-if='checkUsername'>
                                Данное имя пользователя уже занято!
                            </b-form-invalid-feedback>
                        </b-input-group>

                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-input-group-text>@</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input type="text" 
                                v-model="data.email" 
                                class="form-control" 
                                placeholder="Email" 
                                autocomplete="email"
                                v-validate="'required|email'" 
                                :state="validateState('email')"
                                name="email" />
                            <b-form-invalid-feedback>
                                Это обязательное поле и должен быть действительный адрес электронной почты
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-if='checkEmail'>
                                Данный email уже занят!
                            </b-form-invalid-feedback>
                        </b-input-group>

                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-input-group-text><i class="icon-phone"></i></b-input-group-text>
                            </b-input-group-prepend>
                            <vue-tel-input
                                v-model="data.phone"
                                placeholder="Укажите ваш номер телефона"
                                :preferredCountries="['kz']"
                                class="form-control"
                                v-validate="'required'" 
                                :state="validateState('email')"
                                name="phone">
                            </vue-tel-input>
                            <b-form-invalid-feedback>
                                Это обязательное поле.
                            </b-form-invalid-feedback>
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
                        <b-form-input 
                                type="password" 
                                v-model="data.password" 
                                class="form-control" 
                                placeholder="Пароль" 
                                autocomplete="password"
                                v-validate="'required|alpha_dash|min:5|max:15'" 
                                :state="validateState('password')"
                                name="password" />
                            <b-form-invalid-feedback>
                                Это обязательное поле и должно содержать не менее 5 и максимум 15 символов.
                            </b-form-invalid-feedback>	
                        </b-input-group>

                        <b-button type="submit" :disabled="veeErrors.any()" variant="success" block>Создать аккаунт</b-button>
                    </b-form>
                </b-card-body>
            </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import VueTelInput from 'vue-tel-input'
import { Validator } from 'vee-validate'

import Loading from '@/components/Loading/Loading'

export default {
    name: 'Register',
    data() {
		return {
            data: {
                email: '',
                password: '',
                phone: '+7',
                username: '',
                type: 'premium',
			},
            checkUsername: false,
            checkEmail: false,
            showSuccessAlert: false,
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
				this.$store.dispatch('auth/checkUsername', this.data.username).then(res => {
					if(res.data.status == 200) {
                        this.checkUsername = false
                        
                        this.$store.dispatch('auth/register', this.data).then(res => {
                            if(res.data.status == 200) {
                                this.checkEmail = false
                                this.showSuccessAlert = true
                            } else if(res.data.status == 202) {
                                this.checkEmail = true
                                this.data.email = ''
                            }

                            this.loading = false
                            console.log(res)
                        }, err => {
                            console.log(err)
                        })
					}
					else {
                        this.checkUsername = true
                        this.data.username = ''
                        this.loading = false
                    }
					console.log(res)
				}, err => {
					console.error(err)
				})
			})
		},
	},
    components: {
        VueTelInput,
        Loading
    }
}
</script>

<template>
	<section class="section-settings">
		<div class="container-fluid">
            <h2>Настройки</h2>
            <b-tabs>
                <b-tab title="Дизайн" active>
                    <b-row class="margin-minus">
                        <b-col md="5">
                            <div class="marvel-device iphone6 mx-auto">
                                <div class="top-bar"></div>
                                <div class="sleep"></div>
                                <div class="volume"></div>
                                <div class="camera"></div>
                                <div class="sensor"></div>
                                <div class="speaker"></div>
                                <div class="screen page" :class="design">
                                    <div>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis hic, laudantium modi accusamus voluptatem laborum quae optio molestias voluptate quas nesciunt, iste nihil magnam doloribus autem omnis repellat quidem eos!
                                    </div>
                                    <div class="mt-2">
                                        <a href="javascript:void(0)">Ссылка</a>
                                    </div>
                                    <div class="mt-2">
                                        <b-button variant="primary">Кнопка</b-button>
                                    </div>
                                </div>
                                <div class="home"></div>
                                <div class="bottom-bar"></div>
                            </div>
                        </b-col>
                        <b-col md="7" class="margin-plus mt-md-0 mt-4">
                            <b-row class="theme-list">
                                <b-col sm="6" xl="4">
                                    <div class="theme-item default" :class="{ active : activeTheme == 'default' }" @click="setDesign('default')">
                                        <div>Текст</div>
                                        <div class="link my-1">Ссылка</div>
                                        <div>
                                            <b-button variant="primary">Кнопка</b-button>
                                        </div>
                                    </div>
                                </b-col>
                                <b-col sm="6" xl="4">
                                    <div class="theme-item red" :class="{ active : activeTheme == 'red' }" @click="setDesign('red')">
                                        <div>Текст</div>
                                        <div class="link my-1">Ссылка</div>
                                        <div>
                                            <b-button variant="primary">Кнопка</b-button>
                                        </div>
                                    </div>
                                </b-col>
                                <b-col sm="6" xl="4">
                                    <div class="theme-item dark" :class="{ active : activeTheme == 'dark' }" @click="setDesign('dark')">
                                        <div>Текст</div>
                                        <div class="link my-1">Ссылка</div>
                                        <div>
                                            <b-button variant="primary">Кнопка</b-button>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Общие"></b-tab>
                <b-tab title="Товары"></b-tab>
            </b-tabs>
		</div>
    </section>
</template>

<script>

export default {
	name: 'Settings',
	data() {
		return {
            activeTheme: 'default',

		};
	},
	computed: {
		design: {
			get() {
                this.activeTheme = this.$store.getters['settings/getDesign']
				return this.$store.getters['settings/getDesign']
			}
		},
	},
	methods: {
        setDesign(theme) {
            this.activeTheme = theme
            this.$store.commit('settings/setDesign', theme)
        }
    },
}
</script>

<style scoped lang='scss'>
	.theme-list {
        .theme-item {
            cursor: pointer;
            padding: 15px 0;
            transition: 0.2s;
            text-align: center;
            border: 2px solid transparent;

            .link {
                color: #20a8d8;
            }

            &.active, &:hover {
                border: 2px solid #20a8d8;
            }
            &.red {
                color: rgb(253, 106, 98);

                .link {
                    color: rgb(253, 106, 98);;
                }
            }

            &.dark {
                color: #fff;
                background: #545657 !important;
            }
        }
    }
</style>
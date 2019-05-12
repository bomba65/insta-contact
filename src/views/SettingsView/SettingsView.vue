<template>
	<section class="section-settings">
		<div class="container-fluid">
            <h2>Настройки</h2>
            <b-tabs>
                <b-tab title="Дизайн" active>
                    <b-row>
                        <b-col sm="5">
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
                                    <a href="#">asdas</a>
                                </div>
                                <div class="home"></div>
                                <div class="bottom-bar"></div>
                            </div>
                        </b-col>
                        <b-col sm="7">
                            <b-row class="theme-list">
                                <b-col sm="2" class="theme-item default" :class="{ active : activeTheme == 'default' }" @click="setDesign('default')">
                                    <div>Текст</div>
                                    <a href="#">Ссылка</a>
                                </b-col>
                                <b-col sm="2" class="theme-item red"  :class="{ active : activeTheme == 'red' }" @click="setDesign('red')">
                                    <div>Текст</div>
                                    <a href="#">Ссылка</a>
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
            text-align: center;
            border: 2px solid transparent;

            &.active {
                border: 2px solid #5cb85c;
            }
            &.red {
                color: rgb(253, 106, 98);
            }
        }
    }
</style>
<template>
	<div>
		<label>Текст ссылки</label>
  		<b-form-input type="text" v-model="data.linkText" :placeholder="'Например: Написать в ' + data.name" class="mb-3"></b-form-input>

		<label>Имя пользователя</label>
  		<b-form-input type="text" v-model="data.userName" placeholder="Имя пользователя" class="mb-3"></b-form-input>

        <div>
            Как получить ссылку: <span id="lineTooltip1" class="text-danger">Line@</span> / <span id="lineTooltip2" class="text-danger">Line</span>
            <b-tooltip target="lineTooltip1">
                Откройте Line@> Выберите аккаунт > Найти новых друзей > Выберите URL-адрес > Копировать
            </b-tooltip>
            <b-tooltip target="lineTooltip2">
                Откройте Line> Пригласить друзей > Пригласить > Поделиться > Выберите любой мессенджер или email > Скопируйте ссылку из сообщения
            </b-tooltip>
        </div>
	</div>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	props: {
		data: {
			type: Object,
		}
	},
}
</script>
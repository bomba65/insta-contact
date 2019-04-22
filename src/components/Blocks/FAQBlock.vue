<template>
    <div>
        <div role="tablist">
            <b-card no-body class="mb-1" v-for="question in data.questions">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle.accordion1 variant="info">{{ question.title }}</b-btn>
            </b-card-header>
            <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                <p class="card-text">
                    I start opened because <code>visible</code> is <code>true</code>
                </p>
                <p class="card-text">
                    {{ text }}
                </p>
                </b-card-body>
            </b-collapse>
            </b-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'faq-block',
        data() {
            return {

            }
        },
        props: ['data'],
        methods: {
        },
    }
</script>

<style scoped>
</style>
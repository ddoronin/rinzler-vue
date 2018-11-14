<template>
    <article class="terminal">
        <h2>{{$route.params.db}} {{$route.params.collection}}</h2>
        <section>
            {{ this.items }}
        </section>
    </article>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import { State, Action, namespace } from 'vuex-class';

    const collections = namespace('terminal');

    type top10Params = {db: string, collection: string};
    @Component
    export default class Terminal extends Vue {
        @collections.State('items') items!: any;
        @collections.Action('top10') top10!: (params: top10Params) => void;

        mounted() {
            const {db, collection} = this.$route.params;
            this.top10({db, collection});
        }
    }
</script>

<style>

</style>

<template>
    <article class="collections">
        <h2>Collections: {{$route.params.db}}</h2>
        <section>
            <ul class="col-list">
                <li class="col-item" v-for="col in collections" :key="col">
                    <div class="name">
                        <router-link :to="'/' + $route.params.db + '/' + col">{{ col }}</router-link>
                    </div>
                </li>
            </ul>
        </section>
    </article>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import { State, Action, namespace } from 'vuex-class';
    import { DBList } from '@/store/modules/databases';

    const collections = namespace('collections');

    @Component
    export default class Dashboard extends Vue {
        @collections.State('list') collections!: DBList;
        @collections.Action('refresh') refresh!: (db: string) => void;

        mounted() {
            this.refresh(this.$route.params.db);
        }
    }
</script>
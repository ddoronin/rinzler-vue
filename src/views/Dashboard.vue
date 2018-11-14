<template>
    <article class="dashboard">
        <h2>Dashboard</h2>
        <section>
            <p>List of databases.</p>
            <ul class="db-list">
                <li class="db-item" v-for="db in dblist" :key="db.name">
                    <div class="name">
                        <router-link :to="'/' + db.name">{{ db.name }}</router-link>
                    </div>
                    <div class="size">{{ db.sizeOnDisk }}</div>
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

    const databases = namespace('databases');

    @Component
    export default class Dashboard extends Vue {
        @databases.State('list') dblist!: DBList;
        @databases.Action('refresh') refresh!: () => void;

        mounted() {
            this.refresh();
        }
    }
</script>

<style lang="scss">
    .dashboard {
        .db-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin: 0;
            padding: 0;
            list-style: none;
            text-align: left;

            .db-item {
                width: 100px;
                height: 50px;

                .size {
                    font-size: x-small;
                }
            }
        }
    }
</style>

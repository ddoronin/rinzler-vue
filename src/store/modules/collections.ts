import { RootState } from '../index';
import { Module } from 'vuex';
import { IDBCol, DBCollectionsRequest, DBCollections } from '../../dto/DBCollections';
import { Response } from '../../dto/Response';
import { api } from '@/api/data';
import { first } from 'rxjs/operators';

export type Cols = IDBCol[];
export type ColState = {list: Cols};
const state: ColState = {list: []};

export const collections: Module<ColState, RootState> = {
    namespaced: true,
    state,
    getters: {
    },
    actions: {
        refresh(context, db) {
            const req = new DBCollectionsRequest();
            req.db = db;
            api.next(req.write());
            api
                .pipe(first(({data}) => Response.read(data).id === req.id))
                .subscribe(({data}) => context.commit('refresh', DBCollections.read(data).list));
        }
    },
    mutations: {
        refresh(state, dbs: Cols) {
            state.list = dbs;
        }
    }
}
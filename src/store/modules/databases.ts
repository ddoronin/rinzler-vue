import { RootState } from '../index';
import { Module } from 'vuex';
import { IDB, DataBaseListRequest, DataBaseList } from '../../dto/DataBaseList';
import { Response } from '../../dto/Response';
import { api } from '@/api/data';
import { first } from 'rxjs/operators';

export type DBList = IDB[];
export type DBState = {list: DBList};
const state: {list: DBList} = {list: []};

export const databases: Module<{list: DBList}, RootState> = {
    namespaced: true,
    state,
    getters: {
    },
    actions: {
        refresh(context) {
            const req = new DataBaseListRequest();
            api.next(req.write());
            api
                .pipe(first(({data}) => Response.read(data).id === req.id))
                .subscribe(({data}) => context.commit('refresh', DataBaseList.read(data).list));
        }
    },
    mutations: {
        refresh(state, dbs: DBList) {
            state.list = dbs;
        }
    }
}
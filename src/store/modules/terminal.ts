import { RootState } from '../index';
import { Module } from 'vuex';
import { FindRequest, Found } from '../../dto/Find';
import { Response } from '../../dto/Response';
import { api } from '@/api/data';
import { filter } from 'rxjs/operators';

export type TerminalState = {items: any[]};
const state: TerminalState = {items: []};

export const terminal: Module<TerminalState, RootState> = {
    namespaced: true,
    state,
    getters: {
    },
    actions: {
        top10(context, {db, collection}) {
            context.commit('refresh');
            const req = new FindRequest();
            req.db = db;
            req.collection = collection;
            req.find = {};
            req.options = {limit: 10};
            api.next(req.write());
            api
                .pipe(filter(({data}) => Response.read(data).id === req.id))
                .subscribe(({data}) => context.commit('append', Found.read(data).data));
        }
    },
    mutations: {
        refresh(state){
            state.items.length = 0;
        },
        append(state, item) {
            state.items.push(item);
        }
    }
}
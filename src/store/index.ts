import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { Invoice } from '@/interfaces';

export default new Vuex.Store({
  	state: {
      	invoices: []
  	},
	mutations: {
		SET_INVOICES(state, payload) {
			state.invoices = payload;
		}
	},
	actions: {
		getInvoicesFromLocalStorage({ commit }): void {
			const invoicesJSON = localStorage.getItem('invoices');

			if (invoicesJSON) {
				const invoices: Invoice[] = JSON.parse(invoicesJSON);

				commit('SET_INVOICES', invoices);
			}
		},
		setInvoicesToLocalStorage({}, invoices: Invoice[]): void {
			const invoicesJSON = JSON.stringify(invoices);

			localStorage.setItem('invoices', invoicesJSON);
		},
		addInvoice({ state, commit, dispatch }, invoice: Invoice): void {
			const invoices: Invoice[] = state.invoices.slice();

			invoices.push(invoice);
			dispatch('setInvoicesToLocalStorage', invoices)
			commit('SET_INVOICES', invoices);
		},
		deleteInvoice({ state, commit, dispatch }, idsToDelete: string[]): void {
			const invoices: Invoice[] = state.invoices.slice();

			idsToDelete.forEach((id: string) => {
				const index: number = invoices.findIndex((el: Invoice) => el.id === id);

				if (index !== -1) {
					invoices.splice(index, 1);
				}
			});

			dispatch('setInvoicesToLocalStorage', invoices)
			commit('SET_INVOICES', invoices);
		},
	},
	getters: {
		invoices: (state) => state.invoices
	}
})

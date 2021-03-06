<template>
	<div>
		<b-row align-h="center" class="p-2">
			<b-col md="8">
				<pulse-loader class="text-center" :loading="loading" size="100px" />

				<b-alert :show="error" variant="danger">
					Getting onlineplayers failed.
				</b-alert>

				<div v-if="result">
					<b-row align-h="center" class="p-2">
						<b-col md="8">
							<b-input-group class="p-2">
								<b-input-group-prepend>
									<!--format: servername(server player count)-->
									<dropdown-select
										v-model="cur"
										:list="serverlist"
										:text="`${cur}(${result[cur].length})`"
										variant="success"
									>
										<span slot-scope="row">{{ row.value }}({{ result[row.value].length }})</span>
									</dropdown-select>
								</b-input-group-prepend>

								<b-form-input v-model="filter" placeholder="Filter" />
							</b-input-group>
						</b-col>
					</b-row>
					<b-row align-h="center" class="p-2">
						<b-col md="6" class="text-center">
							<b-row>
								<b-col>
									<page-list :list="result[cur]" :filter="filter">
										<template slot-scope="row">
											<Id :id="row.value" />
										</template>
									</page-list>
								</b-col>
							</b-row>
							<b-row>
								<Clear @clear="clear" />
							</b-row>
						</b-col>
					</b-row>
				</div>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import _ from 'lodash'

import PageList from './widget/PageList'
import Id from './widget/Id'
import Dropdown from './widget/Dropdown'
import Clear from './widget/Clear'
import DropdownSelect from './widget/DropdownSelect'

import PulseLoader from 'vue-spinner/src/PulseLoader'

import cache from '@/cachedriver'
import { getOnlinePlayers } from '@/wynn'

export default {
	data() {
		return {
			error: false,
			loading: true,
			filter: '',
			cur: '', //selected server name
			result: null
		}
	},
	storage: {
		driver: cache(10 * 1000), //10sec
		namespace: 'OnlinePlayers',
		keys: ['cur', 'result']
	},
	components: { PulseLoader, Id, PageList, Dropdown, Clear, DropdownSelect },
	computed: {
		serverlist() {
			return Object.keys(this.result).filter(s => this.result[s].length > 0)
		}
	},
	watch: {
		$route() {
			this.updateCur()
		}
	},
	async created() {
		if (!this.result) {
			try {
				this.result = await getOnlinePlayers()
				this.result = _(this.result)
					.toPairs()
					.sortBy(0)
					.fromPairs()
					.value() //sort object keys

				if (!(this.cur in this.result)) {
					this.cur = _.findKey(this.result, ar => ar.length > 0) //first server has player
				}
			} catch (e) {
				this.error = true
			}
		}
		this.loading = false

		this.updateCur()
	},
	methods: {
		clear() {
			this.result = null
			this.cur = null
			this.$router.go(0)
		},
		updateCur() {
			if (this.$route.query.srv) {
				this.cur = this.$route.query.srv
				this.$router.replace(this.$route.path) //remove query
			}
		}
	}
}
</script>

//styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.min.css'
import './style.css'

import 'whatwg-fetch'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vuejsStorage from 'vuejs-storage/dist/vuejs-storage.js'
import router from './router'

Vue.use(BootstrapVue)
Vue.use(vuejsStorage)

// vue router #anchor
Vue.mixin({
	mounted() {
		let hash,
			hs = location.hash.split('#')
		if (hs.length >= 2) {
			hash = hs.pop()
			try {
				let el = this.$el
				if (el !== null && el.querySelector && (el = el.querySelector(`#${hash}`))) {
					//if exists

					let bodyTop = document.body.getBoundingClientRect().top
					let elemTop = el.getBoundingClientRect().top

					setTimeout(() => {
						window.scrollTo(0, elemTop - bodyTop) //scroll to element
					}, 100)
				} else {
					window.scrollTo(0, 0)
				}
			} catch (e) {
				void 0 //empty statment for eslint
			}
		}
	}
})

// custom globals
Vue.filter('toHours', min => Math.round(min / 60))
Vue.filter('lower', s => s.toLowerCase())
Vue.filter('upper', s => s.toUpperCase())
Vue.filter('capitalize', s => s[0].toUpperCase() + s.slice(1).toLowerCase())

// app
import App from './App'

window.app = new Vue({
	el: '#app',
	router,
	render: h => h(App)
})

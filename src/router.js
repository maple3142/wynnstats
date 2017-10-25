import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from './vue/Home'
import Player from './vue/Player'
import Guild from './vue/Guild'
import LeaderBoard from './vue/LeaderBoard'
import Search from './vue/Search'
import OnlinePlayers from './vue/OnlinePlayers'
import Item from './vue/Item'
import About from './vue/About'

const routes = [
	{ path: '/', component: Home },
	{ path: '/player/:id', component: Player },
	{ path: '/guild/:name', component: Guild },
	{ path: '/leaderboard/:type(player|guild|pvp)', component: LeaderBoard },
	{ path: '/search/:search', component: Search },
	{ path: '/online', component: OnlinePlayers },
	{ path: '/item', component: Item },
	{ path: '/item/:name', component: Item },
	{ path: '/about', component: About }
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

export default router
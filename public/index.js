//require modules
import "babel-core/register"
import "babel-polyfill"
import Vue from 'vue'
import VueRouter from 'vue-router'
import notify from 'v-toaster'
import Vuetify from 'vuetify'
import 'v-toaster/dist/v-toaster.css'

// require components
import Index from '../public/components/Index.vue'
import News from './components/News.vue'
import Users from '../public/components/Users.vue'

const routes = [
    { path: '/', component: Index},
    { path: '/vue', component: Users},
    { path: '/news', component: News}
];

//Setup Vue
Vue.use(VueRouter);
Vue.use(notify, {timeout: 5000});
Vue.use(Vuetify);

const router = new VueRouter({
    routes,
    mode: 'history'
});

// Register components
new Vue({
    el: '#app',
    router,
    render: h => h(Index)
});

// Playlist of my music
//
// 2 - P.MO - Come Home (Prod. Mike Squires)
//
// 3 - Haikaiss - A Praga (Iccarus Rework)
//
// 4 - Ryan Caraveo - Perfect World
//
// 5 - Skan & ISOxo - ID (feat. Fang The Great)
//
// 6 - CaRter - How You%2FYou’ve Been
//
// 7 - Alan Walker - Alone (Jim Yosef Remix)
//
// 8 - JWalk - Stay Down
//
// 9 - E-Cologyk Feat. Milkee - Milkaholic
//
// 10 - CaRter - In My Dreams
//
// 11 - 98.20.11 - Melifluo (Myah Alanna)
//
// 12 - Ryan Caraveo - Ten Times
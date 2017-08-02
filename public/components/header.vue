<template>
    <v-app>
        <v-menu>
            <v-btn primary dark slot="activator">Menu</v-btn>
            <v-list>
                <v-list-tile v-for="item in items" :key="item.title">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-app>

</template>

<script>
    import Vuetify from 'vuetify'
    import 'vuetify/dist/vuetify.min.css'

    export default {
        data: () => {
            return {
                items: [
                    {route: "/", title: "Home"},
                    {route: "/AboutUs", title: "About us"},
                    {route: "/MyOffice", title: "My Office"},
                    {route: "/Enter", title: "Sign In"},
                ]
            }
        }
    }

</script>

<style>

    .application{
        position: absolute;
        width: 100%;
        z-index: 1;
    }
    .application--light {
        background: none;
    }
</style>
<template>
    <div id="app">
        <router-view></router-view>
        <h1 align="center" v-for="user in users">Username: {{user.username}}, Age: {{user.age}}</h1>
        <hr>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                users: [
                    {username: "A", age: 22},
                    {username: "B", age: 21},
                    {username: "C", age: 23},
                ]
            }
        }
    }
</script>

<style>

</style>

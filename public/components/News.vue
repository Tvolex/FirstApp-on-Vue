<!--suppress HtmlUnknownTag -->
<template>
    <div id="app">
        <my-header></my-header>
        <router-view></router-view>

        <template v-if="spinner === true">
            <div class="spinner">
                <div class="cssload-spin-box"></div>
            </div>
        </template>
        <template v-if="login" >

            <div>
                <createNewsModal > </createNewsModal>
                <div class="GeneralBlock">
                    <transition-group appear name="list" tag="div" list-enter list-leave>
                        <!-- <div v-for="item in items" class="newsBlock" v-bind:id="item._id" v-bind:key="item._id">
                             <div class="newsHeader" >
                                 <span class="spanNewsHeader" >{{item.title}}</span>
                                 <button class="close"  v-bind:id="item._id" v-on:click="deleteNews($event)"  type="button" > &times; </button>
                             </div>
                             <div class="newsBody" >
                                 <span class="spanNewsBody" >{{item.description}}</span>
                             </div>
                         </div> -->

                        <div style="margin-top: 20px; transition: 0.3s all" v-for="item in items" v-bind:id="item._id" v-bind:key="'div' + item._id">

                            <v-layout v-bind:key="'layout'+item._id" transition="scale-transition">
                                <v-flex xs12 sm6 offset-sm3>
                                    <v-card v-bind:key="'card'+item._id" transition="scale-transition">
                                        <v-card-media
                                                class="black--text img"
                                                height="200px"
                                                v-bind:src="item.img ? item.img : '/img/DevPicture.jpg'"
                                                v-bind:key="'card-media'+item._id">

                                            <v-container fill-height fluid v-bind:key="'container'+item._id">
                                                <v-layout fill-height v-bind:key="'layout2'+item._id">
                                                    <v-flex v-bind:key="'flex'+item._id" xs12 align-end flexbox>
                                                        <span v-bind:key="'span'+item._id" class="headline white--text title-background">{{item.title | validateTitle}}</span>
                                                    </v-flex>
                                                </v-layout>
                                            </v-container>
                                        </v-card-media>
                                        <v-card-title v-bind:key="'card-title'+item._id">
                                            <div v-bind:key="'div2'+item._id">
                                                <span v-bind:key="'span2'+item._id" class="description-background">{{item.description | validateDescription}}</span><br>
                                                <br><span v-bind:key="'span3'+item._id" class="grey--text">Date: {{item.createdAt | validateDate}}</span>
                                                <span v-bind:key="'span4'+item._id" class="grey--text">Author: {{item.author}}</span><br>
                                            </div>
                                        </v-card-title>
                                        <v-card-actions v-bind:key="'card-actions2'+item._id">
                                            <v-btn v-bind:key="'btn1'+item._id" flat class="orange--text">Share</v-btn>
                                            <v-btn v-bind:key="'btn2'+item._id" flat class="orange--text">Explore</v-btn>
                                            <v-btn v-bind:key="'btn3'+item._id" flat class="orange--text" if="author">Edit</v-btn>
                                            <v-btn v-bind:key="'btn4'+item._id" flat class="orange--text" if="author" v-bind:id="item._id" v-on:click="deleteNews">Delete</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </div>



                    </transition-group>
                </div>

            </div>
        </template>



        <template v-else-if="login === false">
            <div  align="center" id="Unauthorized">
                <h5>You don`t have access to this page</h5>
                <hr>
                <h5>Please, <a  href="/Enter">Login</a> </h5>

            </div>
        </template>




    </div>


</template>

<script>
    import axios from 'axios'
    import notify from 'v-toaster'
    import Vuetify from 'vuetify'
    import 'v-toaster/dist/v-toaster.css'
    import 'vuetify/dist/vuetify.min.css'
    import './../style/spinner.css'
    import createNewsModal from './createNewsModal.vue'
    import header from './header.vue'

    export default {
        components: {
            'createNewsModal': createNewsModal,
            'my-header': header,
        },
        data: () => {

            return {
                actions: [
                    {title: "Edit", route: "/edit"},
                    {title: "Delete", route: "/deleteNews"}
                ],
                items: [],
                login: undefined,
                connection: false,
                lastDate: new Date(1970),
                errors: [],
                spinner: true
            }
        },

        created: function () {

        },

        beforeMounted: function () {

        },

        mounted: async function () {
            try {
                let login = await axios.get('/login');
                this.login = login.data.login;
            } catch (error) {
                this.login = false;
                this.errors.push(error);
                let errorNotification = "401: Unauthorized.";
                this.notificator('error', errorNotification);
                console.log(error);
            }
            this.checkLogin();
        },

        methods: {
            checkLogin: function () {
                if (this.login) {
                    this.getNews();
                    this.updateNews();
                }
            },

            updateNews: function () {
                setInterval(() => this.getNews(), 5000);
            },

            createNews: async function() {
                let data = {
                    author: this.createItem.author,
                    title: this.createItem.title,
                    description: this.createItem.description,
                };

                let ok = await axios.post('/createNews', data);

                ok ? this.getNews() : ok;

            },

            getNews: async function () {
                let date = { lastDate: this.lastDate};

                let data = await axios.get('/getNews', { params: date});

                if(data) {
                    this.showNews(data.data.concat(this.items));
                    this.connection = true;
                    this.spinner = false;
                } else this.connection = false;
            },



            showNews: function (items) {
                this.items = items;
                this.lastDate = items[0] ? items[0].createdAt : new Date(1970);
            },

            deleteNews: function (event) {

                let elemId = event.currentTarget.id;
                let data = {
                    _id: elemId
                };

                axios.post('/deleteNews', data).then(res => {
                    if(res)
                        this.removeOneFromArr(this.items, elemId);
                });
            },

            removeOneFromArr: function (arr, id) {
                let index = this.getIndexOf(arr, id);
                this.items.splice(index, 1);
                this.$nextTick();
            },

            getIndexOf: function (arr, id) {
                let i = arr.length;
                while(i--)
                    if(arr[i]._id === id)
                        return i;
                return -1;
            },

            notificator: function (type, message) {
                switch (type) {
                    case 'info': this.$toaster.info(message);
                        break;
                    case 'success': this.$toaster.success(message);
                        break;
                    case 'warning': this.$toaster.warning(message);
                        break;
                    case 'error': this.$toaster.error(message);
                        break;
                }

            },

        },

        filters: {
            validateTitle: function (text) {
                const maxTitle = 30;

                if (text.length > maxTitle)
                    return text.slice(0, maxTitle);
                else return text
            },

            validateDescription: function (text) {
                const maxDescription = 150;

                if (text.length > maxDescription)
                    return text.slice(0, maxDescription);
                else return text
            },

            validateDate: function (date) {
                return date.substring(0, 10) + ' '+ date.substring(11, 19);
                //return new Date(dt);
            }
        },



    }


</script>

<style>
    html, body {
        background-color: wheat!important;
        transition: 0.3s all;
     }
    .headline,.title-background {
        margin-top: 15px;
        z-index: 2;
    }
    .headline,.title-background,.card__media__background {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
        -webkit-transition: .3s ease-in-out;
        transition: .3s ease-in-out;
        z-index: 2;
    }
    .headline,.title-background,.card__media__background:hover{
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    .spinner {
        position: absolute;
        top: 30%;
        left: 50%;
        width: 160px;
        height: 150px;
        margin-left: -80px;
        margin-top: -75px;
        display: block;
        z-index: 3;
    }
    @-webkit-keyframes spin {
        0%  {-webkit-transform: rotate(0deg);}
        100% {-webkit-transform: rotate(360deg);}
    }

    #app {
        padding-top: .1%;
        transition: 0.3s all;
    }

    .GeneralBlock {
        width: 100%;
        height: 100%;
        position: absolute;
        margin-top: 5%;
        transition: 0.3s all;
    }
    [v-cloak], #Unauthorized {
        position: fixed;
        left: 50%;
        margin-left: -25%;
        margin-top: 10%;
        height: 20%;
        width: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        background: rgba(255, 43, 64, 0.2);
        z-index: 3;
    }
    .v-toast-error {
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
    }
    .title-background {
        background: rgba(138,138,138, 0.5);
        width: 105%;
        position: absolute;
        margin-left: -5%;
        padding-left: 5%;

    }
    .description-background{
        overflow: hidden;
    }
    .card {
        background-color: whitesmoke;
        position: relative;
        border-radius: 2px;
        min-width: 0;
        z-index: 1;
    }
    .card__actions {

        z-index: 2;
        position: relative;
    }
    .list {
        overflow: inherit;
        z-index: 5;
    }
    .list-move {
        transition: 0.3s all;
    }

</style>

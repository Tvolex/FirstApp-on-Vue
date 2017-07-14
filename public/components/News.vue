<template>

    <div>
        <router-view></router-view>
        <div class="AddNews" data-toggle="modal" data-target="#modal-1">Are you have interested news? Add NEWS</div>

        <div class="modal fade" id="modal-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" align="center">
                            Add news
                            <button class="close"  type="button" data-dismiss="modal"> &times; </button>
                        </h4>
                    </div>
                    <div class="modal-body" id="ModalBodyAddNews">
                        <form id="formCreateNews" name="formCreateNews" class="formCreateNews">
                            <span class="spanPopUpAddTitle">Add news title</span>
                            <br>
                            <input type="text" v-model="createItem.title" class="inputPopUpAddTitle form-control" id="title" name="title">
                            <br><span class="spanPopUpAddTitle">Add news description</span><br>
                            <textarea cols="30" rows="10" v-model="createItem.description" class="inputPopUpAddDescription form-control" id="description" name="description" ></textarea>
                            <button class="btn btn-primary" id="addNews"  v-on:click="createNews">Add news</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        <div class="GeneralBlock">
            <transition-group-plus transition-mode="in-out" tag="div">
                <transition-plus @enter="onEnter" @leave="onLeave">
                    <div v-for="item in items" v-bind:class="item.className" v-bind:id="item._id" v-bind:key="item._id">
                        <div class="newsHeader" >
                            <span class="spanNewsHeader">{{item.title}}</span>
                        </div>
                        <div class="newsBody">
                            <span class="spanNewsBody">{{item.description}}</span>
                        </div>
                    </div>
                </transition-plus>

                </TransitionGroupPlus>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import VueTransitionGroupPlus from "vue-transition-group-plus"

    export default {
        config: {
            use: VueTransitionGroupPlus
        },
        data: () => {
            return {
                items: [],
                createItem: {
                    title: '',
                    description: '',
                    className: 'newsBlock',
                    length: '',
                },
                lastDate: new Date(1970),
                errors: []
            }
        },
        created: function () {
            this.getNews();
            setInterval(t => this.getNews(), 5000);
        },
        methods: {
            createNews: function(){
                event.preventDefault();

                let data = {
                    title: this.createItem.title,
                    description: this.createItem.description,
                };

                axios.post('/createNews', data).then(res => {
                    if(res) this.getNews();
                });
            },
            getNews: function () {
                let date = { lastDate: this.lastDate};

                axios.get('/getNews', { params: date}).then(res => {
                    if(res !== []) {
                        this.showNews(res.data.concat(this.items));
                        this.setShowEffects(res.data.length);
                    }
                }).catch(e => this.errors.push(e));
            },
            showNews: function (items) {
                this.items = items;
                this.lastDate = items[0].createdAt;
            },
            setShowEffects: function (numb) {
                this.setHiddenClassNameToNewItems(numb, this.setVisibleClassNameToNewItem);
            },
            setHiddenClassNameToNewItems: function (numb, callback) {
                for (let i = 0; i < numb; i++) {
                    this.items[i].className = "hid";
                }
                setInterval(callback(numb), 900);
            },
            setVisibleClassNameToNewItem: function (numb) {

                for (let i = 0; i < numb; i++) {
                    this.items[i].className = "newsBlock";
                }

            }
        },
        watch: {
            items: function (itm, oldItm) {

            }
        }
    }



</script>

<style>
    html {
        background-color:#fffacd;
    }
    html {
         background-color:#fffacd;
         transition: 0.3s all;
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
    .hid{
        position: relative;
        width: 50%;
        height: 50%;
        margin-top: 3%;
        margin-left: 50%;
        left: -25%;
        opacity: 0.3;
        background-color:#FFFFF0;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
        transition: 0.3s all;
        overflow: hidden;
    }
    .newsBlock{
        position: relative;
        width: 50%;
        height: 50%;
        margin-top: 3%;
        margin-left: 50%;
        left: -25%;
        background-color:#FFFFF0;
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
        transition: 0.3s all;
        overflow: hidden;
    }
    .apdxBlock{
        position: relative;
        width: 100%;
        height: 5%;
        background-color: #1b6d85;
    }
    #ModalBodyAddNews{
        width: 50%;
        height: 50%;
    }
    #addNews {
        margin-top: 5%;
    }
    .AddNews{
        position: absolute;
        height: 35px;
        padding-top: 5px;
        margin-left: 50%;
        width: 50%;
        left: -25%;
        font-size: large;
        text-align: center;
        background-color: #67b168;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        cursor: pointer;
    }

    .spanPopUpAddTitle {

        text-align: center;
    }
    .formCreateNews{
        margin-left: 50%;
        left: -25%;
        width: 100%;
        transition: 0.3s all ;
    }
    .inputPopUpAddTitle{
        width: 100%;
    }
    .inputPopUpAddDescription {
        width: 100%;
        height: 150px;
    }
    #addNewsOpen {
        position: absolute;
        height: 30px;
        font-size: medium;
        margin-top: 0.5%;
        margin-left: 64%;
    }
    .newsHeader{
        position: inherit;
        width: 100%;
        height: 20%;
        border: solid 0px black;
        margin-top: 0%;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        transition: 0.3s all;
    }
    .spanNewsHeader {
        position: absolute;
        text-align: center;
        margin-top: 2%;
        width: 100%;
        font-size: x-large;
        white-space: nowrap;
        overflow: hidden;
        padding: 5px;
        text-overflow: ellipsis;
        cursor: pointer;
    }
    .spanNewsBody{
        word-wrap: break-word;
        overflow: hidden;
        padding: 5px;
        text-overflow: ellipsis;
        text-justify-trim: normal;
    }
    .newsBody{
        padding: 5px;
        font-size: medium;
        transition: 0.3s all;
    }
</style>

<template>
    <div>
        <div class="AddNews"  data-toggle="modal" data-target="#modal-1">Add news</div>

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
                            <br><input type="text" v-model="createItem.title" class="inputPopUpAddTitle form-control" id="title" name="title">

                            <br><span class="spanPopUpAddTitle">Add news description</span><br>
                            <textarea cols="30" rows="10" v-model="createItem.description" class="inputPopUpAddDescription form-control" id="description" name="description" ></textarea>

                            <hr><span class="spanPopUpAddTitle">Upload photo or past link</span><br>
                            <br><input type="text" v-model="createItem.img" class="inputPopUpAddTitle form-control" id="img" name="img">
                            <br><input type="file" >

                            <button class="btn btn-primary" id="addNews"  v-on:click="createNews">Add news</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data: () => {

            return {
                createItem: {
                    author: $.cookie("author"),
                    title: '',
                    description: '',
                    img: '',
                },
                lastDate: new Date(1970),
                errors: [],
            }
        },

        methods: {

            createNews: function(){
                event.preventDefault();

                let data = {
                    author: this.createItem.author,
                    title: this.createItem.title,
                    description: this.createItem.description,
                    img: this.createItem.img,
                }

                axios.post('/createNews', data);
            },

        },
    }

</script>

<style>
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
        background-color: whitesmoke;
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
</style>
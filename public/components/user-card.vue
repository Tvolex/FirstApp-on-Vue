<div v-for="item in items" v-bind:class="item.className" v-bind:id="item._id" v-bind:key="item._id">
    <div class="newsHeader" v-bind:key="'NewsHeader' + item._id">
        <span class="spanNewsHeader" v-bind:key="'spanNewsHeader' + item._id">{{item.title}}</span>
    </div>
    <div class="newsBody" v-bind:key="'newsBody' + item._id">
        <span class="spanNewsBody" v-bind:key="'spanNewsBody' + item._id">{{item.description}}</span>
    </div>
</div>
<template>
    <ul class="photo-album">
        <li v-for="item in imgUrl">
            <router-link :to="{name:'Photo', params:{imgurl:item}}">
                <img :src="item" >
            </router-link>
        </li>
    </ul>
</template>

<script>
    import Swiper from 'swiper';

export default {
    data () {
        return {
            imgUrl:[],
        }
    },
    mounted(){
        this.imgUrl = [
            require('../../assets/1.jpg'), require('../../assets/2.jpg'),
            require('../../assets/3.jpg'), require('../../assets/4.jpg'),
            require('../../assets/5.jpg'), require('../../assets/6.jpg'),
            require('../../assets/7.jpg'), require('../../assets/8.jpg'),
            require('../../assets/9.jpg'), require('../../assets/10.jpg'),
            require('../../assets/11.jpg'), require('../../assets/12.jpg'),
            require('../../assets/13.jpg'), require('../../assets/14.jpg'),
            require('../../assets/15.jpg'), require('../../assets/16.jpg'),
            require('../../assets/17.jpg'), require('../../assets/18.jpg'),
            require('../../assets/19.jpg'), require('../../assets/20.jpg'),
            require('../../assets/21.jpg'), require('../../assets/22.jpg'),
            require('../../assets/23.jpg'), require('../../assets/24.jpg'),
            require('../../assets/25.jpg'), require('../../assets/26.jpg'),
            require('../../assets/27.jpg'), require('../../assets/28.jpg')
        ];
    }
}
</script>

<style scoped>
    .photo-album{
        background: #000;
        border: solid 4px #F8F6F8;
        font-size: 0;
        padding-bottom: 20px;
    }
    .photo-album li{
        display: inline-block;
        width: 110px;
        height: 110px;
        margin-top: 20px;
        margin-left: 9px;
        padding: 5px;
        border: solid orange 4px;
        border-radius: 50%;
    }
    .photo-album img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
</style>

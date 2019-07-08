<template>
    <div class="c-photo" @click="toUrl">
        <img ref="img" :src="imgurl" >
    </div>
</template>

<script>
export default {
    data(){
        return{
            imgurl:'',
            imgH:0,
            imgW:0,
        }
    },
    mounted(){
        this.imgurl = this.$route.params.imgurl;
        var img = this.$refs.img;
        console.log(this.windowW + 'px', this.windowH + 'px');
        img.onload = function(){
            this.imgH = img.offsetHeight;
            this.imgW = img.offsetWidth;
            var ratio = this.imgH / this.imgW;
            if(ratio > 1.2){
                img.style.height = '100%';
            }else{
                img.style.width = '100%';
            }
        }
    },
    methods:{
        toUrl(){
            this.$router.push({path:'/'});
        }
    }
}
</script>

<style scoped>
    .c-photo{
        display: flex;
        width: 100vw;
        height: 100vh;
        background: #000;
        font-size: 0;
        align-content:center;
        align-items: center;
    }
</style>


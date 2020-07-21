<template>
    <v-card color="transparent" elevation="0">
        <v-card-text>
            <v-stepper v-model="e1" class="elevation-0" non-linear color="#005598">
                <v-stepper-content step="1" color="#005598">
                    <v-row justify="center" class="my-10 mx-5">
                        <v-col cols="12" md="3" sm="12" v-for="(n,i) in 8" :key="n" class="mb-6">
                            <v-card class="scale" outlined elevation="0" width="100%" height="175" @click="ir(imagenes[i].id)">
                                <div class="tipo subtitle-2 ">{{imagenes[i].text}}</div>
                                <v-row justify="center" class="pt-4">
                                    <v-img class="bg" contain width="100" height="100" :src="require('@/assets/'+imagenes[i].img)"></v-img>
                                </v-row>
                                <v-divider class="mt-3"></v-divider>
                                <div class="text-center font-weight-bold subtitle-1 mt-2">{{cambios[i]}}</div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <Calculador :select="select" />
                    <v-card-title style="justify-content:center">
                        <v-btn outlined medium color="error" class="mx-2" @click="e1 = 1">
                            <v-icon>mdi-chevron-left</v-icon>&nbsp;&nbsp;&nbsp;
                            <div class="font-weight-black subtitle-2">Volver</div>
                        </v-btn>
                    </v-card-title>
                </v-stepper-content>
            </v-stepper>
        </v-card-text>
    </v-card>
</template>

<script>
import Calculador from '@/components/Calculador';

    export default {
        components:{
            Calculador,
        },
        props:{
            cambios:{
                type:Array,
                default:() => ([])
            }
        },
        data() {
            return {
                e1:1,
                select:null,
                imagenes:[
                    {id:5,img:"bitcoin.png",text:"BTC"},
                    {id:3,img:"euro.png",text:"EUR"},
                    {id:1,img:"dollar.png",text:"USD"},
                    {id:4,img:"petro.png",text:"PTR"},
                    {id:9,img:"ethereum.png",text:"ETH"},
                    {id:8,img:"litecoin.png",text:"LTC"},
                    {id:6,img:"dashcoin.png",text:"DASH"},
                    {id:7,img:"dogecoin.png",text:"DOGE"}
                ],
            }
        },
        methods:{
            ir(id){
                this.e1 = 2;
                this.select = id;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tipo{
        position:absolute;
        right:20px;
        top:10px;
    }
    .scale{
        transition:all 0.3s;
    }
    .scale:hover{
        transform:scale(.9);
    }
    .bg{
        min-height:100px;
        max-height:100px;
    }
</style>
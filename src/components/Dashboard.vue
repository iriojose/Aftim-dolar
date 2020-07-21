<template>
    <v-card color="transparent" elevation="0">
        <v-card-text>
            <v-stepper v-model="e1" class="elevation-0" non-linear color="#005598">
                <v-stepper-content step="1" color="#005598">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <div class="font-weight-black body-1">Ir a calcular</div>
                        <v-btn fab small class="mx-2" @click="e1 = 2"><v-icon>mdi-chevron-right</v-icon></v-btn>
                    </v-card-title>

                    <v-row justify="center" class="my-10 mx-5">
                        <v-col cols="12" md="3" sm="12" v-for="(n,i) in 8" :key="n" class="mb-10">
                            <v-card outlined elevation="0" width="100%" height="210" @click="e1 = 2">
                                <div class="tipo subtitle-2 ">{{imagenes[i].text}}</div>
                                <v-row justify="center" class="pt-4">
                                    <v-img contain width="100" height="100" :src="require('@/assets/'+imagenes[i].img)"></v-img>
                                </v-row>
                                <v-divider class="mt-12"></v-divider>
                                <div class="text-center font-weight-bold subtitle-1 mt-2">{{cambios[i]}}</div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <v-card-title>
                        <v-btn fab small class="mx-2" @click="e1 = 1"><v-icon>mdi-chevron-left</v-icon></v-btn>
                        <div class="font-weight-black body-1">Volver</div>
                    </v-card-title>
                    <Calculador />
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
                imagenes:[
                    {id:5,img:"bitcoin2.svg",text:"BTC"},
                    {id:3,img:"euro.svg",text:"EUR"},
                    {id:1,img:"dolar.svg",text:"USD"},
                    {id:4,img:"petro.png",text:"PTR"},
                    {id:9,img:"eter.svg",text:"ETH"},
                    {id:8,img:"litecoin.svg",text:"LTC"},
                    {id:6,img:"dash.svg",text:"DASH"},
                    {id:7,img:"dogecoin.svg",text:"DOGE"}
                ],
            }
        },
    }
</script>

<style lang="scss" scoped>
    .tipo{
        position:absolute;
        right:20px;
        top:10px;
    }
</style>
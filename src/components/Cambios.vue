<template>
    <v-card width="100%" :height="$vuetify.breakpoint.smAndDown ? null:800" elevation="0">
        <div class="py-10 display-1 text-center font-weight-black">Tasas de cambio a bolivares</div>
        
        <v-row justify="center" class="my-10 mx-5">
            <v-col cols="12" md="3" sm="12" v-for="(n,i) in 8" :key="n" class="mb-10">
                <v-card outlined elevation="0" width="100%" height="210">
                    <v-row justify="center" class="pt-4">
                        <v-img contain width="100" height="100" :src="require('@/assets/'+imagenes[i].img)"></v-img>
                    </v-row>
                    <v-divider class="mt-12"></v-divider>
                    <div class="text-center font-weight-bold subtitle-1 mt-2">{{cambios[i]}}</div>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        props:{
            cambios:{
                type:Array,
                default:() => ([])
            }
        },
        data() {
            return {
                imagenes:[
                    {img:"bitcoin2.svg"},
                    {img:"euro.svg"},
                    {img:"dolar.svg"},
                    {img:"petro.png"},
                    {img:"eter.svg"},
                    {img:"litecoin.svg"},
                    {img:"dash.svg"},
                    {img:"dogecoin.svg"}
                ]
            }
        },
    }
</script>

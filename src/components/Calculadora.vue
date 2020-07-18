<template>
    <v-card width="100%" class="my-5 background" :height="$vuetify.breakpoint.smAndDown ? null:400">
        <v-row justify="center" class="py-10 px-5">
            <v-col cols="12" md="6" sm="12">
                <v-row justify="center">
                    <v-col cols="12" md="12" sm="12">
                        <div class="text-center font-weight-black title"> Monedas Procesadas </div>
                    </v-col>
                    <v-col cols="12" md="8" sm="12">
                        <v-select 
                            filled :items="monedas" return-object
                            color="#005598" dense label="Moneda" item-text="nombre"
                            :hint="'De '+origen.nombre" persistent-hint v-model="origen"
                            @change="disabledCash($event)"
                        >
                            <template slot="item" slot-scope="{ item }">
                                <v-avatar size="40" class="mr-5 mb-1">
                                    <v-img :src="require('@/assets/'+item.img)"></v-img>
                                </v-avatar>  
                                {{ item.nombre }} 
                            </template>
                            <template v-slot:selection="{item}">
                                <v-avatar size="30" class="mr-5">
                                    <v-img :src="require('@/assets/'+item.img)"></v-img>
                                </v-avatar>  
                                {{ item.nombre }} 
                            </template>
                        </v-select>
                    </v-col>
                    <v-col cols="12" md="8" sm="12">
                        <v-select 
                            filled :items="monedas" return-object
                            color="#005598" dense label="Moneda" item-text="nombre"
                            :hint="'A '+destino.nombre" persistent-hint v-model="destino"
                            :disabled="origen.nombre == '' ? true:false"
                        >
                            <template slot="item" slot-scope="{ item }">
                                <v-avatar size="40" class="mr-5 mb-1">
                                    <v-img :src="require('@/assets/'+item.img)"></v-img>
                                </v-avatar>  
                                {{ item.nombre }} 
                            </template>
                            <template v-slot:selection="{item}">
                                <v-avatar size="30" class="mr-5">
                                    <v-img :src="require('@/assets/'+item.img)"></v-img>
                                </v-avatar>  
                                {{ item.nombre }} 
                            </template>
                        </v-select>
                    </v-col>
                </v-row>
            </v-col>
            <v-divider vertical class="hidden-sm-and-down"></v-divider>
            <v-col cols="12" md="5" sm="12">
                <v-col cols="12" md="12" sm="12">
                    <div class="text-center font-weight-black title"> Resultado </div>
                </v-col>
                <v-row justify="center">
                    <v-col cols="12" md="8" sm="12">
                        <v-text-field
                            type="number" filled color="#005598"
                            hint="Monto de cambio" persistent-hint v-model="output"
                            label="Monto" dense
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <div class="text-center font-weight-black title my-10">{{output}}</div>
    </v-card>
</template>

<script>
import accounting from 'accounting';
//this.bit = accounting.formatMoney(+this.bit,{symbol:"$ ",thousand:',',decimal:'.'});

    export default {
        data() {
            return {
                output:null,
                origen:{nombre:""},
                destino:{nombre:""},
                monedas:[
                    {id:1,nombre:"Dolar",disabled:false,img:"dolar.svg"},
                    {id:2,nombre:"Bolivar",disabled:false,img:"bs.png"},
                    {id:3,nombre:"Euro",disabled:false,img:"euro.svg"},
                    {id:4,nombre:"Petro",disabled:false,img:"petro.png"},
                    {id:5,nombre:"Bitoint",disabled:false,img:"bitcoin2.svg"},
                    {id:6,nombre:"Dash",disabled:false,img:"dash.svg"},
                    {id:7,nombre:"Dogecoint",disabled:false,img:"dogecoin.svg"},
                    {id:8,nombre:"Litecoin",disabled:false,img:"litecoin.svg"},
                    {id:9,nombre:"Ethereum",disabled:false,img:"eter.svg"},
                ]
            }
        },
        props:{
            cripto:{
                type:Object,
                default:() => ({})
            },
            petro:{
                type:Object,
                default:() => ({})
            }
        },
        methods:{
            disabledCash(evt){
                this.monedas.filter(a => a.disabled=false);
                this.monedas.filter(a => a.id == evt.id ? a.disabled=true:null);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .background{
        background: rgba(0,85,152,.3);
    }
</style>
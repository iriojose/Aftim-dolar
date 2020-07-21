<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12" class="mb-3">
            <div class="text-center title font-weight-black">{{output}}</div>
        </v-col>

        <v-col cols="12" md="6" sm="12" style="padding: 0px 25px">
            <v-select 
                outlined :items="monedas" return-object
                color="#005598" dense label="Moneda" item-text="nombre"
                v-model="origen" @change="disabledCash($event)" hide-selected
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
        
        <v-col cols="12" md="6" sm="12" style="padding: 0px 25px">
            <v-select 
                outlined :items="cambios" return-object
                color="#005598" dense label="Moneda" item-text="nombre"
                v-model="destino" hide-selected @change="disabledCashInver($event)"
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

        <v-col cols="12" sm="12" md="6" style="padding: 0px 25px">
            <v-text-field
                type="number" outlined color="#005598"
                hint="Monto de cambio" persistent-hint v-model="monto"
                label="Monto" dense @input="calcular()"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
import {mapState} from 'vuex';
import accounting from 'accounting';

    export default {
        props:{
            select:{
                type:Number,
                default:1
            }
        },
        data() {
            return {
                monto:0,
                output:null,
                destino:{},
                origen:{},
                monedas:[
                    {id:1,nombre:"Dolar",disabled:false,img:"dollar.png"},
                    {id:3,nombre:"Euro",disabled:false,img:"euro.png"},
                    {id:4,nombre:"Petro",disabled:false,img:"petro.png"},
                    {id:5,nombre:"Bitcoint",disabled:false,img:"bitcoin.png"},
                    {id:6,nombre:"Dash",disabled:false,img:"dashcoin.png"},
                    {id:7,nombre:"Dogecoint",disabled:false,img:"dogecoin.png"},
                    {id:8,nombre:"Litecoin",disabled:false,img:"litecoin.png"},
                    {id:9,nombre:"Ethereum",disabled:false,img:"ethereum.png"},
                ],
                cambios:[
                    {id:1,nombre:"Dolar",disabled:false,img:"dollar.png"},
                    {id:2,nombre:"Bolivar",disabled:false,img:"bs.png"},
                ]
            }
        },
        mounted(){
            this.output = accounting.formatMoney(0,{symbol:"Bs ",thousand:'.',decimal:','});
            this.destino = this.cambios[1];
        },
        computed:{
            ...mapState(['tasas'])
        },
        watch: {
            select(){
                this.monedas.filter(a => a.id == this.select ? this.origen = a:null);
                this.output = accounting.formatMoney(0,{symbol:"Bs ",thousand:'.',decimal:','});
                this.destino = this.cambios[1];
            }
        },
        methods:{
            calcular(){
                if(this.origen.id == 1 && this.destino.id == 2)this.output = accounting.formatMoney(this.tasas.USD * this.monto,{symbol:"Bs ",thousand:'.',decimal:','});
                if(this.origen.id == 3 && this.destino.id == 2)this.output = accounting.formatMoney(this.tasas.EUR * this.monto,{symbol:"Bs ",thousand:'.',decimal:','});
                if(this.origen.id == 4 && this.destino.id == 2)this.output = accounting.formatMoney(this.tasas.PTR * this.monto,{symbol:"Bs ",thousand:'.',decimal:','});
                if(this.origen.id == 5 && this.destino.id == 2)this.output = accounting.formatMoney(this.tasas.USD * this.tasas.BTC * this.monto,{symbol:"Bs ",thousand:'.',decimal:','});
                if(this.origen.id == 6 && this.destino.id == 2)this.output = accounting.formatMoney(this.tasas.USD * this.tasas.DASH * this.monto,{symbol:"Bs ",thousand:'.',decimal:','});
                if(this.origen.id == 7 && this.destino.id == 2)this.output = accounting.formatMoney(this.tasas.USD * this.tasas.DOGE * this.monto,{symbol:"Bs ",thousand:'.',decimal:','});
                if(this.origen.id == 8 && this.destino.id == 2)this.output = accounting.formatMoney(this.tasas.USD * this.tasas.LTC * this.monto,{symbol:"Bs ",thousand:'.',decimal:','});
                if(this.origen.id == 9 && this.destino.id == 2)this.output = accounting.formatMoney(this.tasas.USD * this.tasas.ETH * this.monto,{symbol:"Bs ",thousand:'.',decimal:','});

                //if(this.origen.id == 1 && this.destino.id == 1)this.output = accounting.formatMoney(this.tasas.USD * this.monto,{symbol:"$ ",thousand:',',decimal:'.'});
                if(this.origen.id == 3 && this.destino.id == 1)this.output = accounting.formatMoney(this.tasas.EUR_USD * this.monto,{symbol:"$ ",thousand:',',decimal:'.'});
                if(this.origen.id == 4 && this.destino.id == 1)this.output = accounting.formatMoney(this.tasas.PTR_USD * this.monto,{symbol:"$  ",thousand:',',decimal:'.'});
                if(this.origen.id == 5 && this.destino.id == 1)this.output = accounting.formatMoney(this.tasas.BTC * this.monto,{symbol:"$ ",thousand:',',decimal:'.'});
                if(this.origen.id == 6 && this.destino.id == 1)this.output = accounting.formatMoney(this.tasas.DASH * this.monto,{symbol:"$ ",thousand:',',decimal:'.'});
                if(this.origen.id == 7 && this.destino.id == 1)this.output = accounting.formatMoney(this.tasas.DOGE * this.monto,{symbol:"$ ",thousand:',',decimal:'.'});
                if(this.origen.id == 8 && this.destino.id == 1)this.output = accounting.formatMoney(this.tasas.LTC * this.monto,{symbol:"$ ",thousand:',',decimal:'.'});
                if(this.origen.id == 9 && this.destino.id == 1)this.output = accounting.formatMoney(this.tasas.ETH * this.monto,{symbol:"$ ",thousand:',',decimal:'.'});
            },
            disabledCash(evt){
                this.cambios.filter(a => a.disabled=false);
                this.cambios.filter(a => a.id == evt.id ? a.disabled=true:null);
            },
            disabledCashInver(evt){
                this.monedas.filter(a => a.disabled=false);
                this.monedas.filter(a => a.id == evt.id ? a.disabled=true:null);
            }
        }
    }
</script>

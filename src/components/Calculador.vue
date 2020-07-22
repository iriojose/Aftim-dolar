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
            <vuetify-money
                v-model="monto"
                v-bind:label="'Monto'"
                v-bind:outlined="true"
                v-bind:clearable="true"
                v-bind:valueWhenIsEmpty="null"
                v-bind:options="options"
                v-bind:dense="true"
            />
                    
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
                monto: null,
                output:null,
                destino:{},
                options: {
                    locale: "es",
                    suffix: "",
                    precision: 2
                },
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
            this.output = this.formatMoney(0,'Bs');
            this.destino = this.cambios[1];
        },
        beforeUpdate(){
            try{
                this.calcular();
            }catch(e){
                null
            }
        },
        computed:{
            ...mapState(['tasas'])
        },
        watch: {
            select(){
                this.monedas.filter(a => a.id == this.select ? this.origen = a:null);
                this.output = this.formatMoney(0,'Bs');
                this.destino = this.cambios[1];
            },
            
        },
        methods:{
            formatMoney(monto, symbol){
                return accounting.formatMoney(monto,{symbol: symbol+" ",thousand:',',decimal:'.'});
            },
            calcular(){
                let parsedMonto = this.monto.replace(',',"");
                
                switch(this.destino.id){
                    case 1:
                        if(this.origen.id == 3)
                            this.output = this.formatMoney(this.tasas.EUR_USD * parsedMonto, '$');
                        if(this.origen.id == 4)
                            this.output = this.formatMoney(this.tasas.USD * parsedMonto, "$");
                        if(this.origen.id == 5)
                            this.output = this.formatMoney(this.tasas.BTC * parsedMonto,'$');
                        if(this.origen.id == 6)
                            this.output = this.formatMoney(this.tasas.DASH * parsedMonto,'$');
                        if(this.origen.id == 7)
                            this.output = this.formatMoney(this.tasas.DOGE * parsedMonto,'$');
                        if(this.origen.id == 8)
                            this.output = this.formatMoney(this.tasas.LTC * parsedMonto,'$');
                        if(this.origen.id == 9)
                            this.output = this.formatMoney(this.tasas.ETH * parsedMonto,'$');
                        break;
                    case 2:
                        if(this.origen.id == 1)
                            this.output = this.formatMoney(this.tasas.USD * parsedMonto,'Bs');
                        if(this.origen.id == 3)
                            this.output = this.formatMoney(this.tasas.EUR * parsedMonto,'Bs');
                        if(this.origen.id == 4)
                            this.output = this.formatMoney(this.tasas.PTR * parsedMonto,'Bs');
                        if(this.origen.id == 5)
                            this.output = this.formatMoney(this.tasas.USD * this.tasas.BTC * parsedMonto,'Bs');
                        if(this.origen.id == 6)
                            this.output = this.formatMoney(this.tasas.USD * this.tasas.DASH * parsedMonto,'Bs');
                        if(this.origen.id == 7)
                            this.output = this.formatMoney(this.tasas.USD * this.tasas.DOGE * parsedMonto,'Bs');
                        if(this.origen.id == 8)
                            this.output = this.formatMoney(this.tasas.USD * this.tasas.LTC * parsedMonto,'Bs');
                        if(this.origen.id == 9)
                            this.output = this.formatMoney(this.tasas.USD * this.tasas.ETH * parsedMonto,'Bs');
                        break;
                }

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

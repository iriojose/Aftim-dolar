<template>
	<v-app :class="loading ? '':'anim'">
		<v-row justify="center" class="mt-4">
			<div v-if="!loading" class="text-center">
				<v-avatar size="70" >
					<v-img :src="require('@/assets/AFTIM.png')"></v-img>
				</v-avatar>
			</div>
			<span class="white--text font-weight-black display-1" style="line-height:70px;margin-left: 10px">
				Aftim Calculator
			</span>
		</v-row>

		<v-row justify="center" v-if="!loading">
			<v-col cols="12" md="10" sm="12">
				<Dashboard :cambios="cambios" />
			</v-col>
		</v-row>

		<Footer v-if="!loading" />

		<v-card v-if="loading" elevation="0" width="100%" height="100%">
			<v-row justify="center" class="fill-height" align="center">
				<v-img width="500" height="500" contain :src="require('@/assets/loader.gif')"></v-img>
			</v-row>
		</v-card>
	</v-app>
</template>

<script>
import Cripto from '@/services/Cripto';
import Petro from '@/services/Petro';
import Dolar from '@/services/Dolar';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';
import accounting from 'accounting';
import {mapActions} from 'vuex';

	export default {
		name: 'App',
		components:{
			Footer,
			Dashboard
		},
		data(){
			return {
				cripto:null,
				petro:null,
				tasas:{},
				loading:true,
				cambios:[],
				sesion:0
			}
		},
		mounted() {
			this.init();
			setInterval(() => {
				this.init();
			}, 500000);
			
		},
		head: {
			title: {
				inner: 'AftimCalc',
				separator:" "
			},
			link: [
				{ rel: 'icon', href: require('../src/assets/AFTIM.png'), sizes: '16x16', type: 'image/png' }, 
			],
		},
		methods:{
			...mapActions(['setTasas']),

			success(){
                this.$toasted.success("Tasa actualizada", { 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 3000,
                    //icon : "mdi-check",
                });
            },
			init(){
				this.sesion == 1 ? this.loading = false:this.loading = true;
				this.getCripto();
			},
			finish(){
				this.tasas = {
					BTC:this.cripto.BTC.USD,
					PTR:this.petro.PTR.BS,
					EUR:this.petro.EUR.BS,
					ETH:this.cripto.ETH.USD,
					LTC:this.cripto.LTC.USD,
					DASH:this.cripto.DASH.USD,
					DOGE:this.cripto.DOGE.USD,
					USD:this.petro.USD.BS,
					PTR_USD:this.petro.PTR.USD,
					EUR_USD:this.petro.EUR.USD
				}
				this.setTasas(this.tasas);
				this.cambios.push(accounting.formatMoney(+this.cripto.BTC.USD*this.petro.USD.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.petro.EUR.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.petro.USD.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.petro.PTR.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.cripto.ETH.USD*this.petro.USD.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.cripto.LTC.USD*this.petro.USD.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.cripto.DASH.USD*this.petro.USD.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.cripto.DOGE.USD*this.petro.USD.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.loading = false;
				this.sesion=1;
				this.success();
			},
			//tasa de bitcoint a dolares
			getCripto(){
				Cripto().get("/pricemulti?fsyms=BTC,ETH,DASH,DOGE,LTC&tsyms=USD").then((response) => {
					this.cripto = response.data;
					this.getPetro();
				}).catch(e => {
					console.log(e);
					//this.init();
				});
			},
			getPetro(){
				let data = {
					"coins": ["USD", "PTR","EUR"],
					"fiats": ["BS", "USD","EUR"]
				}

				Petro().post("/price/",data).then((response) => {
					this.petro = response.data.data;
					this.finish();
				}).catch(e => {
					console.log(e);
					//this.init();
				});
			},
		}
	};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Bitter&display=swap');

	@keyframes changeColor {
		100% {
			background:#005598;       /* Último fotograma */
		}
	}
	.back{
		background: #FFF;
	}
	.text{
		font-family: 'Abril Fatface', sans-serif;
	}
	.anim {
		background: #005598;
		animation: changeColor 2s ease;  /* Relaciona con @keyframes */
		animation-fill-mode: forwards;
	}
    html {
        scroll-behavior: smooth;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
    ::-webkit-scrollbar {
        width: 8px;     
        height: 8px;   
    }
    ::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 12px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #b3b3b3;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }
    ::-webkit-scrollbar-thumb:active {
        background-color: #999999;
    }
    ::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 12px;
    }
    ::-webkit-scrollbar-track:hover,
    ::-webkit-scrollbar-track:active {
        background: #fff;
    }
    
</style>
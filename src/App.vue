<template>
	<v-app :class="loading ? '':'anim'">
		<v-row justify="center" v-if="!loading">
			<div>
				<v-img width="200" height="200" contain :src="require('@/assets/AFTIM.png')"></v-img>
				<div class="text-center text display-1 font-weight-black white--text" v-if="!loading">
					AftimCalc
				</div>
			</div>
		</v-row>

		<v-row justify="center" v-if="!loading">
			<v-col cols="12" md="9" sm="12">
				<Calculadora :cripto="cripto" :petro="petro" />
			</v-col>
		</v-row>

		<v-row justify="center" v-if="!loading">
			<v-col cols="12" md="12" sm="12">
				<Cambios :cambios="cambios" />
			</v-col>
		</v-row>

		<Footer v-if="!loading" />

		<v-card v-if="loading" elevation="0" width="100%" height="1000">
			<v-row justify="center" class="fill-height">
				<v-img width="400" height="400" contain :src="require('@/assets/loader.gif')"></v-img>
			</v-row>
		</v-card>
	</v-app>
</template>

<script>
import Cripto from '@/services/Cripto';
import Petro from '@/services/Petro';
import Dolar from '@/services/Dolar';
import Calculadora from '@/components/Calculadora';
import Cambios from '@/components/Cambios';
import Footer from '@/components/Footer';
import accounting from 'accounting';

	export default {
		name: 'App',
		components:{
			Calculadora,
			Cambios,
			Footer
		},
		data(){
			return {
				cripto:null,
				petro:null,
				loading:false,
				cambios:[]
			}
		},
		mounted() {
			this.init();
		},
		methods:{
			init(){
				this.loading = true;
				this.getCripto();
			},
			finish(){
				this.cambios.push(accounting.formatMoney(+this.cripto.BTC.USD*this.petro.USD.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.petro.EUR.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.petro.USD.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.petro.PTR.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.cripto.ETH.USD*this.petro.USD.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.cripto.LTC.USD*this.petro.USD.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.cripto.DASH.USD*this.petro.USD.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambios.push(accounting.formatMoney(+this.cripto.DOGE.USD*this.petro.USD.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.loading = false;
			},
			//tasa de bitcoint a dolares
			getCripto(){
				Cripto().get("/pricemulti?fsyms=BTC,ETH,DASH,DOGE,LTC&tsyms=USD").then((response) => {
					this.cripto = response.data;
					this.getPetro();
					console.log(response.data);
				}).catch(e => {
					console.log(e);
					this.loading = false;
				});
			},
			/*getDolar(){
				Dolar().get("/buy-bitcoins-online/ve/venezuela/transfers-with-specific-bank/.json").then((response) => {
					this.bank = response.data.data.ad_list;
					this.getPetro();
				}).catch(e => {
					console.log(e);
					this.loading = false;
				});
			},*/
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
					this.loading = false;
				});
			},
		}
	};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Bitter&display=swap');

	@keyframes changeColor {
		0%{
			background:#fff;       /* Último fotograma */
		}
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
		animation: changeColor 1s ease;  /* Relaciona con @keyframes */
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
<template>
	<v-app :class="loading ? '':'anim'">
		<v-row justify="center" class="mt-4">
			<div v-if="!loading" class="text-center">
				<v-avatar size="70" >
					<v-img :src="require('@/assets/AFTIM.png')"></v-img>
				</v-avatar>
			</div>
			<span class="white--text font-weight-black display-2" style="line-height:70px;margin-left: 10px">
				Aftim Calcula
			</span>
		</v-row>

		<v-row justify="center" v-if="!loading">
			<v-col cols="12" md="10" sm="12">
				<Dashboard :cambiosBs="cambiosBs" :cambiosDolar="cambiosDolar" />
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
				bolivar:null,
				cripto:null,
				petro:null,
				dolar: null,
				dolarAux: null,
				euro: null,
				tasas:{},
				loading:true,
				cambiosBs:[],
				cambiosDolar:[],
				sesion:0
			}
		},
		mounted() {
			this.init();
			setInterval(() => {
				this.init();
			}, 500000);
		},
		metaInfo() {
			return { 
				title: "Aftim calc | Calculadora de multiples monedas",
				meta: [
					{ name: 'description', content:  'Aftim calc es una calculadora de multiples monedas desarrollada en venezuela por la empresa somos sistemas C.A, incluye cripto monedas como bitcoin, litecoin, dash, dogecoin y monedas internacionales como dolares y euros.'},
					{ property: 'og:title', content: "Aftim calc | Calculadora de multiples monedas"},
					{ property: 'og:site_name', content: 'Aftim calc'},
					{property: 'og:type', content: 'website'},    
					{name: 'robots', content: 'index,follow'} 
				]
			}
		},
		/*head: {
			title: {
				inner: 'AftimCalc',
				separator:" "
			},
			// Meta tags
			meta: [
				{ name: 'Aftim Calcula', content: 'Aplicación para calcular en multiples monedas internaciones y criptomonedas' },
				{ name: 'description', content: 'A description of the page', id: 'desc' }, // id to replace intead of create element
				// ...
				// Twitter
				//{ name: 'twitter:title', content: 'Content Title' },
				// with shorthand
				//{ n: 'twitter:description', c: 'Content description less than 200 characters'},
			link: [
				{ rel: 'somos sistemas C.A', href: 'somossistemas.com', undo: false }, // undo property - not to remove the element
				{ rel: 'icon', href: require('../src/assets/AFTIM.png'), sizes: '16x16', type: 'image/png' }, 
			],
			style: [
				{ type: 'text/css', inner: 'body { background-color: #000; color: #fff}', undo: false },
			]
		},*/
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
					EUR:this.euro,
					ETH:this.cripto.ETH.USD,
					LTC:this.cripto.LTC.USD,
					DASH:this.cripto.DASH.USD,
					DOGE:this.cripto.DOGE.USD,
					USD:this.dolar,
					PTR_USD:this.petro.PTR.USD,
					EUR_USD:this.petro.EUR.USD
				}
				this.setTasas(this.tasas);

				// cambios en bolivares
				this.cambiosBs.push(accounting.formatMoney(+this.dolar,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambiosBs.push(accounting.formatMoney(+this.euro,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambiosBs.push(accounting.formatMoney(+this.cripto.BTC.USD * this.dolarAux,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambiosBs.push(accounting.formatMoney(+this.petro.PTR.BS,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambiosBs.push(accounting.formatMoney(+this.cripto.ETH.USD * this.dolarAux,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambiosBs.push(accounting.formatMoney(+this.cripto.LTC.USD * this.dolarAux,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambiosBs.push(accounting.formatMoney(+this.cripto.DASH.USD * this.dolarAux,{symbol:"Bs ",thousand:'.',decimal:','}));
				this.cambiosBs.push(accounting.formatMoney(+this.cripto.DOGE.USD * this.dolarAux,{symbol:"Bs ",thousand:'.',decimal:','}));

				// cambios en dolares
				this.cambiosDolar.push(accounting.formatMoney(1,{symbol:"$ ",thousand:'.',decimal:','}));
				this.cambiosDolar.push(accounting.formatMoney(+this.euro / +this.dolar,{symbol:"$ ",thousand:'.',decimal:','}));
				this.cambiosDolar.push(accounting.formatMoney(+this.cripto.BTC.USD,{symbol:"$ ",thousand:'.',decimal:','}));
				this.cambiosDolar.push(accounting.formatMoney(+this.petro.PTR.USD,{symbol:"$ ",thousand:'.',decimal:','}));
				this.cambiosDolar.push(accounting.formatMoney(+this.cripto.ETH.USD,{symbol:"$ ",thousand:'.',decimal:','}));
				this.cambiosDolar.push(accounting.formatMoney(+this.cripto.LTC.USD,{symbol:"$ ",thousand:'.',decimal:','}));
				this.cambiosDolar.push(accounting.formatMoney(+this.cripto.DASH.USD,{symbol:"$ ",thousand:'.',decimal:','}));
				this.cambiosDolar.push(accounting.formatMoney(+this.cripto.DOGE.USD,{symbol:"$ ",thousand:'.',decimal:','}));
				this.loading = false;
				this.sesion=1;
				this.success();
			},
			//tasa de bitcoint a dolares
			getCripto(){
				Cripto().get("/pricemulti?fsyms=BTC,ETH,DASH,DOGE,LTC&tsyms=USD").then((response) => {
					this.cripto = response.data;
					this.getDolar();
				}).catch(e => {
					console.log(e);
				});
			},
			getPetro(){
				let data = {
					"coins": ["USD", "PTR","EUR"],
					"fiats": ["BS", "USD","EUR"]
				}

				Petro().post("/price/",data).then((response) => {
					this.petro = response.data.data;
					this.euro = Math.abs(+this.petro.EUR.BS - +this.euro) + +this.euro
					this.finish();
				}).catch(e => {
					console.log(e);
				});
			},
			getDolar(){
				let prom = 0;

				Dolar().get('/ve/venezuela/transfers-with-specific-bank/.json').then(( response ) => {
					let devider = 0;
					for (let i = 0; i < response.data.data.ad_count; i++) {
						if (response.data.data.ad_list[i].data.currency === 'VES') {
							prom += parseFloat(response.data.data.ad_list[i].data.temp_price);
							devider++;
						}
					}

					prom = (prom / devider).toFixed(2);
					this.bolivar = prom;
					let dolar = (+prom / +this.cripto.BTC.USD).toFixed(2);
					this.dolarAux = dolar;
					this.dolar = dolar;
					this.getEuro();
				}).catch(e => {
					console.log(e);
				});
			},
			getEuro(){
				let prom = 0;
				Dolar().get('/es/spain/.json').then(( response ) => {
					let devider = 0;
					for (let i = 0; i < response.data.data.ad_count; i++) {
						if (response.data.data.ad_list[i].data.currency === 'EUR') {
							prom += parseFloat(response.data.data.ad_list[i].data.temp_price);
							devider++;
						}
					}

					prom = (prom / devider).toFixed(2);
					let euro = (+this.bolivar / +prom).toFixed(2);
					this.euro = euro;
					this.getPetro();
				}).catch(e => {
					console.log(e);
				});
				
			}
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
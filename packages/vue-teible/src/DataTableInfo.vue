<template>
	<div class="datatable__unit datatable__text">
		<span v-if="total">
			{{locales.showing}} <span v-text="from === to && to === total ? 'the last entry' : from + ' ' + locales.to + ' '  + to" /> {{locales.of}} {{ total }} {{locales.records}}
		</span>
		<span v-else>{{locales.no_records}}</span>
	</div>
</template>

<script>
import languages from './locales'
export default {
	props: {
		from: {
			type: Number,
			required: true
		},
		to: {
			type: Number,
			required: true
		},
		total: {
			type: Number,
			required: true
		},
		options: {
			type: Object,
			required: true
		}
	},
	data () {
		return {
			locales: languages["en"],
		}
	},
	created () {
		this.loadLocales()
	},
	methods: {
		loadLocales(){
			if (this.options.lang instanceof Object){
				this.locales = this.options.lang;
			}else{
				if(Object.keys(languages).indexOf(this.options.lang) != -1){
					this.locales = languages[this.options.lang];
				}else{
					this.locales = languages["en"];
				}
			}
		},
	}
}
</script>
// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Fonts
import 'typeface-inter'
import 'typeface-inconsolata'

// Styles
import 'ress'
import '~/assets/styles/core/_index.scss'

// Packages
import 'prismjs'

// Plugins
import VueAnimXyz from '@animxyz/vue'
import VueLocation from '~/plugins/VueLocation'
import VueMQ from '~/plugins/VueMQ'
import VueObserveVisibility from 'vue-observe-visibility'
import VueScrollactive from 'vue-scrollactive'
import VScrollLock from 'v-scroll-lock'

// Layouts
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, context) {
	Vue.use(VueAnimXyz)
	Vue.use(VueLocation)
	Vue.use(VueMQ, {
		breakpoints: {
			small: '375px',
			phone: '540px',
			tablet: '768px',
			laptop: '1024px',
			desktop: '1248px',
			large: '1440px',
			'x-large': '1600px',
			huge: '1920px',
		},
	})
	Vue.use(VueObserveVisibility)
	Vue.use(VueScrollactive)
	Vue.use(VScrollLock)

	Vue.component('Layout', DefaultLayout)

	Object.assign(context.appOptions, {
		watch: {
			$location() {
				this.onLocationChange()
			}
		},
		methods: {
			onLocationChange(event) {
				if (this.$location.hash) {
					setTimeout(() => {
						const hashElement = document.getElementById(this.$location.hash.substring(1))
						if (hashElement) {
							hashElement.scrollIntoView({
								behavior: 'smooth',
							})
						}
					}, 0)
				}
			}
		},
		mounted() {
			this.onLocationChange()
		},
	})

	if (context.isClient) {
		document.addEventListener('click', (event) => {
			if (event.target.tagName === 'A') {
				if (event.target.pathname === window.location.pathname) {
					event.preventDefault()
					history.pushState(null, null, event.target.href)
				}
			}
		})
	}
}

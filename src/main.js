import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import uviewPlus from "uview-plus";
import "./static/css/global.scss";

// 引入store
import store from "@/store/index";
// 引入api
import api from "./api/index";
import Navbar from './components/common/Navbar.vue';
import Empty from './components/common/empty.vue'

export function createApp() {
	const app = createSSRApp(App);
	app.use(uviewPlus);
	app.use(store);
	app.component('c-navbar', Navbar)
	app.component('c-empty', Empty)
	app.config.globalProperties.$api = api
	app.config.globalProperties.$copyToClipboard = function(text) {
		// Set the clipboard data.
		uni.setClipboardData({
		  // The text to be copied.
		  data: text,
		  // Callback function when the copying is successful.
		  success: () => {
			uni.showToast({
			  // The toast message to be displayed.
			  title: 'Copiado com sucesso',
			  // Icon to be displayed.
			  icon: 'none',
			  // Duration of the toast.
			  duration: 1500
			});
		  },
		  // Callback function when the copying fails.
		  fail: (err) => {
			uni.showToast({
			  // The toast message to be displayed.
			  title: 'Falha na cópia, tente novamente',
			  // Icon to be displayed.
			  icon: 'none',
			  // Duration of the toast.
			  duration: 1500
			});
			// Log the error message.
			console.error('Falha na cópia:', err);
		  },
		});
	  };
	
	return {
		app,
	};
}

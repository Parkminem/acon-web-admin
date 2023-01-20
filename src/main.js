import { createApp } from 'vue';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import router from '@/routes/index';
import '@/assets/style/reset.css';

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app');

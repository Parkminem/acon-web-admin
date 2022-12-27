import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './routes/index';
import CKEditor from '@ckeditor/ckeditor5-vue';

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(CKEditor).mount('#app');

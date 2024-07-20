import { createRouter, createWebHistory, RouterView } from 'vue-router';
import ItemsList from '@/views/ItemsList.vue';
import AboutPage from '@/views/AboutPage.vue';
import i18n, {
  SUPPORTED_LOCALES,
  getDefaultLocale,
  loadLocaleMessages
} from '@/i18n';

const routes = [
  {
    path: '/:locale?',
    component: RouterView,
    beforeEnter: (to, from, next) => {
      const paramLocale = to.params.locale;
      if (!SUPPORTED_LOCALES.includes(paramLocale)) {
        return next(getDefaultLocale());
      }

      loadLocaleMessages(i18n.global, paramLocale).then(() => {
        if (i18n.global.locale.value !== paramLocale) {
          i18n.global.locale.value = paramLocale;
          document.querySelector('html').setAttribute('lang', paramLocale);
        }
        return next();
      });
    },
    children: [
      {
        path: 'items',
        name: 'ItemsList',
        component: ItemsList,
        alias: ''
      },
      {
        path: 'about',
        name: 'AboutPage',
        component: AboutPage
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

<script setup>
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const { locale } = i18n;
import { SUPPORTED_LOCALES, loadLocaleMessages } from '@/i18n';
import { useRouter } from 'vue-router';

const router = useRouter();

const changeLocale = (event) => {
  const newLocale = event.target.value;
  loadLocaleMessages(i18n, newLocale).then(() => {
    locale.value = newLocale;
    document.querySelector('html').setAttribute('lang', newLocale);
    router.replace({ params: { locale: newLocale } }).catch(() => {
      router.push('/');
    });
    localStorage.setItem('locale', newLocale);
  });
};
</script>

<template>
  <select @change="changeLocale">
    <option
      v-for="supportedLocale in SUPPORTED_LOCALES"
      :key="`locale-${supportedLocale}`"
      :value="supportedLocale"
      :selected="supportedLocale == locale"
    >
      {{ supportedLocale }}
    </option>
  </select>
</template>

<style scoped>
select {
  font-size: 18px;
  width: 67px;
  background: #0096f0;
  outline: none;
  padding: 8px;
  cursor: pointer;
  margin-left: 20px;
  border: none;
}
</style>

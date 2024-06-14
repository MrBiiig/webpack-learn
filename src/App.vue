<template>
	<div id="app">
		<Header />
		<main>
			<h1>Hello, Webpack with Vue 3!你好</h1>
			<img :src="exampleImage" alt="Example" />
			<p>Today's date is: {{ formattedDate }}</p>
		</main>
		<Footer />
	</div>
</template>

<script>
import { ref } from 'vue';
import exampleImage from './image.png';
import Header from '@components/Header.vue';
import Footer from '@components/Footer.vue';
import { formatDate } from '@utils/helpers.js';

export default {
	components: {
		Header,
		Footer,
	},
	setup() {
		const formattedDate = ref(formatDate(new Date()));
		const image = ref(exampleImage);
		return { formattedDate, exampleImage: image };
	},
};
</script>

<style>
main {
	padding: 2rem;
	text-align: center;
}

h1 {
	color: white;
}
</style>

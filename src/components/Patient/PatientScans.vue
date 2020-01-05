<template>
	<hooper class="carousel" :infiniteScroll="true">
		<slide
			v-for="scan in scans"
			:key="scan"
			:style="imgStyle(scan)"
			class="carousel-slide"
		>
		</slide>
		<hooper-navigation slot="hooper-addons" />
		<hooper-pagination slot="hooper-addons" />
	</hooper>
</template>

<script>
import {
	Hooper,
	Slide,
	Navigation as HooperNavigation,
	Pagination as HooperPagination
} from "hooper";
import "hooper/dist/hooper.css";
import getScanImageLocation from "../../functions/scans";

export default {
	name: "PatientScans",
	components: { Hooper, Slide, HooperNavigation, HooperPagination },
	props: {
		scans: {
			type: Array
		}
	},
	methods: {
		imgSrc(filename) {
			return getScanImageLocation(filename);
		},
		imgStyle(filename) {
			return {
				"background-image": `url(${this.imgSrc(filename)})`
			};
		}
	},
	data() {
		return {
			slide: 1
		};
	}
};
</script>

<style scoped>
.carousel {
	flex-grow: 1;
}

.carousel-slide {
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50% 50%;
}
</style>

<template>
	<q-page>
		<img
			src="statics/floorplan.png"
			alt="UI Clinic floorplan"
			id="floorplan"
			ref="mapImg"
		/>
		<div class="rooms-wrapper" v-if="this.imgSize.height > 0">
			<RoomMapItem
				v-for="room in rooms"
				:key="room.id"
				:room="room"
				:mapDimensions="imgSize"
				@startAlarm="$emit('startAlarm')"
				@stopAlarm="$emit('stopAlarm')"
			/>
		</div>
	</q-page>
</template>

<script>
import RoomMapItem from "./RoomMapItem";
export default {
	name: "DepartmentMap",
	components: { RoomMapItem },
	props: {
		rooms: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			imgSize: {
				width: 0,
				height: 0
			}
		};
	},
	methods: {
		setImgSize() {
			const img = this.$refs.mapImg;
			const w = img.clientWidth;
			const h = w / (img.width / img.height);
			this.imgSize = {
				width: w,
				height: h
			};
			this.$set(this.imgSize, "width", w);
			this.$set(this.imgSize, "height", h);
		}
	},
	mounted() {
		this.$nextTick(() => this.setImgSize());

		// Register an event listener when the Vue component is ready
		window.addEventListener("resize", this.setImgSize);
	},
	beforeDestroy() {
		// Unregister the event listener before destroying this Vue instance
		window.removeEventListener("resize", this.setImgSize);
	}
};
</script>

<style scoped>
#floorplan {
	position: absolute;
	width: 100%;
	min-width: 1000px;
}
</style>

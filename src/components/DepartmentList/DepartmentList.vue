<template>
	<q-page class="room-list">
		<RoomListItem
			v-for="room in this.rooms"
			:key="room.id"
			:room="room"
			@startAlarm="startAlarm"
			@stopAlarm="stopAlarm"
		/>
		<audio id="alarm-audio" src="statics/alarm.mp3" preload="auto" />
	</q-page>
</template>

<script>
import RoomListItem from "./RoomListItem";

export default {
	name: "DepartmentList",
	components: { RoomListItem },
	props: {
		rooms: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			playAlarm: false
		};
	},
	methods: {
		startAlarm() {
			document.querySelector("#alarm-audio").play();
		},
		stopAlarm() {
			document.querySelector("#alarm-audio").pause();
		}
	}
};
</script>

<style scoped lang="scss">
.room-list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: stretch;
	align-content: flex-start;
}
audio {
	position: absolute;
	visibility: hidden;
}
</style>

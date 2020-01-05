<template>
	<q-page class="room-list">
		<RoomListItem
			v-for="room in this.rooms"
			:key="room.id"
			:room="room"
			@startAlarm="$emit('startAlarm')"
			@stopAlarm="$emit('stopAlarm')"
		/>
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
</style>

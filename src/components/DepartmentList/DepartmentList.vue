<template>
	<q-page class="room-list">
		<RoomListItem v-for="room in this.rooms" :key="room.id" :room="room" />
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

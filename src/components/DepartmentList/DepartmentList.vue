<template>
	<q-page>
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

<style scoped></style>

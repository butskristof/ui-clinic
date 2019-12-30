<template>
	<q-page>
		<Room v-for="room in this.rooms" :key="room.id" :room="room" />
	</q-page>
</template>

<script>
import Room from "./RoomListItem";

export default {
	name: "DepartmentList",
	components: { Room },
	props: {
		rooms: {
			type: Array,
			required: true
		}
	}
};
</script>

<style scoped></style>

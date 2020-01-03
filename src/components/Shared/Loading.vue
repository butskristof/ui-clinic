<template>
	<div class="loading-wrapper absolute-center">
		<q-spinner color="primary" size="3em" />
	</div>
</template>

<script>
export default {
	name: "Loading"
};
</script>

<style scoped lang="scss">
.loading-wrapper {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	align-content: center;
}
</style>

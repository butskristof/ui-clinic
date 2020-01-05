<template>
	<div id="error-message" class="absolute-center">
		<div class="text-h6">
			<slot />
		</div>

		<q-btn
			color="primary"
			icon="refresh"
			label="Try again"
			class="q-mt-md"
			@click="$emit('tryAgain')"
		/>
	</div>
</template>

<script>
export default {
	name: "NoContent"
};
</script>

<style scoped lang="scss">
#error-message {
	width: 100%;
	text-align: center;
}
</style>

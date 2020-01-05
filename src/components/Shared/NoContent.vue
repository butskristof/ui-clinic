<template>
	<div id="error-message" class="absolute-center">
		<span class="text-h6">
			<slot />
		</span>

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

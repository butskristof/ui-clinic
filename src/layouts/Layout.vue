<template>
	<q-layout view="hHh lpr fff">
		<q-header class="bg-primary text-white" height-hint="98">
			<q-toolbar>
				<q-btn
					dense
					flat
					round
					icon="menu"
					@click="drawerOpen = !drawerOpen"
				/>

				<q-toolbar-title>
					UI Clinic
				</q-toolbar-title>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="drawerOpen" side="left" overlay behavior="mobile">
			<q-scroll-area
				style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd"
			>
				<q-list>
					<q-item
						v-for="nav in navigation"
						:key="nav.label"
						:to="nav.to"
						clickable
						exact
					>
						<q-item-section avatar>
							<q-icon :name="nav.icon" />
						</q-item-section>
						<q-item-section>
							<q-item-label>{{ nav.label }}</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-scroll-area>

			<q-img
				class="absolute-top"
				src="statics/mountains.jpg"
				style="height: 192px"
			>
				<div class="absolute-bottom bg-transparent">
					<q-avatar size="56px" class="q-mb-sm">
						<img
							src="https://randomuser.me/api/portraits/lego/0.jpg"
						/>
					</q-avatar>
					<div class="text-weight-bold">Kristof Buts</div>
					<div>@butskristof</div>
				</div>
			</q-img>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
export default {
	name: "Layout",

	data() {
		return {
			drawerOpen: false,
			navigation: [
				{
					label: "Departments",
					icon: "list",
					to: "/"
				},
				{
					label: "Settings",
					icon: "settings",
					to: "/settings"
				}
			]
		};
	}

	// TODO active state in drawer
};
</script>

const routes = [
	{
		path: "/",
		component: () => import("layouts/Layout.vue"),
		children: [
			{
				path: "",
				name: "Clinic",
				component: () => import("pages/PageClinic.vue")
			},
			{
				path: "/settings",
				component: () => import("pages/PageSettings.vue")
			},
			{
				path: "/department/:id",
				props: true,
				name: "Department",
				component: () => import("pages/PageDepartment.vue")
			},
			{
				path: "/patient/:id",
				props: true,
				name: "Patient",
				component: () => import("pages/PagePatient.vue")
			}
		]
	}
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
	routes.push({
		path: "*",
		component: () => import("pages/Error404.vue")
	});
}

export default routes;

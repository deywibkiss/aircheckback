exports.render = function(req, res) {

    res.render('index', {
		title: 'Framework',
		categories: [
			{ key: 'practices', name: "Best Practices", color: "purple" },
			{ key: 'grid', name: "Sistema de Grillas", color: "dark-blue" },
			{ key: 'colors', name: "Paleta de colores", color: "green" },
			{ key: 'typo', name: "Tipografías", color: "dark-green" },
			{ key: 'icons', name:  "Íconos", color: "purple" },
			{ key: 'boxes', name: "Estilos de caja", color: "yellow" },
			{ key: 'buttons', name: "Botones", color: "blue" },
			{ key: 'openings', name: "Aperturas", color: "red" },
			{ key: 'forms', name:  "Formularios", color: "dark-blue" },
			{ key: 'widgets', name:  "Widgets", color: "dark-blue" }
		],
		lessPaths: [
			{ key: 'layout', name: "Layout", path: "./resources/less/framework/layout/" },
			{ key: 'fonts', name: "Fonts", path: "./resources/less/framework/layout/fonts/" },
			{ key: 'fonts-files', name: "Fonts (Fonts Files)", path: "./public/fonts/" },
			{ key: 'content', name: "Content", path: "./resources/less/framework/content/" },
			{ key: 'mixins', name:  "Mixins", path: "./resources/less/framework/mixins/" },
			{ key: 'pages', name: "Pages", path: "./resources/less/framework/pages/" },
			{ key: 'vendor', name: "Vendor", path: "./resources/less/framework/vendor/" },
			{ key: 'widgets', name: "Widgets", path: "./resources/less/framework/widgets/" },
			{ key: 'widgets-article', name: "Widgets (Article)", path: "./resources/less/framework/widgets/article/" },
			{ key: 'root', name:  "Root", path: "./resources/less/framework/" }
		],
		version: '0.0.1'
	});
};
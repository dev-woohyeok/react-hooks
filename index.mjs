import MyReact from './MyReact.mjs';

function FunctionalComponent() {
	return {
		render: () => {
			console.log('render');
		},
	};
}

let App = MyReact.render(FunctionalComponent);

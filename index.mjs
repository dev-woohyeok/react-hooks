import MyReact, { useState } from './MyReact.mjs';

function FunctionalComponent() {
	const [count, setCount] = useState(0);
	const [text, setText] = useState('foo');

	return {
		click: () => setCount(count + 1),
		type: (txt) => setText(txt),
		render: () => {
			console.log('render', { count, text });
		},
	};
}

let App = MyReact.render(FunctionalComponent);
App.click();
App = MyReact.render(FunctionalComponent);
App.type('bar');
App = MyReact.render(FunctionalComponent);

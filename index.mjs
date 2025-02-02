import MyReact from './MyReact.mjs';
import { useState } from './useState.mjs';

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
// _val 만 참조함으로, setState 로 변경되는 결과는 모든 useState 에 영향을 미친다.

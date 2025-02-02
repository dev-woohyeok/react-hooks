import MyReact, { useEffect, useState } from './MyReact.mjs';

function FunctionalComponent() {
	const [count, setCount] = useState(0);
	const [text, setText] = useState('foo');
	// useState는 순서가 중요함
	// Why? 매랜더링 마다 모든 훅은 같은 순서에서 호출되기 때문에
	// 배열로 관리하는 이유는 속도를 빠르게하기위해서
	// 1fps 안에 랜더링을 해야하기 때문에 가벼워야함
	// 그래서 최소한의 메모리를 사용해서 관리해야함
	// 그래서 배열의 순서로만 관리하기로함

	useEffect(() => {
		console.log('effect', { count });
		return () => console.log('cleanup', { count });
	}, [count]);

	return {
		click: () => setCount((prev) => prev + 1),
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

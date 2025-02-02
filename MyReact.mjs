let hooks = [],
	currentHook = 0; // hooks 배열과 currentHook 변수를 선언

const MyReact = {
	render(Component) {
		// MyReact 객체에는 render 메서드가 존재
		const Comp = Component(); // render 메서드의 파라미터로 전달된 콜백함수를 실행
		Comp.render(); // 실행된 콜백함수의 결과로 반환 받은 객체의 메서드 render를 실행
		currentHook = 0; // currentHook을 초기화
		// 초기화를 안할시에 제대로 hooks 를 참조하지 못함
		// 0, 1, => 2,3 => 4,5 이런식으로 증가
		return Comp; // 실행된 콜백함수의 결과를 반환
	},
};

export const useState = (initialValue) => {
	hooks[currentHook] = hooks[currentHook] || initialValue; // 선언된 훅이 없는 경우 현재 훅 위치에 initialValue 를 할당함
	const hookIndex = currentHook; // 현재 훅 위치를 저장
	const setState = (newState) => {
		// 현재 훅 위치에서만 사용하는 setState 함수를 선언
		hooks[hookIndex] = newState; // 훅 위치에 새로운 상태를 할당
	};
	// 현재 훅을 반환하고 currentHook 을 증가시킴
	// 다음 useState 호출 시 다음 훅 위치에 상태를 할당하기 위함
	// 이렇게 함으로써 useState 가 여러 번 호출되어도 각각의 상태를 관리할 수 있음
	return [hooks[currentHook++], setState];
};

export default MyReact;

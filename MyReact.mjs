let _hooks = [],
	_currentHook = 0; // _hooks 배열과 _currentHook 변수를 선언

const MyReact = {
	render(Component) {
		// MyReact 객체에는 render 메서드가 존재
		const Comp = Component(); // render 메서드의 파라미터로 전달된 콜백함수를 실행
		Comp.render(); // 실행된 콜백함수의 결과로 반환 받은 객체의 메서드 render를 실행
		_currentHook = 0; // _currentHook을 초기화
		// 초기화를 안할시에 제대로 _hooks 를 참조하지 못함
		// 0, 1, => 2,3 => 4,5 이런식으로 증가
		return Comp; // 실행된 콜백함수의 결과를 반환
	},
};

export const useState = (initialValue) => {
	_hooks[_currentHook] = _hooks[_currentHook] || initialValue; // 선언된 훅이 없는 경우 현재 훅 위치에 initialValue 를 할당함
	const hookIndex = _currentHook; // 현재 훅 위치를 저장
	// 차후 setState 함수를 호출할때 접근할 수 있도록 위치를 저장
	const setState = (newState) => {
		// 현재 훅 위치에서만 사용하는 setState 함수를 선언
		if (typeof newState === 'function')
			_hooks[hookIndex] = newState(_hooks[hookIndex]);
		else _hooks[hookIndex] = newState; // 훅 위치에 새로운 상태를 할당
	};
	// 현재 훅을 반환하고 _currentHook 을 증가시킴
	// 다음 useState 호출 시 다음 훅 위치에 상태를 할당하기 위함
	// 이렇게 함으로써 useState 가 여러 번 호출되어도 각각의 상태를 관리할 수 있음
	return [_hooks[_currentHook++], setState];
};

export const useEffect = (callback, depArr) => {
	const hasNoDeps = !depArr; // 의존성 배열이 없는 경우
	const prevDeps = _hooks[_currentHook] // 이전 훅의 의존성 배열 값을 가져옴
		? _hooks[_currentHook].deps
		: undefined;

	const prevCleanUp = _hooks[_currentHook] // 이전 훅의 cleanUp 함수를 가져옴
		? _hooks[_currentHook].cleanUp
		: undefined;

	const hasChangedDeps = prevDeps // 의존성 배열이 있지만 변경 사항 있는 경우
		? depArr.some((dep, i) => dep !== prevDeps[i]) // 변경사항이 발생하면 true
		: true; // 초기 랜더링시에 true 실행

	if (hasNoDeps || hasChangedDeps) {
		if (prevCleanUp) prevCleanUp(); // 실행할 cleanUp 함수가 있으면 실행
		const cleanUp = callback(); // 콜백함수를 실행해서 cleanUp 함수를 가져옴
		_hooks[_currentHook] = { deps: depArr, cleanUp }; // hooks 배열에 의존성 배열과 cleanUp 함수를 저장함
	}
	_currentHook++;
};
// useState 와 useEffect 훅들 모두 hooks 에 순서대로 담김
// render 될때마다 해당 훅들을 순서대로 다시 실행함
// 그래서 순서대로 실행되어야 이전 정보가 제대로 저장될 수 있음

export default MyReact;

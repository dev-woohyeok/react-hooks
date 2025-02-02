let _val; // state 값을 저장할 변수
export const useState = (initialValue) => {
	if (!_val) {
		// _val 값이 없다면(초기 랜더링)
		_val = initialValue; // 초기값으로 설정
	}

	function setValue(newVal) {
		// state 값을 업데이트하는 함수
		_val = newVal; // 새로운 값을 할당
	}

	return [_val, setValue]; // state 과 setState 함수를 반환
};

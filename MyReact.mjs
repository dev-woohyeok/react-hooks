const MyReact = {
	render(Component) {
		// MyReact 객체에는 render 메서드가 존재
		const Comp = Component(); // render 메서드의 파라미터로 전달된 콜백함수를 실행
		Comp.render(); // 실행된 콜백함수의 결과로 반환 받은 객체의 메서드 render를 실행
		return Comp; // 실행된 콜백함수의 결과를 반환
	},
};

export default MyReact;

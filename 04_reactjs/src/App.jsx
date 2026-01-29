import Car from "./components/car";

const App = () => {
	return (
		<div>
			<h1>Welcome To The Car Store</h1>

			<ul>
				<Car />
				<Car />
				<Car />
			</ul>
		</div>
	);
};

export default App;

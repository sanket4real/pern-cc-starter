import express from "express";

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());

let cars = [
	{ id: 1, make: "Toyota", model: "Fortuner", year: 2022, price: 300000 },
	{ id: 2, make: "Honda", model: "City", year: 2012, price: 150000 },
	{ id: 3, make: "Hyundai", model: "i10", year: 2014, price: 130000 },
	{ id: 4, make: "TATA", model: "Harrier", year: 2024, price: 1000000 },
];

app.get("/", (req, res) => {
	res.send("Hello from the cars api");
});

router.get("/", (req, res) => {
	if (!cars) res.status(404).send("No car Data Found");
	res.json(cars);
});

router.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const car = cars.find((car) => car.id === id);

	if (!car) res.status(404).send("Car Not Found");

	res.send(car);
});

router.post("/", (req, res) => {
	const { make, model, year, price } = req.body;

	if (!make || !model || !year || !price) {
		return res.status(400).json({ error: "Missing Car Data" });
	}

	const newCar = {
		id: cars.length + 1,
		make,
		model,
		year,
		price,
	};

	cars.push(newCar);
	res.status(201).json(newCar);
});

router.put("/:id", (req, res) => {
	res.send("Updated the car");
});

router.delete("/:id", (req, res) => {
	res.send("Deleted the car");
});

app.use("/api/v1/cars", router);

app.listen(port, () =>
	console.log(`Server is running on http://localhost:${port}`)
);

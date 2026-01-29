import express from "express";
import { cars } from "../03_postgresql/schema.js";
import { db } from "../03_postgresql/db.js";

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
	const timeStamp = new Date().toISOString();

	console.log(`[${timeStamp}] ${req.method} ${req.url}`);
	next();
});

app.get("/", (req, res) => {
	res.send("Hello from the cars api");
});

router.get("/", async (req, res) => {
	const allCars = await db.select().from(cars);

	res.json(allCars);
});

router.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const car = cars.find((car) => car.id === id);

	if (!car) res.status(404).send("Car Not Found");

	res.send(car);
});

router.post("/", async (req, res) => {
	const { make, model, year, price } = req.body;

	if (!make || !model || !year || !price) {
		return res.status(400).json({ error: "Missing Car Data" });
	}

	const [newCar] = await db
		.insert(cars)
		.values({ make, model, year, price })
		.returning();

	res.status(201).json(newCar);
});

router.put("/:id", (req, res) => {
	res.send("Updated the car");
});

router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	const index = cars.findIndex((car) => car.id === id);

	if (index === -1) {
		return res.status(404).json({ error: "Car Not Found" });
	}

	const deleted = cars.splice(index, 1)[0];

	res.json({ message: "Car Deleted", car: deleted });
});

app.use("/api/v1/cars", router);

app.listen(port, () =>
	console.log(`Server is running on http://localhost:${port}`),
);

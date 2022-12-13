import axios from "axios";
import { useState } from "react";
import "./App.css";

const API_URL = "https://lakshay05.pythonanywhere.com";

const config = {
	headers: {
		Accept: "application/x-www-form-urlencoded; charset=UTF-8",
		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
	},
};

function App() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		age: "",
		batchType: "",
	});
	const [payForm, setPayForm] = useState({
		email: "",
	});

	const [detailFormSubmit, setDetailFormSubmit] = useState(false);
	const [payFormubmit, setPayFormSubmit] = useState(false);
	const [detailsResesponseMessage, setDetailsResponseMessage] = useState("");
	const [payResesponseMessage, setPayResponseMessage] = useState("");

	const handleForm = (e) => {
		setForm((formProps) => ({ ...formProps, [e.target.name]: e.target.value }));
	};

	const handlePayForm = (e) => {
		setPayForm((payFormProps) => ({
			...payFormProps,
			[e.target.name]: e.target.value,
		}));
	};

	const handleDetailsFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${API_URL}/addUser`, form, config);

			setDetailsResponseMessage(res.data);
			setDetailFormSubmit(true);
		} catch (e) {
			setDetailsResponseMessage(e.response.data);
			setDetailFormSubmit(true);
		}
	};

	const handlePayFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${API_URL}/pay`, payForm, config);

			setPayResponseMessage(res.data);
			setPayFormSubmit(true);
		} catch (e) {
			setPayResponseMessage(e.response.data);
			setPayFormSubmit(true);
		}
	};

	return (
		<section className="form-section">
			<h1 className="heading">Admission form</h1>
			{detailFormSubmit ? (
				<div className="responseConatiner">
					<div>{detailsResesponseMessage}</div>

					<button
						className="reset-button"
						onClick={() => {
							setDetailFormSubmit(false);
						}}
					>
						Reset
					</button>
				</div>
			) : (
				<form autoComplete="false" onSubmit={handleDetailsFormSubmit}>
					<div className="input-block">
						<label className="label">Name</label>
						<input
							className="input"
							type="text"
							name="name"
							value={form.name}
							onChange={handleForm}
							required
						/>
					</div>

					<div className="input-block">
						<label className="label">Email</label>
						<input
							className="input"
							type="email"
							name="email"
							value={form.email}
							onChange={handleForm}
							required
						/>
					</div>

					<div className="input-block">
						<label className="label">Age</label>
						<input
							className="input"
							type="text"
							name="age"
							value={form.age}
							onChange={handleForm}
							required
						/>
					</div>

					<div className="input-block">
						<label className="label">Batch</label>

						<div className="radio-container">
							<div className="radio-input">
								<input
									type="radio"
									id="6-7am"
									name="batchType"
									value="6-7am"
									onChange={handleForm}
									required
								/>
								<label className="radio-label" htmlFor="6-7am">
									6-7 am
								</label>
							</div>

							<div className="radio-input">
								<input
									type="radio"
									id="7-8am"
									name="batchType"
									value="7-8am"
									onChange={handleForm}
									required
								/>
								<label className="radio-label" htmlFor="7-8am">
									7-8 am
								</label>
							</div>

							<div className="radio-input">
								<input
									type="radio"
									id="8-9am"
									name="batchType"
									value="8-9am"
									onChange={handleForm}
									required
								/>
								<label className="radio-label" htmlFor="8-9am">
									8-9 am
								</label>
							</div>

							<div className="radio-input">
								<input
									type="radio"
									id="5-6pm"
									name="batchType"
									value="5-6pm"
									onChange={handleForm}
									required
								/>
								<label className="radio-label" htmlFor="5-6pm">
									5-6 pm
								</label>
							</div>
						</div>
					</div>

					<button className="submit-button">Register</button>
				</form>
			)}

			<h1 className="heading">Pay 500</h1>
			{payFormubmit ? (
				<div className="responseConatiner">
					<div>{payResesponseMessage}</div>

					<button
						className="reset-button"
						onClick={() => {
							setPayFormSubmit(false);
						}}
					>
						Reset
					</button>
				</div>
			) : (
				<form autoComplete="false" onSubmit={handlePayFormSubmit}>
					<div className="input-block">
						<label className="label">Email</label>
						<input
							className="input"
							type="email"
							name="email"
							value={payForm.email}
							onChange={handlePayForm}
							required
						/>
					</div>
					<button className="submit-button">Pay</button>
				</form>
			)}
		</section>
	);
}

export default App;

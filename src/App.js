import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Home from "./Components/Home";
import Order from "./Components/Order";

const emptyFormValues = {
  name: "",
  size: "",
  topping1: false,
  topping2: false,
  topping3: false,
  topping4: false,
  topping5: false,
  topping6: false,
  topping7: false,
  special: "",
};
const errValues = {
  name: "",
  size: "",
};


const schema = yup.object().shape({
  name: yup
    .string()
    .required("Must enter name")
    .trim()
    .min(2, "name must be at least 2 characters")
    .required(),
  size: yup
    .string()
    .oneOf(["Small", "Medium", "Large", "Extra Large"])
    .required("Must choose one"),
  topping1: yup.boolean(),
  topping2: yup.boolean(),
  topping3: yup.boolean(),
  topping4: yup.boolean(),
  topping5: yup.boolean(),
  topping6: yup.boolean(),
  topping7: yup.boolean(),
  special: yup.string().trim(),
});





const App = () => {
  const [formValues, setFormValues] = useState(emptyFormValues);
  const [errors, setErrors] = useState(errValues);

  const handleChange = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = (event) => {
    axios
      .post("https://reqres.in/api/orders", formValues)
      .then(setFormValues(emptyFormValues))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formValues]);

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };
  return (
    <div className="app">
      <h1>Lambda Eats</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link> 
        
        <Link to="pizza" id="order-pizza">
          Order
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="pizza"
          element={
            <Order
              values={formValues}
              change={handleChange}
              submit={handleSubmit}
              disabled={buttonDisabled}
              errors={errors}
            />
          }
        />
      </Routes>
    </div>
  );
};
export default App;

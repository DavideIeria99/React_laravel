import { useState } from "react";

const useInput = (initalValue) => {
	const [value, setValue] = useState(initalValue);

	const handleChange = (event) => {
		setValue(event.target.value);
	};
	const count = (event) => {
		return event.length;
	};

	return {
		value,
		count: count,
		onChange: handleChange,
	};
};

export default useInput;

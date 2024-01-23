import { useState } from "react";

const useInput = (initalValue) => {
	const [value, setValue] = useState(initalValue);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return {
		value,
		onChange: handleChange,
	};
};

export default useInput;

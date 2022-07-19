import axios from "axios";

export const axiosHelper = async (url) => {
	try {
		const { data: response } = await axios.get(url); 
		return response;
	} catch (error) {
		console.log(error);
	}
};

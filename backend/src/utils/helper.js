export const removeUndefined = (obj) => {
	Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}));
	return obj;
};

export const generateRandomNumber = (length) => {
	let result = '';
	const characters = '0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++)
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	return result;
};

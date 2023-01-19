/**
 * Return a deep copy of the non plain old javascript object, serialized.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/structuredClone for details on structuredClone (available starting in node 17)
 */
export const serializeNonPOJO = (obj: any): any => {
	// return JSON.parse(JSON.stringify(obj));
	return structuredClone(obj);
};

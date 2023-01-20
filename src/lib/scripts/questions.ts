export const QUESTION_TYPES = Object.freeze({
	MULTIPLE_CHOICE: 'multipleChoice',
	FREE_RESPONSE: 'freeResponse',
	ASSISTED_RESPONSE: 'assistedResponse'
});

export type Question = {
	title?: string;
	question?: string;
	questionType: (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];
	options?: string[];
	answers?: string[];
};

/**
 * Check if a response is correct
 */
export function checkResponse(
	response = '',
	correctResponses: string[] = [],
	caseSensitive = false,
	exactResponseOnly = false
): boolean {
	let transformedResponse = caseSensitive ? response : response.toLowerCase();
	let transformedCorrectResponses = caseSensitive
		? correctResponses
		: correctResponses.map((a) => a.toLowerCase());
	if (!exactResponseOnly) {
		// remove all punctuation marks
		transformedResponse = transformedResponse.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();
		transformedCorrectResponses = transformedCorrectResponses.map((a) =>
			a.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim()
		);
	}
	return transformedCorrectResponses.includes(transformedResponse);
}

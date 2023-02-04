import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

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
	console.log({ exactResponseOnly });
	let transformedResponse = caseSensitive ? response : response.toLowerCase();
	let transformedCorrectResponses = caseSensitive
		? correctResponses
		: correctResponses.map((a) => a.toLowerCase());
	if (!exactResponseOnly) {
		// remove all punctuation marks
		transformedResponse = transformedResponse.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '').trim();
		console.log({ transformedResponse });
		transformedCorrectResponses = transformedCorrectResponses.map((a) =>
			a.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '').trim()
		);
		console.log({ transformedCorrectResponses });
	}
	return transformedCorrectResponses.includes(transformedResponse);
}

export const getMarkdownProcessor = () => ({
	processor: unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeStringify, { allowDangerousHtml: true }),
	render: function (markdown: string) {
		return this.processor.processSync(markdown).toString();
	}
});

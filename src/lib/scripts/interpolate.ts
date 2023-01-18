const reTemplate = /{([\s\S]+?)}/g;

/**
 * Template interpolation helper
 * @param  {string} str               eg. This is {editable}
 * @param  {Object} templateContext   eg. { editable: 'value' }
 * @return {string}
 */
export default function interpolate(str: string, templateContext?: { [k: string]: any }): string {
	if (!str) return '';
	return str
		.replace(reTemplate, (match: string, submatch: string) =>
			templateContext?.[submatch] != null ? templateContext?.[submatch] : ''
		)
		.replace(/[^=&|?]+=(&|$)/g, '')
		.replace(/&$/, '');
}

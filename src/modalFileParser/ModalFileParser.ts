class ModalFileParser {
	contents: string;

	constructor() {
		this.contents = "";
	}

	selectBetweenStrings(str: string, start: string, end: string) {
		return str.substring(str.indexOf(start) + 1, str.lastIndexOf(end));
	}

	parseHtmlBlocks() {
		const { contents } = this;

		const matcher = /^```(?:js|html)\n([\s\S]*?)```$/gm;
		const matches = contents.match(matcher);

		if (matches)
			return matches.map((match) => {
				const matchTrimmed = match.trim();
				const matchTrimmedLength = matchTrimmed.length;
				const betweenCodeBlock = matchTrimmed.substring(
					7,
					matchTrimmedLength - 3
				);
				const removedNewLines = betweenCodeBlock.replace(
					/[\t\n]+/g,
					""
				);
				return removedNewLines;
			});

		return [];
	}

	parseJavaScriptBlocks() {
		const { contents } = this;

		const matcher = /^```(?:js|javascript)\n([\s\S]*?)```$/gm;
		const matches = contents.match(matcher);

		if (matches) {
			return matches.map((match) => {
				const matchTrimmed = match.trim();
				const matchTrimmedLength = matchTrimmed.length;
				const betweenCodeBlock = matchTrimmed.substring(
					13,
					matchTrimmedLength - 3
				);

				try {
					const func = eval(`async (ctx, obsidian) => { ${betweenCodeBlock} }`);
					return func;
				} catch (err) {
					// do nothing with error to not fill up the dev console.
					console.error(err);
					// stub function
					return new Function("ctx", "obsidian", "return;");
				}
			});
		}

		return [];
	}

	parse(contents: string) {
		this.contents = contents || "";

		const htmlBlocks = this.parseHtmlBlocks();
		const jsBlocks = this.parseJavaScriptBlocks();

		return {
			htmlBlocks,
			jsBlocks,
		};
	}
}

export default ModalFileParser;

import { TextCaseKind } from "./textCaseKind";

export class CaseConverter {

    public changeCase(text: string, caseKind: TextCaseKind): string {
        if (text.length === 0) {
            throw Error("Please select a non-empty text to change case!");
        }
        let splitter: string | RegExp = /[\W\s]+/;
        let shouldBeLowerFirstChar = false;
        let isSnakeOrKebab = false;
        // Special handling for SentenceCase: capitalize first letter of each sentence
        if (caseKind === TextCaseKind.SentenceCase) {
            let result = '';
            let i = 0;
            let capitalizeNext = true;
            while (i < text.length) {
                const ch = text[i];
                if (capitalizeNext && /[A-Za-z]/.test(ch)) {
                    result += ch.toUpperCase();
                    capitalizeNext = false;
                    i++;
                    continue;
                }
                result += ch;
                if (/[.!?]/.test(ch)) {
                    // collapse any following whitespace to a single space and set next char to be capitalized
                    let j = i + 1;
                    while (j < text.length && text[j] === ' ') {
                        j++;
                    }
                    if (j < text.length) {
                        result += ' ';
                        capitalizeNext = true;
                        i = j;
                        continue;
                    }
                }
                i++;
            }
            return result.trimEnd();
        }
        switch (caseKind) {
            case TextCaseKind.Uppercase:
                return text.toUpperCase();
            case TextCaseKind.LowerCase:
                return text.toLowerCase();
            case TextCaseKind.StartCase:
                splitter = ' ';
                break;
            case TextCaseKind.PascalCase:
                splitter = /(?<=[a-z])(?=[A-Z])|[^A-Za-z0-9]+/;
                break;
            case TextCaseKind.CamelCase:
                splitter = /(?<=[a-z])(?=[A-Z])|[^A-Za-z0-9]+/;
                shouldBeLowerFirstChar = true;
                break;
            case TextCaseKind.SnakeCase:
            case TextCaseKind.KebabCase:
            default:
                splitter = /(?<=[a-z])(?=[A-Z])|[^A-Za-z0-9]+/;
                isSnakeOrKebab = true;
                shouldBeLowerFirstChar = true;
                break;
        }
        let splits = text.split(splitter).map(y => y.trim()).filter(x => x.length > 0);
        if (splits.length === 0) {
            throw Error("Please select a non-empty text to change case!");
        }
        for (let i = 0; i < splits.length; i++) {
            let firstChar: string = "";
            if (i === 0 && shouldBeLowerFirstChar) {
                firstChar = splits[0][0].toLowerCase();
            }
            else {
                if (isSnakeOrKebab) {
                    firstChar = splits[i][0].toLowerCase();
                }
                else {
                    firstChar = splits[i][0].toUpperCase();
                }
            }
            var restChars = splits[i].slice(1);
            if (caseKind === TextCaseKind.CamelCase ||
                caseKind === TextCaseKind.PascalCase ||
                caseKind === TextCaseKind.SnakeCase ||
                caseKind === TextCaseKind.KebabCase ||
                caseKind === TextCaseKind.StartCase) {
                restChars = restChars.toLowerCase();
            }
            else if (caseKind === TextCaseKind.SentenceCase && i === splits.length - 1) {
                if (text.trim().endsWith('.')) {
                    restChars = restChars + '.';
                }
            }
            splits[i] = firstChar + restChars;
        }
        let joinChar = '';
        switch (caseKind) {
            case TextCaseKind.SnakeCase:
                joinChar = '_';
                break;
            case TextCaseKind.KebabCase:
                joinChar = '-';
                break;
            case TextCaseKind.StartCase:
                joinChar = ' ';
                break;
            case TextCaseKind.CamelCase:
            case TextCaseKind.PascalCase:
            default:
                break;
        }
        return splits.join(joinChar);
    }
}
import * as assert from 'assert';
import { CaseConverter } from '../caseConverter';
import { TextCaseKind } from '../textCaseKind';

suite('CaseConverter Test Suite', () => {
	const converter = new CaseConverter();

	// Test UPPERCASE conversion
	suite('Uppercase', () => {
		test('should convert simple text to uppercase', () => {
			const result = converter.changeCase('hello', TextCaseKind.Uppercase);
			assert.strictEqual(result, 'HELLO');
		});

		test('should convert mixed case to uppercase', () => {
			const result = converter.changeCase('HeLLo WoRLd', TextCaseKind.Uppercase);
			assert.strictEqual(result, 'HELLO WORLD');
		});

		test('should convert camelCase to uppercase', () => {
			const result = converter.changeCase('myVariable', TextCaseKind.Uppercase);
			assert.strictEqual(result, 'MYVARIABLE');
		});

		test('should convert snake_case to uppercase', () => {
			const result = converter.changeCase('my_variable', TextCaseKind.Uppercase);
			assert.strictEqual(result, 'MY_VARIABLE');
		});

		test('should handle already uppercase text', () => {
			const result = converter.changeCase('HELLO', TextCaseKind.Uppercase);
			assert.strictEqual(result, 'HELLO');
		});
	});

	// Test lowercase conversion
	suite('Lowercase', () => {
		test('should convert simple text to lowercase', () => {
			const result = converter.changeCase('HELLO', TextCaseKind.LowerCase);
			assert.strictEqual(result, 'hello');
		});

		test('should convert mixed case to lowercase', () => {
			const result = converter.changeCase('HeLLo WoRLd', TextCaseKind.LowerCase);
			assert.strictEqual(result, 'hello world');
		});

		test('should convert PascalCase to lowercase', () => {
			const result = converter.changeCase('MyVariable', TextCaseKind.LowerCase);
			assert.strictEqual(result, 'myvariable');
		});

		test('should handle already lowercase text', () => {
			const result = converter.changeCase('hello', TextCaseKind.LowerCase);
			assert.strictEqual(result, 'hello');
		});
	});

	// Test PascalCase conversion
	suite('PascalCase', () => {
		test('should convert simple words to PascalCase', () => {
			const result = converter.changeCase('hello world', TextCaseKind.PascalCase);
			assert.strictEqual(result, 'HelloWorld');
		});

		test('should convert snake_case to PascalCase', () => {
			const result = converter.changeCase('my_variable_name', TextCaseKind.PascalCase);
			assert.strictEqual(result, 'MyVariableName');
		});

		test('should convert kebab-case to PascalCase', () => {
			const result = converter.changeCase('my-variable-name', TextCaseKind.PascalCase);
			assert.strictEqual(result, 'MyVariableName');
		});

		test('should convert camelCase to PascalCase', () => {
			const result = converter.changeCase('myVariableName', TextCaseKind.PascalCase);
			assert.strictEqual(result, 'MyVariableName');
		});

		test('should handle single word', () => {
			const result = converter.changeCase('hello', TextCaseKind.PascalCase);
			assert.strictEqual(result, 'Hello');
		});

		test('should handle multiple spaces', () => {
			const result = converter.changeCase('hello   world', TextCaseKind.PascalCase);
			assert.strictEqual(result, 'HelloWorld');
		});

		test('should handle special characters', () => {
			const result = converter.changeCase('hello@world#test', TextCaseKind.PascalCase);
			assert.strictEqual(result, 'HelloWorldTest');
		});
	});

	// Test CamelCase conversion
	suite('CamelCase', () => {
		test('should convert simple words to camelCase', () => {
			const result = converter.changeCase('hello world', TextCaseKind.CamelCase);
			assert.strictEqual(result, 'helloWorld');
		});

		test('should convert snake_case to camelCase', () => {
			const result = converter.changeCase('my_variable_name', TextCaseKind.CamelCase);
			assert.strictEqual(result, 'myVariableName');
		});

		test('should convert kebab-case to camelCase', () => {
			const result = converter.changeCase('my-variable-name', TextCaseKind.CamelCase);
			assert.strictEqual(result, 'myVariableName');
		});

		test('should convert PascalCase to camelCase', () => {
			const result = converter.changeCase('MyVariableName', TextCaseKind.CamelCase);
			assert.strictEqual(result, 'myVariableName');
		});

		test('should handle single word', () => {
			const result = converter.changeCase('Hello', TextCaseKind.CamelCase);
			assert.strictEqual(result, 'hello');
		});

		test('should preserve first letter as lowercase', () => {
			const result = converter.changeCase('HELLO WORLD', TextCaseKind.CamelCase);
			assert.strictEqual(result, 'helloWorld');
		});
	});

	// Test SnakeCase conversion
	suite('SnakeCase', () => {
		test('should convert simple words to snake_case', () => {
			const result = converter.changeCase('hello world', TextCaseKind.SnakeCase);
			assert.strictEqual(result, 'hello_world');
		});

		test('should convert camelCase to snake_case', () => {
			const result = converter.changeCase('myVariableName', TextCaseKind.SnakeCase);
			assert.strictEqual(result, 'my_variable_name');
		});

		test('should convert PascalCase to snake_case', () => {
			const result = converter.changeCase('MyVariableName', TextCaseKind.SnakeCase);
			assert.strictEqual(result, 'my_variable_name');
		});

		test('should convert kebab-case to snake_case', () => {
			const result = converter.changeCase('my-variable-name', TextCaseKind.SnakeCase);
			assert.strictEqual(result, 'my_variable_name');
		});

		test('should handle single word', () => {
			const result = converter.changeCase('hello', TextCaseKind.SnakeCase);
			assert.strictEqual(result, 'hello');
		});

		test('should handle uppercase input', () => {
			const result = converter.changeCase('HELLO WORLD', TextCaseKind.SnakeCase);
			assert.strictEqual(result, 'hello_world');
		});

		test('should handle multiple separators', () => {
			const result = converter.changeCase('hello__world', TextCaseKind.SnakeCase);
			assert.strictEqual(result, 'hello_world');
		});
	});

	// Test KebabCase conversion
	suite('KebabCase', () => {
		test('should convert simple words to kebab-case', () => {
			const result = converter.changeCase('hello world', TextCaseKind.KebabCase);
			assert.strictEqual(result, 'hello-world');
		});

		test('should convert camelCase to kebab-case', () => {
			const result = converter.changeCase('myVariableName', TextCaseKind.KebabCase);
			assert.strictEqual(result, 'my-variable-name');
		});

		test('should convert PascalCase to kebab-case', () => {
			const result = converter.changeCase('MyVariableName', TextCaseKind.KebabCase);
			assert.strictEqual(result, 'my-variable-name');
		});

		test('should convert snake_case to kebab-case', () => {
			const result = converter.changeCase('my_variable_name', TextCaseKind.KebabCase);
			assert.strictEqual(result, 'my-variable-name');
		});

		test('should handle single word', () => {
			const result = converter.changeCase('hello', TextCaseKind.KebabCase);
			assert.strictEqual(result, 'hello');
		});

		test('should handle uppercase input', () => {
			const result = converter.changeCase('HELLO WORLD', TextCaseKind.KebabCase);
			assert.strictEqual(result, 'hello-world');
		});
	});

	// Test StartCase conversion
	suite('StartCase', () => {
		test('should convert simple words to Start Case', () => {
			const result = converter.changeCase('hello world', TextCaseKind.StartCase);
			assert.strictEqual(result, 'Hello World');
		});

		test('should convert lower case sentence to Start Case', () => {
			const result = converter.changeCase('hello my world.', TextCaseKind.StartCase);
			assert.strictEqual(result, 'Hello My World.');
		});

		test('should convert all upper case to Start Case', () => {
			const result = converter.changeCase('HELLO DEAR EARTH.', TextCaseKind.StartCase);
			assert.strictEqual(result, 'Hello Dear Earth.');
		});

		test('should convert kebab-case to Start Case', () => {
			const result = converter.changeCase('my-kebab-case', TextCaseKind.StartCase);
			assert.strictEqual(result, 'My-kebab-case');
		});

		test('should handle single word', () => {
			const result = converter.changeCase('hello', TextCaseKind.StartCase);
			assert.strictEqual(result, 'Hello');
		});

		test('should handle single characters', () => {
			const result = converter.changeCase('I am a young boy.', TextCaseKind.StartCase);
			assert.strictEqual(result, 'I Am A Young Boy.');
		});
	});

	// Test SentenceCase conversion
	suite('SentenceCase', () => {
		test('should convert simple words to Sentence case', () => {
			const result = converter.changeCase('hello world.this is me.', TextCaseKind.SentenceCase);
			assert.strictEqual(result, 'Hello world. This is me.');
		});

		test('should handle single sentence', () => {
			const result = converter.changeCase('hello world.', TextCaseKind.SentenceCase);
			assert.strictEqual(result, 'Hello world.');
		});

		test('should handle single word', () => {
			const result = converter.changeCase('hello', TextCaseKind.SentenceCase);
			assert.strictEqual(result, 'Hello');
		});
    
        test('should handle multiple spaces after period', () => {
            const result = converter.changeCase('hello world.   this is me.', TextCaseKind.SentenceCase);
            assert.strictEqual(result, 'Hello world. This is me.');
        });

        test('should handle no spaces after period', () => {
            const result = converter.changeCase('hello world.this is me.', TextCaseKind.SentenceCase);
            assert.strictEqual(result, 'Hello world. This is me.');
        });

        test('should handle mixed case sentences', () => {
            const result = converter.changeCase('hElLo WoRlD. tHiS iS Me.', TextCaseKind.SentenceCase);
            assert.strictEqual(result, 'HElLo WoRlD. THiS iS Me.');
        });

        test('should handle sentences with numbers', () => {
            const result = converter.changeCase('hello world 123. this is me 456.', TextCaseKind.SentenceCase);
            assert.strictEqual(result, 'Hello world 123. This is me 456.');
        });

        test('should handle sentences with special characters', () => {
            const result = converter.changeCase('hello world! this is me? yes.', TextCaseKind.SentenceCase);
            assert.strictEqual(result, 'Hello world! This is me? Yes.');
        });

        test('should keep valid sentence case intact', () => {
            const result = converter.changeCase('Hello world, how are you?', TextCaseKind.SentenceCase);
            assert.strictEqual(result, 'Hello world, how are you?');
        });
	});

	// Test error handling
	suite('Error Handling', () => {
		test('should throw error for empty string', () => {
			assert.throws(() => {
				converter.changeCase('', TextCaseKind.CamelCase);
			}, Error, 'Please select a non-empty text to change case!');
		});

		test('should throw error with specific message', () => {
			const errorMessage = 'Please select a non-empty text to change case!';
			assert.throws(() => {
				converter.changeCase('', TextCaseKind.Uppercase);
			}, (err: any) => {
				return err.message === errorMessage;
			});
		});
	});

	// Test edge cases
	suite('Edge Cases', () => {
		test('should handle text with numbers', () => {
			const result = converter.changeCase('hello123world456', TextCaseKind.CamelCase);
			assert.strictEqual(result, 'hello123world456');
		});

		test('should handle text with leading numbers', () => {
			const result = converter.changeCase('123hello', TextCaseKind.CamelCase);
			assert.strictEqual(result, '123hello');
		});

		test('should handle only whitespace', () => {
			assert.throws(() => {
				converter.changeCase('   ', TextCaseKind.CamelCase);
			}, Error);
		});

		test('should handle mixed alphanumeric and special characters', () => {
			const result = converter.changeCase('hello_world_123_test', TextCaseKind.CamelCase);
			assert.strictEqual(result, 'helloWorld123Test');
		});

		test('should handle consecutive delimiters', () => {
			const result = converter.changeCase('hello--world', TextCaseKind.CamelCase);
			assert.strictEqual(result, 'helloWorld');
		});

		test('should handle text with dots and commas', () => {
			const result = converter.changeCase('hello,world.test', TextCaseKind.PascalCase);
			assert.strictEqual(result, 'HelloWorldTest');
		});

		test('should preserve numbers in middle of words', () => {
			const result = converter.changeCase('my_var2_name', TextCaseKind.CamelCase);
			assert.strictEqual(result, 'myVar2Name');
		});
	});
});

export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet() {\n\tconsole.log("Hello World in JavaScript!");\n}\n\ngreet();\n`,
  typescript: `\nfunction greet(): void {\n\tconsole.log("Hello World in TypeScript!");\n}\n\ngreet();\n`,
  python: `\ndef greet():\n\tprint("Hello World in Python!")\n\ngreet()\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World in Java!");\n\t}\n}\n`,
  csharp: `\nusing System;\n\nnamespace HelloWorld {\n\tclass Program {\n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#!");\n\t\t}\n\t}\n}\n`,
  php: `<?php\n\necho "Hello World in PHP!";\n`,
};

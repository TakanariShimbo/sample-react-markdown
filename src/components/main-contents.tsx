import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Copy } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const sampleMarkdown = `
# Hello World

This is a paragraph with some **bold** text and a [link](https://example.com).

\`\`\`js
console.log('Hello, world!');
\`\`\`

Here is a LaTeX inline math formula: $E = mc^2$

And here is a LaTeX block math formula:
$$
\\int_{a}^{b} f(x) \\, dx
$$
`;

interface CodeBlockProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string;
  children?: React.ReactNode;
}

const copyToClipboard = (code: string) => {
  navigator.clipboard.writeText(code);
  alert("Copyed!");
};

const CodeBlock = ({ children, className }: CodeBlockProps) => {
  const languageMatch = /language-(\w+)/.exec(className || "");
  const language = languageMatch ? languageMatch[1] : undefined;
  const formattedChildren = String(children).replace(/\n$/, "");

  return (
    <div style={{ position: "relative" }}>
      <SyntaxHighlighter style={a11yDark} language={language} PreTag="div" children={formattedChildren} />
      <Button className="absolute right-1 top-1 rounded-lg h-6 w-6" variant="outline" size="icon" onClick={() => copyToClipboard(formattedChildren)}>
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};

export const MainContents = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-5">
      <ThemeToggle />
      <ReactMarkdown
        className="prose dark:prose-invert prose-pre:bg-[#2b2b2b]"
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{ code: CodeBlock }}
      >
        {sampleMarkdown}
      </ReactMarkdown>
    </div>
  );
};

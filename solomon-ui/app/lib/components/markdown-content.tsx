import { FC, useEffect, useState } from "react";
import { remark } from "remark";
import matter from "gray-matter";
import html from "remark-html";
import rehypeHighlight from "rehype-highlight";

interface Props {
  requirementId: string | null;
}

const MarkdownContent: FC<Props> = ({ requirementId }) => {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        const response = await fetch(`/docs/asvs/403/${requirementId}.md`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        const { content: markdownContent } = matter(text);
        const processedContent = await remark()
          .use(html)
          .use(rehypeHighlight)
          .process(markdownContent);
        setContent(processedContent.toString());
      } catch (error) {
        setError("Failed to load content");
        console.error(error);
      }
    };

    if (requirementId) {
      fetchMarkdownContent();
    }
  }, [requirementId]);

  return (
    <div
      className="
      prose
      max-w-none
      text-nord-snowstorm-50
      prose-p:mt-0
      prose-p:mb-5
      prose-headings:my-2
      prose-headings:text-lg
      prose-headings:text-nord-frost-50
      prose-h1:text-xl
      prose-h1:text-nord-aurora-500
      prose-blockquote:text-nord-snowstorm-50
      prose-blockquote:border-l-nord-polarnight-200
      prose-blockquote:my-12
      prose-strong:text-nord-aurora-300
      prose-a:text-nord-frost-200
      prose-hr:border-t-nord-polarnight-300
      prose-code:text-nord-snowstorm-50
      prose-code:font-thin
      "
    >
      {error && <p>Nothing here yet</p>}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default MarkdownContent;

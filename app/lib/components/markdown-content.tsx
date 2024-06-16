import { FC, useEffect, useState } from "react";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import rehypeHighlight from "rehype-highlight";

interface Props {
  requirementId: string;
}

const MarkdownContent: FC<Props> = ({ requirementId }) => {
  const [content, setContent] = useState<string>("");

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
        console.error("Error fetching markdown content:", error);
      }
    };

    if (requirementId) {
      fetchMarkdownContent();
    }
  }, [requirementId]);

  return (
    <div className="
      prose
      max-w-none
      text-nord-snowstorm-50
      prose-p:mt-0
      prose-p:mb-5
      prose-headings:my-2
      prose-headings:text-lg
      prose-headings:text-nord-frost-50
      prose-h1:text-xl
      prose-h1:text-nord-aurora-purple
      ">
    <div dangerouslySetInnerHTML={{ __html: content }} />;
    </div>
  )
};

export default MarkdownContent;

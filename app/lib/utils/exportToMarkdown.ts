import MarkdownIt from 'markdown-it';

interface Requirement {
  requirement_id: string;
  description: string;
}

const md = new MarkdownIt();

export const exportToMarkdown = (bookmarkedRequirements: Requirement[]): string => {
  let markdownContent = '';

  bookmarkedRequirements.forEach(req => {
    markdownContent += `- \`${req.requirement_id}\`: ${req.description}\n`;
  });

  return md.render(markdownContent);
};


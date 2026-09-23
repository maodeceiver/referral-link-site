import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;

const ArticleText = ({ text }: { text: string }) => {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  linkRe.lastIndex = 0;
  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(
      <Link
        key={`${match.index}-${match[2]}`}
        to={match[2]}
        className="text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
      >
        {match[1]}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return (
    <>
      {nodes.map((n, i) => (
        <Fragment key={i}>{n}</Fragment>
      ))}
    </>
  );
};

export default ArticleText;

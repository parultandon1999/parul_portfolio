interface FootnoteProps {
  marker: string;
  text: string;
}

const Footnote = ({ marker, text }: FootnoteProps) => {
  return (
    <p className="font-sans text-sm text-body leading-relaxed">
      <span className="text-accent-blue font-medium">{marker}</span> {text}
    </p>
  );
};

export default Footnote;

interface SkillCardProps {
  title: string;
  skills: string[];
  index: number;
}

const SkillCard = ({ title, skills, index }: SkillCardProps) => {
  return (
    <div
      className="opacity-0 animate-fade-in"
      style={{ animationDelay: `${0.1 + index * 0.15}s` }}
    >
      <h3 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
        {title}
      </h3>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li key={skill} className="font-sans text-lg text-foreground">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;

interface MatIconProps {
  icon: string;
  color?: string;
}

export default function MatIcon(props: MatIconProps) {
  return (
    <span className="material-icons" style={{ color: props.color }}>
      {props.icon}
    </span>
  );
}

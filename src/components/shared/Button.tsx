import "../../styles/shared/Button.scss";

interface Props {
	children: any
	onClick: (e: any) => void
}

const Button = ({ children, onClick }: Props) => {
	return <button onClick={onClick}>
		{children}
	</button>
};

export default Button;
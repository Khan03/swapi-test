import { Header, LogoContainer, LogoImg } from "./header.styles.js";
import logo from "../../assets/Star_Wars_Logo.svg";

const HeaderComponent = () => {
	return (
		<>
			<Header>
				<LogoContainer>
					<LogoImg src={logo} className="logo" alt="Star Wars Logo" />
				</LogoContainer>
			</Header>
		</>
	);
};

export default HeaderComponent;

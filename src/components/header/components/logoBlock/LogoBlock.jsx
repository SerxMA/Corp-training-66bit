import BitLogo from '../../../bitLogo/BitLogo';

import styles from './LogoBlock.module.css';

const LogoBlock = () => {
	return (
		<div className={styles['logo-block']}>
			<BitLogo />
		</div>
	);
};

export default LogoBlock;

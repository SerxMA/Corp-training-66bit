import styles from './Authentication.module.css'
import AuthTitle from '../../components/authTitle/AuthTitle';
import AuthMain from '../../components/authMain/AuthMain';


const Authentication = () => {
    return (
        <div className={styles.wrapper}>
            <AuthTitle/>
            <AuthMain/>
        </div>
    );
};

export default Authentication;
import { toast } from 'react-toastify';

export const getError = ({ status, response }) => {
	toast.error(
		`Статус - ${status}\n
		Сообщение - "${response?.data?.message || ''}"`
	);
};

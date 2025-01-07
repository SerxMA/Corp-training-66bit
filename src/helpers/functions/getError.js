import { toast } from 'react-toastify';

export const getError = ({ status, response }) => {
	toast.error(
		`Статус - ${status}\n
		Код - ${response?.data?.error || -1}\n
		Сообщение - "${response?.data?.message || ''}"`
	);
};

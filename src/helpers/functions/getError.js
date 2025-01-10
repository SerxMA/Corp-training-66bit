import { toast } from 'react-toastify';

export const getError = ({ response }) => {
	toast.error(`Сообщение - ${response?.data?.message || ''}`);
};

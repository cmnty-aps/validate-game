import { hitCoda } from '../utils';
export default async function gameName(id) {
    const body = ``;
    const data = await hitCoda(body);
    return {
        success: true,
        game: '',
        id,
        name: data.confirmationFields.username
    };
}

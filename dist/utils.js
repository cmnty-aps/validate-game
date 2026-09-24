export const allowedMethod = ['GET', 'HEAD', 'POST'];
export function timeNow() {
    return Date.now();
}
export async function parseRequest(request) {
    const url = new URL(request.url);
    if (request.method === 'POST') {
        const contentType = request.headers.get('content-type');
        let data = {};
        try {
            if (contentType.includes('application/json')) {
                data = await request.json();
            }
            else if (contentType.includes('application/x-www-form-urlencoded')) {
                const formData = await request.formData();
                for (const [key, value] of formData.entries()) {
                    data[key] = value;
                }
            }
            else {
                return url.href;
            }
            for (const key in data) {
                url.searchParams.set(key, data[key]);
            }
            return url.href;
        }
        catch (error) {
            return url.href;
        }
    }
    return url.href;
}
export function getParams(inputUrl) {
    const url = new URL(inputUrl);
    const urlParams = url.searchParams;
    const params = {
        path: url.pathname
    };
    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }
    return params;
}
export async function hitCoda(body) {
    const response = await fetch('https://order-sg.codashop.com/initPayment.action', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    });
    return await response.json();
}

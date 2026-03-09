export default async function assets(id?: string) {
    const url = id ? `${process.env.API_URL}/assets/${id}` : `${process.env.API_URL}/assets`;
    const response = await fetch(url, {
        method: 'GET',
    });

    const data = await response.json();

    return data;
}

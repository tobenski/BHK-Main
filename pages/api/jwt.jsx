export default async (req, res) => {

    try {
        const resp = await fetch('https://admin.tobenski.dk/api/api/v1/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    username: process.env.WP_USER,
                    password: process.env.WP_PASS,
                }),

        })
        const data = await resp.json()
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }


}
export default async (req, res) => {
    
    const { url } = req.query
    var b = Buffer.from(`${process.env.WP_USER}:${process.env.WP_PASS}`)
    var s = b.toString('base64')

    const headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Basic ${s}`
        
    }
    switch (req.method) {
        case 'GET':
                try {    
                    const resp = await fetch(url, {headers: headers})    
                    const data = await resp.json()
                    res.status(200).json(data)
                    } catch (error) {
                        console.error(error);
                        res.status(error.requestResult.statusCode).send(error.message);
                    }
        default:
            res.status(405).end(); //Method Not Allowed
            break;
    }
    


}
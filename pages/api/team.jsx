import { teamRegex } from "../../Utils/regex"
import { findMatches } from "../../Utils/functions"
import { holdPopupUrl, proxyServer } from "../../Utils/conventus"
export default async (req, res) => { 
    const { id } = req.query
    
    
    try {
        // const resp = await fetch(proxyServer, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({url: holdPopupUrl(id)}),
        // })
        const resp = await fetch(holdPopupUrl(id))
        const data = await resp.text();
        const teamResp = findMatches(teamRegex, data)
        // console.log(data);
        const team = {
            name:  teamResp[0].groups.name ? teamResp[0].groups.name : '',
            price: teamResp[0].groups.price ? teamResp[0].groups.price : '',
            times: teamResp[0].groups.time ? teamResp[0].groups.time.split('<br />') : [],
            coaches: teamResp[0].groups.coahes ? teamResp[0].groups.coahes.replaceAll('<br />', ' ').split('</td></tr><tr><td>') : [],
            description: teamResp[0].groups.description ? teamResp[0].groups.description : ''
        }
        res.status(200).json(team)
    } catch (error) {
        // console.log(error);
        res.status(500).send({error: JSON.stringify(error)});
    }

    
}


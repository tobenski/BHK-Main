import useSWR from 'swr'

const useHeroSlider = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}heroes`,
        fetcher
    )

    return {
        data: {
            slides: data,
        },

        isLoading: !error && !data,
        isError: error,
    }
}

export default useHeroSlider

// image, content, header, subheader, cta, url

// Temp Datastore
const image =
    'https://bhk.tobenski.dk/storage/2022/10/02/1eda200604c7857c16b06d573d8ab47bcc77d1d7.png'
const content =
    '<p>Så er vi klar til endnu en sæson i Brædstrup håndbold.</p><p><br></p><p>Træningen starter op i uge 33 og tiderne kan ses i skemaet under HOLD. Tilmeldingen er nu klar og i kan gå ind under hvert hold og betale kontingent,</p><p><br></p><p>Alle er velkomne og kan du ikke lige finde et hold til dit barn så mød op til den træning som er tættest på dit barns alder, så finder vi en løsning.</p><p><br></p><p>Alle må træne med 3 gange, før man endeligt behøver beslutte sig. </p><p>så kom endelig og prøv</p>'
const header = 'Brædstrup Håndbold Klub'
const subheader = 'Velkommen til...'
const cta = 'Læs Mere'
const url = 'https://google.com'

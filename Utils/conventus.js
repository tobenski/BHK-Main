export const foreningsId = process.env.NEXT_PUBLIC_CONVENTUS_FORENINGS_ID

export const holdPopupUrl = (gruppeId) => {
    return `https://www.conventus.dk/dataudv/www/holdpopup.php?foreningsid=${foreningsId}&gruppe=${gruppeId}&skjul_nyt_medlem=0&skjul_allerede_medlem=0&vindue=nyt_vindue&boks=1&kolonne_width=10&sprog=da`
}

export const holdOversigtUrl = () => {
    return `https://www.conventus.dk/dataudv/www/holdoversigt_ny.php?foreningsid=${foreningsId}&afdelingsid=0&handelsbetingelser=0&reservationer=skjul&skjul_nyt_medlem=0&skjul_allerede_medlem=0&raekkefoelge=alfabetisk&sprog=auto&vis_adresse=0&knap_placering=horisontal&highlight=pris&start=tid_sted;alder;ledere;om_holdet&info=`
}

export const tilmeldHoldUrl = (gruppeId) => {
    return `https://www.conventus.dk/dataudv/www/new_tilmelding.php?foreningsid=${foreningsId}&gruppe=${gruppeId}&skjul_nyt_medlem=0&skjul_allerede_medlem=0`
}
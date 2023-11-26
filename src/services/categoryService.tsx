import axios from "axios";

export async function getCategories() {
    const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/categories"
    return axios
        .get(url)
        .then(res => { 
            return res.data.data
        })
        .catch((e) => {
            console.log(e)
        })
}

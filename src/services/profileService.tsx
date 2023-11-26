import axios from "axios";

interface Coach {
    attributes: [];
    id: number;
}

export async function getCoaches() {
    const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/coaches"
    return axios
        .get<Coach[]>(url, { params: { _sort: "Name" } })
        .then(res => { return res.data })
}

export async function getCoach(coachId: any) {
    
    console.log("getCoach()")

    const coachRequestURL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/coaches/${coachId}?populate=*`;
        
    const res = await axios.get(coachRequestURL).then((coach) => {
        return coach.data.data.attributes
    }).catch( (e) => {
        throw new Error('Coach not found');
    })

    return res

}

export async function updateProfile( profile: any ) {

    const token = localStorage.getItem("jwtToken")

    const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/coaches/" + profile.id
    return axios
        .put(url, 
            {
                data:{
                    name: profile?.textField1,
                    previewText: profile?.textField2,
                    detailedDescription: profile?.textField3,
                    location: profile?.location,
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(res => { 
            return res.data 
        })
        .catch((e) => {
            console.log(e)
        })
}
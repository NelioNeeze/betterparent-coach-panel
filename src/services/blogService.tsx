import axios from "axios";
import { IBlogType } from "../interfaces/IBlog";

export async function getBlogs(coachId: any) {
    try {
        const coachingsRequestURL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/coaches/${coachId}/blogs`;
        
        const coursesResponse = await axios.get<IBlogType[]>(coachingsRequestURL, { params: { _sort: "title" } });
        console.log("Blog Response: ", coursesResponse)

        if (coursesResponse.data) {
            return coursesResponse.data
        } else {
            return []
        }

    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function getBlog( blogID: any ) {
    const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/blogs/" + blogID + "?populate=*"
    return axios
        .get(url, { params: {} })
        .then(res => { 
            console.log("Returned Blog: ", res)
            return res.data.data.attributes 
        })
        .catch((e) => {
            console.log(e)
        })
}

export async function addNewBlog( blog: any, coachId: any ) {

    const token = localStorage.getItem("jwtToken")
    const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/blogs/" 
    
    return axios
        .post(url, 
            {
                data:{
                    image: blog?.image,
                    title: blog?.textField1,
                    summary: blog?.textField2,
                    text: blog?.textField3,
                    coach: {
                        connect: [parseInt(coachId)]
                    },
                    category: {
                        connect: [1]
                    }
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

export async function updateBlog( blog: any ) {

    const token = localStorage.getItem("jwtToken")
    const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/blogs/" + blog.id
    
    return axios
        .put(url, 
            {
                data:{
                    title: blog?.textField1,
                    summary: blog?.textField2,
                    text: blog?.textField3,
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

export async function deleteBlog( blogId: IBlogType ) {

    const token = localStorage.getItem("jwtToken")
    const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/blogs/" + blogId

    return axios
        .delete(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => { 
            return res.data 
        })
        .catch((e) => {
            console.log(e)
        })
}

import axios from "axios";

interface Course {
    attributes: [];
    id: number;
}

export async function getCourses(coachId: any) {
    console.log("getCourses()")
    try {
        const coachingsRequestURL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/coaches/${coachId}/courses`;

        const coursesResponse = await axios.get<Course[]>(coachingsRequestURL, { params: { _sort: "title" } });
        console.log("Courses Response: ", coursesResponse.data)

        return coursesResponse.data

    } catch (error) {
        console.log(error)
        throw error;
    }
}

export async function getCourse( id: any ) {
    const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/courses/" + id + "?populate=*"
    return axios
        .get(url, { params: {} })
        .then(res => { 
            console.log("Returned Course: ", res)
            return res.data.data.attributes
        })
        .catch((e) => {
            console.log(e)
        })
}

export async function addNewCourse( course: any, coachId: any ) {

    const token = localStorage.getItem("jwtToken")
    const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/courses/" 

    console.log(coachId)

    return axios
        .post(url, 
            {
                data:{
                    title: course?.textField1,
                    shortDescription: course?.textField2,
                    detailedText: course?.textField3,
                    ageStart: course?.ageStart,
                    ageEnd: course?.ageEnd,
                    coach: {
                        connect: [parseInt(coachId)]
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

export async function updateCourse( course: any ) {

    const token = localStorage.getItem("jwtToken")
    const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/courses/" + course.id

    return axios
        .put(url, 
            {
                data:{
                    title: course?.textField1,
                    shortDescription: course?.textField2,
                    detailedText: course?.textField3,
                    ageStart: course?.ageStart,
                    ageEnd: course?.ageEnd,
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

export async function deleteCourse( courseId: any ) {

    const token = localStorage.getItem("jwtToken")
    const url = process.env.NEXT_PUBLIC_STRAPI_URL + "/courses/" + courseId
    
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

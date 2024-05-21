import Image from "next/image";
import { unstable_setRequestLocale } from 'next-intl/server';


export async function generateStaticParams(){
    const response = await fetch("https://dummyjson.com/posts");
    const data = await response.json();
    const paths = data.posts.map((post: postElement) => ({ id: `${post.id}` }));
    return paths;
}

const fetchData = async (articleId: number) => {
    try {
        const response = await fetch(`https://dummyjson.com/posts/${articleId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const BlogDetails = async ({ params }: paramsObj) => {
    unstable_setRequestLocale(params.locale);
    const articleId = params.id;
    const articleData: postElement = await fetchData(articleId);
    const createDate = "07.07.2077";
    const imageUrl = "/assets/euro2024.png";

    return (
        <section>
            <div className="w-full flex flex-col lg:flex-row gap-7 lg:gap-10 justify-between py-5 px-5 max-w-[1600px] mx-auto my-10 lg:py-10 lg:px-0">
                <div className="w-full lg:w-1/2 flex flex-col gap-5 lg:gap-7">
                    <div className="w-full rounded-2xl overflow-hidden">
                        <Image src={imageUrl} alt="Georgia winner" width={1000} height={1000} className="w-full h-full object-cover object-center" />
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-5 lg:gap-10 justify-start dark:text-light_blue text-[14px] lg:text-[16px]">
                    <div className="w-full flex flex-col gap-3">
                        <h2 className="text-[25px] leading-[25px] lg:text-[40px] lg:leading-[45px] text-start text-orange">{articleData?.title}</h2>
                        <div className="flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <span className="dark:text-light_blue">{createDate}</span>
                        </div>
                    </div>
                    <p>{articleData?.body}</p>
                    <div className="flex gap-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                        {articleData?.reactions}</div>
                    <p>{articleData?.tags.map((tag, index) => (<span key={index} className="px-4 py-2 mr-3 bg-orange text-white text-[14px] rounded-2xl">{tag}</span>))}</p>
                </div>
            </div>

        </section >);
}

export default BlogDetails;

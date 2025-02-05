import { IVideo } from "@/models/Video";

export type VideoFormData = Omit<IVideo,"_id">

type FetchOptions = {
    method? : "GET" | "POST" | "PUT" | "DELETE";
    body? : any;
    headers? : Record<string, string>
}

class ApiClient {
    private async fetch<T>(
        endpoint:string,
        options : FetchOptions = {}
    ):Promise<T>{
        const {method = "GET",body,headers = {}} = options

        const defaultHeader = {
            "Content-Type": "application/json",
            ...headers
        }

       const response = await fetch(`/api${endpoint}`,{
            method,
            headers:defaultHeader,
            body:body ? JSON.stringify(body) : undefined
        })
        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json();
    }

    async getVideos(){
        const response = await this.fetch<IVideo[]>('/videos');
        return response;
    }

    async getVideo(){
        const response = await this.fetch<IVideo>(`/videos/${id}`);
        return response;
    }

    async createVideo(videoData:VideoFormData){
      return this.fetch("/videos",{
        method: "POST",
        body: videoData
      })
    }

}

export const apiClient = new ApiClient()
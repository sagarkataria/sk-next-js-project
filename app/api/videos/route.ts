import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db"
import Video, { IVideo } from "@/models/Video";
import { create } from "domain";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

 

 export async function Get() {
    try {
        await connectToDatabase();
        const videos =await Video.find({}).sort({createdAt:-1}).lean();
        if(!videos || videos.length === 0){
            return NextResponse.json([],{status:200})
        }

        return NextResponse.json(videos)

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {error:"failed to fetch videos"},
            {status:200}
        )
    }
 }
 export async function POST(request:NextRequest) {
    try {
       const session = await getServerSession(authOptions)
       if(!session){
        return NextResponse.json(
            {error:"Unauthorized"},
            {status:401}
        )
       }
       await connectToDatabase();
       const body:IVideo = await request.json();

       if(
         !body.title ||
         !body.thumbnailUrl ||
         !body.description ||
         !body.videoUrl
       ){
        return NextResponse.json(
            {error:"Missing required fields"},
            {status:400}
        )
       }
       const videoData = {
         ...body,
         controlls:body.controls ?? true,
         transformation : {
             height : 1920,
             width : 1080,
             quality:body.transformation?.quality  ?? 100
         }
       }

      const newVideo = await Video.create(videoData)
      return NextResponse.json(newVideo,{status:201})

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {error:"Failed to create video"},
            {status:500}
        )
    }
 }
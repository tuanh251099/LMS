import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function PUT(req: Request,
  { params }: { params: { courseId: string }} 
  ) {

  try {
    const { userId } = auth();
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    // Update isApproved
    const updatedCourse = await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        isApproved: !course.isApproved,
      },
    });

    //return res.status(200).json(updatedCourse);
    return NextResponse.json(updatedCourse)
  } catch (error) {
    console.error('Error toggling approval:', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

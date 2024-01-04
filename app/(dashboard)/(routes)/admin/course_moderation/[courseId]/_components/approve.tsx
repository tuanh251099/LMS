"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ParamsType {
    courseId: string;
}

const CourseApproval = ({ courseId }: { courseId: ParamsType }) => {
    const [isAdminApproved, setIsAdminApproved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current);

    const handleToggleApproval = async () => {
        try {
            const response = await axios.patch(`/api/courses/${courseId}/toggle-approval`, {
                isApproved: !isAdminApproved
            });

            if (response.status === 200) {
                toast.success("Course updated");
                toggleEdit();
                router.refresh();
            } else {
                toast.error("Can not approve");
            }
        } catch (error) {
            toast.error("Some thing went wrong");
            console.log(error)
        }
    };

    return (
        <div>
            {isAdminApproved ? (
                <Button onClick={handleToggleApproval}>Unapprove</Button>
            ) : (
                <Button onClick={handleToggleApproval}>Approve</Button>
            )}
        </div>
    );
};

export default CourseApproval;

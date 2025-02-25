import {MaterialSendDetail, ProjectMaterialRequirements} from "@prisma/client";

export default interface Project{
    project_no: string;
    project_name: string;
    location: string;
    start_date: Date | null;
    completion_date: Date | null;
    ProjectMaterialRequirements?: ProjectMaterialRequirements[];
    MaterialSendDetail?: MaterialSendDetail[];
}
import {MaterialRequirement} from "./MaterialRequirement";

export  default interface ProjectDetails {
    project_no:string
    project_name:string
    location:string
    start_date:string
    completion_date:string
    requirements:MaterialRequirement[]
}
import {IModel} from "~/models/IModel";

export interface TaskAttachmentModel extends IModel{
    type: number;
    path: string;
    createdAt: string;
    idTask?: number | null;
}
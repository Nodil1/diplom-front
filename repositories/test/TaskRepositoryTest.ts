import {TaskRepository} from "~/repositories/intrefaces/TaskRepository";
import {TaskState} from "~/models/enum/TaskState";
import {TaskModel} from "~/models/TaskModel";
import {TaskType} from "~/models/enum/TaskType";
import {RepositoryTest} from "~/repositories/test/RepositoryTest";
import {testDataTasks} from "~/data/TestData";

export class TaskRepositoryTest extends RepositoryTest<TaskModel> implements TaskRepository {

    constructor() {
        super(testDataTasks)
    }

    async findTasksWhereWorkerId(id: number): Promise<TaskModel[]> {
        return this.models.filter(x => x.worker?.userModel?.id === id)
    }

}


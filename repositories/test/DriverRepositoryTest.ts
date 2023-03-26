import {WorkerType} from "~/models/enum/WorkerType";
import {WorkerModel} from "~/models/WorkerModel";
import {RepositoryTest} from "~/repositories/test/RepositoryTest";
import {IRepository} from "~/repositories/intrefaces/IRepository";
import {WorkerRepository} from "~/repositories/intrefaces/WorkerRepository";

export class DriverRepositoryTest extends RepositoryTest<WorkerModel> implements WorkerRepository{


    generateDefault(): WorkerModel[] {
        return [
            {
                carModel: {
                    carBrand: "Лада",
                    carModel: "2112",
                    carNumber: "У257РВ",
                },
                phoneNumber: "+79190050411",
                userModel: {
                    id: 1, login: "Vasya", createdAt: "13.01.2002", fio: "Борисов Н.В.", isOnline: true
                },
                type: [WorkerType.INSTALLER]

            },
            {
                carModel: {
                    carBrand: "Ниссан",
                    carModel: "Альмера",
                    carNumber: "К820РМ33",
                },
                phoneNumber: "+79190050323",
                userModel: {
                        id: 2, login: "Андрей", createdAt: "22.01.2002", fio: "Маликов Н.В.", isOnline: false
                    },
                type: [WorkerType.COURIER]
            },
        ]
    }

}
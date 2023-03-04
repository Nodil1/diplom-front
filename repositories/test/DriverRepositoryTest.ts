export class DriverRepositoryTest implements DriverRepository {
    repo: DriverModel[] = this.generateDefault()

    async getAll(): Promise<DriverModel[]> {
        return this.repo
    }

    generateDefault(): DriverModel[] {
        return [
            {
                carModel: {
                    carBrand: "Лада",
                    carModel: "2112",
                    carNumber: "У257РВ",
                },
                phoneNumber: "+79190050411",
                userModel:
                    {
                        id: 1, login: "Vasya", createdAt: "13.01.2002", fio: "Борисов Н.В."
                    }
            },
            {
                carModel: {
                    carBrand: "Ниссан",
                    carModel: "Альмера",
                    carNumber: "К820РМ33",
                },
                phoneNumber: "+79190050323",
                userModel:
                    {
                        id: 2, login: "Андрей", createdAt: "22.01.2002", fio: "Маликов Н.В."
                    }
            },
        ]
    }

    async addNew(model: DriverModel): Promise<void> {
        model.userModel!.id = this.repo.length + 1
        this.repo.push(model)
    }

    async update(id: number, newModel : DriverModel): Promise<void> {
        let x = this.repo.findIndex(x => x.userModel!.id === id)
        this.repo[x] = newModel
    }

    async delete(id: number): Promise<void> {
        let x = this.repo.findIndex(x => x.userModel!.id === id)
        delete this.repo[x]
    }
}
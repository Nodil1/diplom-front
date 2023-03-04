interface DriverRepository {
    getAll: () => Promise<DriverModel[]>
    addNew: (model: DriverModel) => Promise<void>

    update: (id: number, newModel : DriverModel) => Promise<void>
    delete: (id: number) => Promise<void>
}
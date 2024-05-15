# TODO LIST

1. Create Database untuk bisa lebih mengetahui detail dalam pembuatan aplikasi, sehingga bisa lebih paham alur kerja aplikasi

   - https://dbdiagram.io/home

2. Create Lib Common untuk Repository dan Models di TypeORM atau Prisma atau MongoDB atau GraphQL atau Database yang lain
3. Memulai SOLID dimulai dari lapisan terbawah
   - Create AbstractModel / AbstractEntity
   - Entity extends AbstractModel
   - Repository InjectModel Entity
   - Repository extends AbstractRepository
   - Service inject (DI) dari Repository | Service inject (DI) dari AbstractService jika tidak ada pembuatan manual repository
   - Controller Inject Service
   - Daftarkan semua kedalam module baik Repository, Services (provider) ini nama resmi di nest js, controller. Disini untuk semua Abstract tidak perlu didaftarkan cukup panggil saja sebagai inheritance di file/class

```
  @Module({
    controllers: [UsersController],
    providers: [UsersService],
  })
```

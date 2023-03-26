import { getDataSourceToken, TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DynamicModule, Module, Type, ModuleMetadata } from '@nestjs/common'
import { CUSTOM_REPOSITORY_METADATA } from './constants'
import { DataSource, ObjectType } from 'typeorm'

@Module({})
export class DataBaseModule {
  static forRoot(configRegister: () => TypeOrmModuleOptions) {
    return {
      global: true,
      module: DataBaseModule,
      imports: [TypeOrmModule.forRoot(configRegister())]
    }
  }

  static forRepository<T extends Type<any>>(repositories: T[], dataSourceName?: string): DynamicModule {
    const providers: ModuleMetadata['providers'] = []
    for (const Repo of repositories) {
      const entity = Reflect.getMetadata(CUSTOM_REPOSITORY_METADATA, Repo)
      if (!entity) continue
      providers.push({
        inject: [getDataSourceToken(dataSourceName)],
        provide: Repo,
        useFactory: (dataSource: DataSource): InstanceType<typeof Repo> => {
          const base = dataSource.getRepository<ObjectType<any>>(entity)
          return new Repo(base.target, base.manager, base.queryRunner)
        }
      })
    }
    return {
      module: DataBaseModule,
      providers,
      exports: providers
    }
  }
}

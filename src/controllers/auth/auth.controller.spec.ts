import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from '@src/services/user/user.service';
import { EncryptionService } from '@src/services/encryption/encryption.service';
import { UserEntity } from '@src/db/persistence/user.entity';
import { DepartmentEntity } from '@src/db/persistence/department.entity';
describe('AuthController', () => {
  let controller: AuthController;
  let userService:UserService;

    // Mock repository
    const mockUserRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };
    const mockDepartmentRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers:[UserService,JwtService, EncryptionService, EncryptionService,
        {
          provide: getRepositoryToken(UserEntity), // Aquí defines el repositorio
          useValue: mockUserRepository, // Usas el mock del repositorio
        },
        {
          provide: getRepositoryToken(DepartmentEntity), // Aquí defines el repositorio
          useValue: mockDepartmentRepository, // Usas el mock del repositorio
        },]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});




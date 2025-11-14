import { IModule } from "./IModule";
import { IHomework } from "./IHomework";
import { IUser } from "./IUser";

export type IHomeworkWithModule = Omit<IHomework, "moduleId" | "userId"> & {
  moduleId: IModule;
  userId: {
    email: IUser["email"];
  };
};

import LessonsClient from "@/app/components/Dashboard/Lessons/LessonsClient";
import { IHomework } from "@/interfaces/IHomework";
import { IModule } from "@/interfaces/IModule";
import { fetchRequestFromServer } from "@/lib/serverfetchTools";

const DashboardLessonsPage = async () => {
  const homeworks = await fetchRequestFromServer<{ data: IHomework[] }>(
    "/api/homeworks/"
  );
  const modules = await fetchRequestFromServer<{ data: IModule[] }>(
    "/api/modules/"
  );

  return <LessonsClient homeworks={homeworks.data} modules={modules.data} />;
};

export default DashboardLessonsPage;

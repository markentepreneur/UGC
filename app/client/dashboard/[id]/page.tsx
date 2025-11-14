import LessonDetailsClient from "@/app/components/Dashboard/Lessons/LessonDetailsClient";
import { IHomework } from "@/interfaces/IHomework";
import { IModule } from "@/interfaces/IModule";
import { fetchRequestFromServer } from "@/lib/serverfetchTools";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const LessonDetailsPage: React.FC<Props> = async ({ params }) => {
  const p = await params;

  const res = await fetchRequestFromServer<{
    data: { homework: IHomework | null; module: IModule };
  }>(`/api/modules/${p.id}`);

  return (
    <LessonDetailsClient
      homework={res.data.homework}
      module={res.data.module}
    />
  );
};

export default LessonDetailsPage;

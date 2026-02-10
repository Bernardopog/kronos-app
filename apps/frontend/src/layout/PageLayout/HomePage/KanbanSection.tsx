"use client";
import {
  KanbanSectionController,
  KanbanSectionList,
} from "@/components/KanbanSection";
import { SocketContext } from "@/context/SocketContext";
import { IKanbanWithSections } from "@/mock/kanban/mockKanbans";
import { useContext, useEffect, useRef, useState } from "react";

interface IKanbanSectionRes {
  userKanbans: IKanbanWithSections[];
  authorizedKanbans: IKanbanWithSections[];
}

export default function KanbanSection() {
  const [kanbanListSection, setKanbanListSection] = useState<IKanbanSectionRes>(
    { userKanbans: [], authorizedKanbans: [] },
  );

  const { socketKanban } = useContext(SocketContext);
  const hasEmittedRef = useRef<boolean>(false);

  const [showMyKanbans, setShowMyKanbans] = useState<boolean>(true);
  const [showOthersKanbans, setShowOthersKanbans] = useState<boolean>(false);
  const [showEmptyKanban, setShowEmptyKanban] = useState<boolean>(false);

  useEffect(() => {
    if (!socketKanban) return;
    if (!hasEmittedRef.current) {
      socketKanban.emit("getKanbanSections");
      hasEmittedRef.current = true;
    }

    socketKanban.on("refreshKanbanDashboard", () => {
      socketKanban.emit("getKanbanSections");
    });
    socketKanban.on("kanbanSectionFetched", (data: IKanbanSectionRes) => {
      setKanbanListSection({
        userKanbans: data.userKanbans,
        authorizedKanbans: data.authorizedKanbans,
      });
    });

    return () => {
      socketKanban.off("refreshKanbanDashboard");
      socketKanban.off("kanbanSectionFetched");
    };
  }, [socketKanban]);

  return (
    <section className="pr-2 overflow-y-auto scrollbar-thin scrollbar-track-woodsmoke-100 scrollbar-thumb-woodsmoke-950">
      <KanbanSectionController
        showMyKanbans={showMyKanbans}
        setShowMyKanbans={setShowMyKanbans}
        showOthersKanbans={showOthersKanbans}
        setShowOthersKanbans={setShowOthersKanbans}
        showEmptyKanban={showEmptyKanban}
        setShowEmptyKanban={setShowEmptyKanban}
      />
      {kanbanListSection.userKanbans && showMyKanbans && (
        <KanbanSectionList
          title="Seus Kanbans:"
          list={kanbanListSection.userKanbans}
          showEmptyKanban={showEmptyKanban}
        />
      )}
      {kanbanListSection.authorizedKanbans && showOthersKanbans && (
        <KanbanSectionList
          title="Kanbans que você faz parte:"
          list={kanbanListSection.authorizedKanbans}
          showEmptyKanban={showEmptyKanban}
        />
      )}
    </section>
  );
}
